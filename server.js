require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

// Create uploads directory
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// ─── Security Middleware ────────────────────────
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'DELETE'],
    maxAge: 86400
}));
app.use(express.json({ limit: '1mb' }));

// Rate limiting
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { error: 'Too many requests' } });
const uploadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, message: { error: 'Too many uploads' } });
app.use('/api/', apiLimiter);

// Static files
app.use(express.static(__dirname, { index: 'index.html', dotfiles: 'deny' }));

// ─── SIWE: Nonce Store ─────────────────────────
const nonceStore = new Map();

// Cleanup old nonces every 10 minutes
setInterval(() => {
    const now = Date.now();
    for (const [nonce, data] of nonceStore) {
        if (now - data.created > 10 * 60 * 1000) nonceStore.delete(nonce);
    }
}, 10 * 60 * 1000);

// ─── Auth Middleware ────────────────────────────
function requireAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        const decoded = jwt.verify(auth.slice(7), JWT_SECRET);
        req.userAddress = decoded.address;
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

// ─── SIWE Auth Endpoints ────────────────────────
app.get('/api/auth/nonce', (req, res) => {
    const nonce = crypto.randomBytes(16).toString('hex');
    nonceStore.set(nonce, { created: Date.now() });
    res.json({ nonce });
});

app.post('/api/auth/verify', (req, res) => {
    try {
        const { address, message, signature } = req.body;
        if (!address || !message || !signature) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Verify using ethers
        const { ethers } = require('ethers');
        const recoveredAddress = ethers.verifyMessage(message, signature);

        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            return res.status(401).json({ error: 'Signature verification failed' });
        }

        // Verify nonce is valid
        const nonceMatch = message.match(/Nonce: ([a-f0-9]+)/);
        if (!nonceMatch || !nonceStore.has(nonceMatch[1])) {
            return res.status(401).json({ error: 'Invalid or expired nonce' });
        }
        nonceStore.delete(nonceMatch[1]);

        // Issue JWT (valid for 24 hours)
        const token = jwt.sign({ address: address.toLowerCase() }, JWT_SECRET, { expiresIn: '24h' });

        console.log(`🔐 SIWE verified: ${address.substring(0, 10)}...`);
        res.json({ token, address });
    } catch (error) {
        console.error('SIWE error:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
});

// ─── File Validation ────────────────────────────
const BLOCKED_EXT = new Set(['.exe', '.bat', '.cmd', '.com', '.msi', '.scr', '.pif', '.vbs', '.ps1', '.dll']);

function isValidFileId(fileId) {
    return /^[a-f0-9]{64}$/.test(fileId);
}

// ─── IPFS/Pinata Upload ────────────────────────
async function pinToIPFS(filePath, fileName) {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) return '';

    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath), { filename: fileName });

        const response = await new Promise((resolve, reject) => {
            formData.submit({
                host: 'api.pinata.cloud',
                path: '/pinning/pinFileToIPFS',
                protocol: 'https:',
                headers: {
                    'pinata_api_key': PINATA_API_KEY,
                    'pinata_secret_api_key': PINATA_SECRET_KEY
                }
            }, (err, res) => {
                if (err) return reject(err);
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try { resolve(JSON.parse(data)); }
                    catch (e) { reject(new Error('Pinata parse error')); }
                });
            });
        });

        console.log(`📌 Pinned to IPFS: ${response.IpfsHash}`);
        return response.IpfsHash || '';
    } catch (error) {
        console.error('IPFS pin error:', error.message);
        return '';
    }
}

// ─── Multer Setup ───────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => cb(null, `temp_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`)
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024, files: 1 },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (BLOCKED_EXT.has(ext)) return cb(new Error('File type not allowed'), false);
        if (file.originalname.includes('..')) return cb(new Error('Invalid filename'), false);
        cb(null, true);
    }
});

// ─── Upload Endpoint ────────────────────────────
app.post('/api/upload', uploadLimiter, (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: 'File too large (max 100MB)' });
            return res.status(400).json({ error: err.message });
        }

        try {
            if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

            // Compute SHA256
            const fileBuffer = fs.readFileSync(req.file.path);
            const fileId = crypto.createHash('sha256').update(fileBuffer).digest('hex');

            // Rename to hash-based name
            const ext = path.extname(req.file.originalname).toLowerCase().replace(/[^a-z0-9.]/g, '');
            const newPath = path.join(UPLOADS_DIR, fileId + ext);
            const resolved = path.resolve(newPath);
            if (!resolved.startsWith(path.resolve(UPLOADS_DIR))) {
                fs.unlinkSync(req.file.path);
                return res.status(400).json({ error: 'Invalid file path' });
            }
            fs.renameSync(req.file.path, newPath);

            // Pin to IPFS (async, non-blocking for response)
            let ipfsHash = '';
            if (PINATA_API_KEY) {
                ipfsHash = await pinToIPFS(newPath, req.file.originalname);
            }

            console.log(`📁 Uploaded: ${req.file.originalname} → ${fileId}${ipfsHash ? ' (IPFS: ' + ipfsHash + ')' : ''}`);

            res.json({
                success: true,
                fileId,
                ipfsHash,
                fileName: req.file.originalname,
                fileSize: req.file.size
            });
        } catch (error) {
            if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            console.error('Upload error:', error);
            res.status(500).json({ error: 'Upload failed' });
        }
    });
});

// ─── Download Endpoint ──────────────────────────
app.get('/api/files/:fileId', (req, res) => {
    try {
        const fileId = req.params.fileId;
        if (!isValidFileId(fileId)) return res.status(400).json({ error: 'Invalid file ID' });

        const fileName = req.query.name || 'download';
        const files = fs.readdirSync(UPLOADS_DIR);
        const matched = files.find(f => f.startsWith(fileId));
        if (!matched) return res.status(404).json({ error: 'File not found' });

        const filePath = path.join(UPLOADS_DIR, matched);
        if (!path.resolve(filePath).startsWith(path.resolve(UPLOADS_DIR))) {
            return res.status(400).json({ error: 'Invalid path' });
        }
        res.download(filePath, fileName);
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Download failed' });
    }
});

// ─── Delete Endpoint (requires SIWE auth) ───────
app.delete('/api/files/:fileId', requireAuth, (req, res) => {
    try {
        const fileId = req.params.fileId;
        if (!isValidFileId(fileId)) return res.status(400).json({ error: 'Invalid file ID' });

        const files = fs.readdirSync(UPLOADS_DIR);
        const matched = files.find(f => f.startsWith(fileId));
        if (!matched) return res.status(404).json({ error: 'File not found' });

        const filePath = path.join(UPLOADS_DIR, matched);
        if (!path.resolve(filePath).startsWith(path.resolve(UPLOADS_DIR))) {
            return res.status(400).json({ error: 'Invalid path' });
        }
        fs.unlinkSync(filePath);

        console.log(`🗑️ Deleted by ${req.userAddress}: ${fileId}`);
        res.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Delete failed' });
    }
});

// ─── Health & IPFS Status ───────────────────────
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        ipfs: !!PINATA_API_KEY,
        siwe: true,
        timestamp: new Date().toISOString()
    });
});

// ─── Error Handler ──────────────────────────────
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ═══════════════════════════════════════════════');
    console.log('   CLD — Web3 Cloud Storage Server');
    console.log('   ───────────────────────────────────────────────');
    console.log(`   🌐  Server:     http://localhost:${PORT}`);
    console.log(`   📁  Uploads:    ${UPLOADS_DIR}`);
    console.log(`   🔒  Security:   Helmet, Rate Limiting, SIWE`);
    console.log(`   📌  IPFS:       ${PINATA_API_KEY ? 'Pinata ✅' : 'Disabled (no API key)'}`);
    console.log('   ───────────────────────────────────────────────');
    console.log('   Hardhat node must be running on :8545');
    console.log('═══════════════════════════════════════════════════');
    console.log('');
});
