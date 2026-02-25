const HERO_ICONS = {
    home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`,
    folder: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-19.5 0A2.25 2.25 0 0 0 4.5 15h15a2.25 2.25 0 0 0 2.25-2.25m-19.5 0v.75A2.25 2.25 0 0 0 4.5 18h15a2.25 2.25 0 0 0 2.25-2.25v-.75" /></svg>`,
    document: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>`,
    image: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>`,
    video: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
    audio: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303A2.25 2.25 0 0 1 7.368 17.72l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 11.813V9Z" /></svg>`,
    code: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>`,
    archive: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>`,
    view: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>`,
    rename: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>`,
    download: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>`,
    share: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>`,
    delete: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>`,
    lock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
    pin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>`,
    upload: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>`,
    activity: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2Z" /></svg>`
};

document.addEventListener('DOMContentLoaded', () => initApp());

function initApp() {
    // ─── UI Elements ────────────────────────────
    const connectBtn = document.getElementById('connectWallet');
    const walletAddr = document.getElementById('walletAddress');
    const networkInfo = document.getElementById('networkInfo');
    const balanceInfo = document.getElementById('balanceInfo');
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const homeFileList = document.getElementById('homeFileList');
    const filesFileList = document.getElementById('filesFileList');
    const searchBar = document.getElementById('searchBar');
    const statusMessage = document.getElementById('statusMessage');
    const totalFilesEl = document.getElementById('totalFiles');
    const totalSizeEl = document.getElementById('totalSize');
    const totalSharedEl = document.getElementById('totalShared');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const encryptToggle = document.getElementById('encryptToggle');
    const dragOverlay = document.getElementById('dragOverlay');
    const activityList = document.getElementById('activityList');

    let allFiles = [];
    let currentPage = 'home';
    let currentCategory = 'all';

    // ─── Page Routing ───────────────────────────
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
        item.addEventListener('click', function () {
            const page = this.dataset.page;
            switchPage(page);
        });
    });

    function switchPage(page) {
        currentPage = page;
        document.querySelectorAll('.nav-item[data-page]').forEach(i => i.classList.remove('active'));
        document.querySelector(`.nav-item[data-page="${page}"]`).classList.add('active');
        document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
        const pageEl = document.getElementById('page-' + page);
        if (pageEl) pageEl.style.display = 'block';

        if (page === 'activity') loadActivity();
        if (page === 'files') renderFileList(filterByCategory(allFiles), filesFileList);
    }

    // ─── Category Filter ────────────────────────
    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.cat;
            renderFileList(filterByCategory(allFiles), filesFileList);
        });
    });

    function filterByCategory(files) {
        if (currentCategory === 'all') return files;
        return files.filter(f => getCategory(f.fileName) === currentCategory);
    }

    function getCategory(fileName) {
        const ext = fileName.split('.').pop().toLowerCase();
        const map = {
            images: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'],
            videos: ['mp4', 'webm', 'ogg', 'avi', 'mkv', 'mov'],
            documents: ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx', 'csv', 'md'],
            audio: ['mp3', 'wav', 'flac', 'aac', 'ogg'],
            archives: ['zip', 'rar', '7z', 'tar', 'gz'],
            code: ['js', 'ts', 'py', 'java', 'html', 'css', 'json', 'xml', 'yaml', 'yml', 'sol', 'go', 'rs']
        };
        for (const [cat, exts] of Object.entries(map)) {
            if (exts.includes(ext)) return cat;
        }
        return 'other';
    }

    // ─── Connect Wallet ─────────────────────────
    connectBtn.addEventListener('click', async () => {
        connectBtn.disabled = true;
        connectBtn.innerHTML = '<span class="btn-loader"></span> Connecting...';

        try {
            const address = await connectWallet();

            walletAddr.querySelector('span:last-child').textContent = address.substring(0, 6) + '...' + address.substring(38);
            walletAddr.style.display = 'inline-flex';
            connectBtn.style.display = 'none';

            const netName = await getNetworkName();
            const balance = await getBalance();
            networkInfo.textContent = netName;
            balanceInfo.textContent = parseFloat(balance).toFixed(4) + ' CLD';
            document.querySelector('.wallet-details').style.display = 'flex';

            showStatus('Wallet connected & authenticated!', 'success');
            await loadFiles();

        } catch (error) {
            console.error('Connection error:', error);
            showStatus(error.code === 4001 ? 'Connection rejected' : 'Connection failed: ' + error.message, 'error');
            connectBtn.disabled = false;
            connectBtn.innerHTML = '<span class="btn-icon">🔗</span> Connect Wallet';
        }
    });

    setupWalletListeners(
        () => window.location.reload(),
        (accs) => { if (accs.length === 0) showStatus('Wallet disconnected', 'error'); window.location.reload(); }
    );

    // ─── Upload Zone ────────────────────────────
    uploadZone.addEventListener('click', () => {
        if (!userAddress) return showStatus('⚠️ Connect wallet first', 'error');
        fileInput.click();
    });
    uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('dragover'); });
    uploadZone.addEventListener('dragleave', e => { e.preventDefault(); uploadZone.classList.remove('dragover'); });
    uploadZone.addEventListener('drop', e => {
        e.preventDefault(); uploadZone.classList.remove('dragover');
        if (!userAddress) return showStatus('⚠️ Connect wallet first', 'error');
        handleFileUpload(e.dataTransfer.files);
    });
    fileInput.addEventListener('change', e => {
        if (e.target.files.length > 0) { handleFileUpload(e.target.files); e.target.value = ''; }
    });

    // ─── Full-Screen Drag Overlay ───────────────
    let dragCounter = 0;
    document.addEventListener('dragenter', e => {
        e.preventDefault();
        dragCounter++;
        if (userAddress) dragOverlay.classList.add('show');
    });
    document.addEventListener('dragleave', e => {
        e.preventDefault();
        dragCounter--;
        if (dragCounter <= 0) { dragCounter = 0; dragOverlay.classList.remove('show'); }
    });
    document.addEventListener('dragover', e => e.preventDefault());
    document.addEventListener('drop', e => {
        e.preventDefault(); dragCounter = 0; dragOverlay.classList.remove('show');
    });
    dragOverlay.addEventListener('drop', e => {
        e.preventDefault(); dragCounter = 0; dragOverlay.classList.remove('show');
        if (!userAddress) return;
        handleFileUpload(e.dataTransfer.files);
    });

    // ─── File Upload Handler ────────────────────
    async function handleFileUpload(fileList) {
        const total = fileList.length;
        let completed = 0;
        const encrypt = encryptToggle && encryptToggle.checked;

        showProgress(true);

        for (const file of fileList) {
            try {
                updateProgress(completed, total, `Uploading ${file.name}...`);

                let uploadBody;
                let uploadFileName = file.name;

                if (encrypt) {
                    updateProgress(completed, total, `Encrypting ${file.name}...`);
                    const arrayBuffer = await file.arrayBuffer();
                    const encrypted = await CLDCrypto.encrypt(arrayBuffer);
                    const encBlob = new Blob([encrypted], { type: 'application/octet-stream' });
                    uploadBody = new FormData();
                    uploadBody.append('file', encBlob, file.name + '.enc');
                    uploadFileName = file.name;
                } else {
                    uploadBody = new FormData();
                    uploadBody.append('file', file);
                }

                updateProgress(completed, total, `Uploading ${file.name}...`);
                const response = await fetch(CONFIG.SERVER.url + '/api/upload', { method: 'POST', body: uploadBody });
                if (!response.ok) { const e = await response.json().catch(() => ({})); throw new Error(e.error || 'Upload failed'); }
                const result = await response.json();

                updateProgress(completed, total, `Storing ${file.name} on blockchain...`);
                await uploadFileOnChain(result.fileId, result.ipfsHash || '', uploadFileName, result.fileSize, encrypt);

                completed++;
                showStatus(`${file.name} uploaded${encrypt ? ' (encrypted)' : ''}${result.ipfsHash ? ' + IPFS' : ''}!`, 'success');
            } catch (error) {
                console.error('Upload error:', error);
                showStatus(`Failed: ${file.name}: ${error.message}`, 'error');
            }
        }

        setTimeout(() => showProgress(false), 1500);
        await loadFiles();
    }

    // ─── Load Files ─────────────────────────────
    async function loadFiles() {
        try {
            allFiles = await getFilesFromChain();
            renderFileList(allFiles.slice(0, 5), homeFileList);
            if (currentPage === 'files') renderFileList(filterByCategory(allFiles), filesFileList);
            updateStats(allFiles);
        } catch (error) { console.error('Load error:', error); }
    }

    // ─── Render File List ───────────────────────
    function renderFileList(files, container) {
        if (!container) return;
        container.innerHTML = '';

        if (files.length === 0) {
            container.innerHTML = `<div class="empty-state" style="display:block"><div class="empty-icon">${HERO_ICONS.folder}</div><h3>No files yet</h3><p>Upload files to get started</p></div>`;
            return;
        }

        files.forEach(file => {
            const el = document.createElement('div');
            el.className = 'file-item';
            const safeName = escapeHtml(file.fileName);
            const safeId = escapeAttr(file.fileId);
            const badges = [];
            if (file.isEncrypted) badges.push('<span class="badge badge-encrypted" title="Encrypted">🔒</span>');
            if (file.ipfsHash) badges.push('<span class="badge badge-ipfs" title="IPFS: ' + escapeAttr(file.ipfsHash) + '">📌</span>');

            el.innerHTML = `
                <div class="file-name">
                    <div class="file-icon">${getFileIcon(file.fileName)}</div>
                    <div class="file-info">
                        <div class="file-title">${safeName} ${badges.join('')}</div>
                        <div class="file-hash" title="${safeId}">ID: ${safeId.substring(0, 16)}...</div>
                    </div>
                </div>
                <div class="file-size">${formatFileSize(file.fileSize)}</div>
                <div class="file-date">${formatDate(file.uploadTime)}</div>
                <div class="file-actions">
                    <button class="kebab-btn" data-index="${file.index}" aria-label="Actions" title="Actions">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                        </svg>
                    </button>
                    <div class="file-dropdown" id="dropdown-${file.index}">
                        <button class="dropdown-item" onclick="viewFileAction('${safeId}','${safeName}',${file.isEncrypted})"><span>${HERO_ICONS.view}</span> View</button>
                        <button class="dropdown-item" onclick="renameFileAction(${file.index},'${safeName}')"><span>${HERO_ICONS.rename}</span> Rename</button>
                        <button class="dropdown-item" onclick="downloadFileAction('${safeId}','${safeName}',${file.isEncrypted})"><span>${HERO_ICONS.download}</span> Download</button>
                        <button class="dropdown-item" onclick="shareFileAction('${safeId}','${escapeAttr(file.ipfsHash || '')}')"><span>${HERO_ICONS.share}</span> Share Link</button>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item dropdown-delete" onclick="deleteFileAction(${file.index},'${safeId}')"><span>${HERO_ICONS.delete}</span> Delete</button>
                    </div>
                </div>`;
            container.appendChild(el);
        });

        container.querySelectorAll('.kebab-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const dd = document.getElementById('dropdown-' + btn.dataset.index);
                document.querySelectorAll('.file-dropdown.show').forEach(d => { if (d !== dd) d.classList.remove('show'); });
                dd.classList.toggle('show');
            });
        });
    }

    document.addEventListener('click', () => {
        document.querySelectorAll('.file-dropdown.show').forEach(d => d.classList.remove('show'));
    });

    // ─── Search ─────────────────────────────────
    if (searchBar) {
        searchBar.addEventListener('input', e => {
            const q = e.target.value.toLowerCase();
            const target = currentPage === 'files' ? filesFileList : homeFileList;
            const base = currentPage === 'files' ? filterByCategory(allFiles) : allFiles.slice(0, 5);
            if (!q) return renderFileList(base, target);
            renderFileList(base.filter(f => f.fileName.toLowerCase().includes(q) || f.fileId.includes(q)), target);
        });
    }

    // ─── Activity Log ───────────────────────────
    async function loadActivity() {
        if (!activityList) return;
        activityList.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Loading blockchain activity...</div>';

        try {
            const events = await getActivityLog();
            if (events.length === 0) {
                activityList.innerHTML = '<div class="empty-state" style="display:block"><div class="empty-icon">📋</div><h3>No activity yet</h3><p>Your blockchain transactions will appear here</p></div>';
                return;
            }

            activityList.innerHTML = '';
            events.forEach(event => {
                const item = document.createElement('div');
                item.className = 'activity-item';
                const icon = HERO_ICONS[event.type] || HERO_ICONS.activity;
                item.innerHTML = `
                    <div class="activity-icon">${icon}</div>
                    <div class="activity-details">
                        <div class="activity-label">${event.label}</div>
                        <div class="activity-file">${escapeHtml(event.fileName || event.fileId?.substring(0, 20) + '...' || '')}</div>
                        <div class="activity-meta">
                            Block #${event.blockNumber} · ${formatDate(event.timestamp)}
                            ${event.isEncrypted ? ' · 🔒 Encrypted' : ''}
                            ${event.ipfsHash ? ' · 📌 IPFS' : ''}
                        </div>
                    </div>
                    <div class="activity-tx" title="${event.txHash}">
                        ${event.txHash ? event.txHash.substring(0, 10) + '...' : ''}
                    </div>`;
                activityList.appendChild(item);
            });
        } catch (error) {
            console.error('Activity error:', error);
            activityList.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Failed to load activity</div>';
        }
    }

    // ─── Stats ──────────────────────────────────
    function updateStats(files) {
        if (totalFilesEl) totalFilesEl.textContent = files.length;
        if (totalSizeEl) totalSizeEl.textContent = formatFileSize(files.reduce((s, f) => s + f.fileSize, 0));
        if (totalSharedEl) totalSharedEl.textContent = files.filter(f => f.ipfsHash).length;
    }

    // ─── Progress ───────────────────────────────
    function showProgress(show) { if (uploadProgress) uploadProgress.style.display = show ? 'block' : 'none'; }
    function updateProgress(cur, total, text) {
        const pct = total > 0 ? Math.round((cur / total) * 100) : 0;
        if (progressBar) progressBar.style.width = pct + '%';
        if (progressText) progressText.textContent = text;
    }

    // ─── Status Toast ───────────────────────────
    function showStatus(msg, type = 'info') {
        statusMessage.textContent = msg;
        statusMessage.className = 'status-message show ' + type;
        setTimeout(() => { statusMessage.className = 'status-message'; }, 4000);
    }

    window.showStatus = showStatus;
    window.loadFiles = loadFiles;
}

// ═══════════════════════════════════════════════
// Global Action Functions
// ═══════════════════════════════════════════════

async function viewFileAction(fileId, fileName, isEncrypted) {
    closeAllDropdowns();
    const modal = document.getElementById('previewModal');
    const title = document.getElementById('previewTitle');
    const body = document.getElementById('previewBody');

    title.textContent = fileName + (isEncrypted ? ' (Encrypted)' : '');
    body.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Loading preview...</div>';
    modal.classList.add('show');

    const ext = fileName.split('.').pop().toLowerCase();
    const fileUrl = CONFIG.SERVER.url + '/api/files/' + encodeURIComponent(fileId) + '?name=' + encodeURIComponent(fileName);

    try {
        if (isEncrypted) {
            const resp = await fetch(fileUrl);
            const encBuffer = await resp.arrayBuffer();
            window.showStatus('Decrypting file...', 'info');
            const decrypted = await CLDCrypto.decrypt(encBuffer);

            if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) {
                const blob = new Blob([decrypted], { type: 'image/' + ext });
                body.innerHTML = `<img src="${URL.createObjectURL(blob)}" class="preview-image" alt="${escapeHtml(fileName)}">`;
            } else if (['txt', 'md', 'json', 'js', 'py', 'html', 'css', 'xml', 'yaml', 'csv', 'log', 'sol'].includes(ext)) {
                const text = new TextDecoder().decode(decrypted);
                body.innerHTML = `<pre class="preview-text">${escapeHtml(text.substring(0, 50000))}</pre>`;
            } else {
                const blob = new Blob([decrypted]);
                const url = URL.createObjectURL(blob);
                body.innerHTML = `<div class="preview-unsupported"><div class="preview-unsupported-icon">${getFileIcon(fileName)}</div><h3>${escapeHtml(fileName)}</h3><p>Decrypted successfully</p><a href="${url}" download="${escapeHtml(fileName)}" class="preview-download-btn">Download Decrypted</a></div>`;
            }
            window.showStatus('File decrypted!', 'success');
        } else {
            if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'].includes(ext)) {
                body.innerHTML = `<img src="${fileUrl}" class="preview-image" alt="${escapeHtml(fileName)}">`;
            } else if (ext === 'pdf') {
                body.innerHTML = `<iframe src="${fileUrl}" class="preview-iframe"></iframe>`;
            } else if (['mp4', 'webm', 'ogg'].includes(ext)) {
                body.innerHTML = `<video controls class="preview-video"><source src="${fileUrl}"></video>`;
            } else if (['mp3', 'wav', 'flac'].includes(ext)) {
                body.innerHTML = `<div class="preview-audio-container"><div class="preview-audio-icon">${HERO_ICONS.audio}</div><div class="preview-audio-name">${escapeHtml(fileName)}</div><audio controls class="preview-audio"><source src="${fileUrl}"></audio></div>`;
            } else if (['txt', 'md', 'json', 'js', 'py', 'html', 'css', 'xml', 'yaml', 'csv', 'log', 'sol'].includes(ext)) {
                const resp = await fetch(fileUrl);
                const text = await resp.text();
                body.innerHTML = `<pre class="preview-text">${escapeHtml(text.substring(0, 50000))}</pre>`;
            } else {
                body.innerHTML = `<div class="preview-unsupported"><div class="preview-unsupported-icon">${getFileIcon(fileName)}</div><h3>${escapeHtml(fileName)}</h3><p>Preview not available for .${ext} files</p><a href="${fileUrl}" download="${escapeHtml(fileName)}" class="preview-download-btn">Download</a></div>`;
            }
        }
    } catch (error) {
        body.innerHTML = `<div class="preview-unsupported"><div class="preview-unsupported-icon">${HERO_ICONS.archive}</div><h3>Preview Failed</h3><p>${escapeHtml(error.message)}</p></div>`;
    }
}

function closePreviewModal() {
    const modal = document.getElementById('previewModal');
    modal.classList.remove('show');
    const v = modal.querySelector('video'); if (v) v.pause();
    const a = modal.querySelector('audio'); if (a) a.pause();
}

async function renameFileAction(index, currentName) {
    closeAllDropdowns();
    const modal = document.getElementById('renameModal');
    const input = document.getElementById('renameInput');
    const confirmBtn = document.getElementById('renameConfirm');

    const parts = currentName.split('.');
    const ext = parts.length > 1 ? '.' + parts.pop() : '';
    input.value = parts.join('.');
    input.dataset.ext = ext;
    input.dataset.index = index;
    modal.classList.add('show');
    setTimeout(() => { input.focus(); input.setSelectionRange(0, input.value.length); }, 100);

    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

    newBtn.addEventListener('click', async () => {
        const newName = input.value.trim() + input.dataset.ext;
        if (!input.value.trim()) return window.showStatus('Name cannot be empty', 'error');
        newBtn.disabled = true; newBtn.textContent = 'Renaming...';
        try {
            await renameFileOnChain(parseInt(input.dataset.index), newName);
            window.showStatus('Renamed to ' + newName, 'success');
            closeRenameModal();
            await window.loadFiles();
        } catch (e) { window.showStatus('Rename failed: ' + e.message, 'error'); }
        finally { newBtn.disabled = false; newBtn.textContent = 'Rename'; }
    });

    input.onkeydown = e => { if (e.key === 'Enter') newBtn.click(); if (e.key === 'Escape') closeRenameModal(); };
}
function closeRenameModal() { document.getElementById('renameModal').classList.remove('show'); }

async function downloadFileAction(fileId, fileName, isEncrypted) {
    closeAllDropdowns();
    try {
        const url = CONFIG.SERVER.url + '/api/files/' + encodeURIComponent(fileId) + '?name=' + encodeURIComponent(fileName);
        if (isEncrypted) {
            window.showStatus('Downloading & decrypting...', 'info');
            const resp = await fetch(url);
            const encBuf = await resp.arrayBuffer();
            const decrypted = await CLDCrypto.decrypt(encBuf);
            const blob = new Blob([decrypted]);
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl; a.download = fileName;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
            window.showStatus('Decrypted download started!', 'success');
        } else {
            window.showStatus('Downloading...', 'info');
            const a = document.createElement('a');
            a.href = url; a.download = fileName;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            window.showStatus('Download started!', 'success');
        }
    } catch (e) { window.showStatus('Download failed: ' + e.message, 'error'); }
}

async function shareFileAction(fileId, ipfsHash) {
    closeAllDropdowns();
    try {
        let link;
        if (ipfsHash) {
            link = 'https://gateway.pinata.cloud/ipfs/' + ipfsHash;
            window.showStatus('IPFS link copied!', 'success');
        } else {
            link = CONFIG.SERVER.url + '/api/files/' + encodeURIComponent(fileId);
            window.showStatus('Link copied!', 'success');
        }
        await navigator.clipboard.writeText(link);
    } catch { window.showStatus('Failed to copy link', 'error'); }
}

async function deleteFileAction(index, fileId) {
    closeAllDropdowns();
    if (!confirm('Are you sure you want to delete this file?')) return;
    try {
        window.showStatus('Deleting...', 'info');
        const headers = typeof getAuthHeaders === 'function' ? getAuthHeaders() : {};
        const resp = await fetch(CONFIG.SERVER.url + '/api/files/' + encodeURIComponent(fileId), { method: 'DELETE', headers });
        if (!resp.ok) { const e = await resp.json().catch(() => ({})); throw new Error(e.error || 'Server error'); }
        await deleteFileOnChain(index);
        window.showStatus('File deleted!', 'success');
        await window.loadFiles();
    } catch (e) { window.showStatus('Delete failed: ' + e.message, 'error'); }
}

function closeAllDropdowns() { document.querySelectorAll('.file-dropdown.show').forEach(d => d.classList.remove('show')); }

// ─── Utility Functions ──────────────────────────
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(i > 0 ? 1 : 0) + ' ' + sizes[i];
}
function formatDate(ts) {
    if (!ts) return '-';
    return new Date(ts).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}
function getFileIcon(fn) {
    const ext = fn.split('.').pop().toLowerCase();
    const m = {
        pdf: HERO_ICONS.document, doc: HERO_ICONS.document, docx: HERO_ICONS.document, txt: HERO_ICONS.document,
        jpg: HERO_ICONS.image, jpeg: HERO_ICONS.image, png: HERO_ICONS.image, gif: HERO_ICONS.image, svg: HERO_ICONS.image, webp: HERO_ICONS.image,
        mp4: HERO_ICONS.video, avi: HERO_ICONS.video, mp3: HERO_ICONS.audio, wav: HERO_ICONS.audio,
        zip: HERO_ICONS.archive, rar: HERO_ICONS.archive, js: HERO_ICONS.code, py: HERO_ICONS.code,
        html: HERO_ICONS.code, css: HERO_ICONS.code, sol: HERO_ICONS.code, json: HERO_ICONS.document,
        csv: HERO_ICONS.document, xls: HERO_ICONS.document, xlsx: HERO_ICONS.document
    };
    return m[ext] || HERO_ICONS.document;
}
function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function escapeAttr(s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
