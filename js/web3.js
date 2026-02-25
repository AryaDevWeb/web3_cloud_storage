// ═══════════════════════════════════════════════
// CLD Web3 Module — Wallet, Contract, SIWE, Events
// ═══════════════════════════════════════════════

let provider, signer, contract;
let userAddress = '';
let authToken = '';

// ─── Connect Wallet ─────────────────────────────
async function connectWallet() {
    if (!window.ethereum) throw new Error('MetaMask not found');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    userAddress = accounts[0];

    // Switch to Hardhat if needed
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: CONFIG.NETWORK.chainId }]
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: CONFIG.NETWORK.chainId,
                    chainName: CONFIG.NETWORK.chainName,
                    rpcUrls: [CONFIG.NETWORK.rpcUrl],
                    nativeCurrency: CONFIG.NETWORK.currency
                }]
            });
        }
    }

    contract = new ethers.Contract(CONFIG.CONTRACT.address, CONFIG.CONTRACT.abi, signer);

    // Auto SIWE after connect
    try {
        await signInWithEthereum();
    } catch (e) {
        console.warn('SIWE skipped:', e.message);
    }

    return userAddress;
}

// ─── SIWE Authentication ────────────────────────
async function signInWithEthereum() {
    // Request nonce from server
    const nonceResp = await fetch(CONFIG.SERVER.url + '/api/auth/nonce');
    const { nonce } = await nonceResp.json();

    const message = [
        'Sign in to CLD Cloud Storage',
        '',
        'This request will not trigger a blockchain transaction.',
        '',
        'Wallet: ' + userAddress,
        'Nonce: ' + nonce,
        'Issued At: ' + new Date().toISOString()
    ].join('\n');

    const signature = await signer.signMessage(message);

    const verifyResp = await fetch(CONFIG.SERVER.url + '/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: userAddress, message, signature })
    });

    const result = await verifyResp.json();
    if (!verifyResp.ok) throw new Error(result.error || 'SIWE verification failed');

    authToken = result.token;
    console.log('🔐 SIWE authenticated');
    return authToken;
}

function getAuthHeaders() {
    const headers = {};
    if (authToken) headers['Authorization'] = 'Bearer ' + authToken;
    return headers;
}

// ─── Network & Balance ──────────────────────────
async function getNetworkName() {
    const network = await provider.getNetwork();
    return CONFIG.NETWORK.chainName || 'Chain ' + network.chainId;
}

async function getBalance() {
    const balance = await provider.getBalance(userAddress);
    return ethers.formatEther(balance);
}

// ─── Contract: Upload ───────────────────────────
async function uploadFileOnChain(fileId, ipfsHash, fileName, fileSize, isEncrypted) {
    if (!contract) throw new Error('Wallet not connected');
    const tx = await contract.uploadFile(fileId, ipfsHash || '', fileName, fileSize, isEncrypted || false);
    await tx.wait();
    return tx.hash;
}

// ─── Contract: Get Files ────────────────────────
async function getFilesFromChain() {
    if (!contract) throw new Error('Wallet not connected');
    const files = await contract.getMyFiles();
    return files.map((file, index) => ({
        index,
        fileId: file.fileId,
        ipfsHash: file.ipfsHash || '',
        fileName: file.fileName,
        fileSize: Number(file.fileSize),
        uploadTime: Number(file.uploadTime) * 1000,
        owner: file.owner,
        isEncrypted: file.isEncrypted || false
    }));
}

// ─── Contract: Delete ───────────────────────────
async function deleteFileOnChain(index) {
    if (!contract) throw new Error('Wallet not connected');
    const tx = await contract.deleteFile(index);
    await tx.wait();
    return tx.hash;
}

// ─── Contract: Rename ───────────────────────────
async function renameFileOnChain(index, newName) {
    if (!contract) throw new Error('Wallet not connected');
    const tx = await contract.renameFile(index, newName);
    await tx.wait();
    return tx.hash;
}

// ─── Contract: Get File Count ───────────────────
async function getFileCount() {
    if (!contract) throw new Error('Wallet not connected');
    const count = await contract.getFileCount();
    return Number(count);
}

// ─── Blockchain Activity Log ────────────────────
async function getActivityLog() {
    if (!contract) return [];

    try {
        const events = [];

        // Query FileUploaded events
        const uploadFilter = contract.filters.FileUploaded(userAddress);
        const uploadEvents = await contract.queryFilter(uploadFilter);
        for (const e of uploadEvents) {
            events.push({
                type: 'upload',
                icon: '📤',
                label: 'File Uploaded',
                fileName: e.args[3],
                fileId: e.args[1],
                ipfsHash: e.args[2] || '',
                fileSize: Number(e.args[4]),
                isEncrypted: e.args[6] || false,
                blockNumber: e.blockNumber,
                txHash: e.transactionHash,
                timestamp: Number(e.args[5]) * 1000
            });
        }

        // Query FileDeleted events
        const deleteFilter = contract.filters.FileDeleted(userAddress);
        const deleteEvents = await contract.queryFilter(deleteFilter);
        for (const e of deleteEvents) {
            const block = await provider.getBlock(e.blockNumber);
            events.push({
                type: 'delete',
                icon: '🗑️',
                label: 'File Deleted',
                fileName: '',
                fileId: e.args[2],
                blockNumber: e.blockNumber,
                txHash: e.transactionHash,
                timestamp: block ? block.timestamp * 1000 : Date.now()
            });
        }

        // Query FileRenamed events
        const renameFilter = contract.filters.FileRenamed(userAddress);
        const renameEvents = await contract.queryFilter(renameFilter);
        for (const e of renameEvents) {
            const block = await provider.getBlock(e.blockNumber);
            events.push({
                type: 'rename',
                icon: '✏️',
                label: 'File Renamed',
                fileName: e.args[2] + ' → ' + e.args[3],
                blockNumber: e.blockNumber,
                txHash: e.transactionHash,
                timestamp: block ? block.timestamp * 1000 : Date.now()
            });
        }

        // Sort by block number descending (newest first)
        events.sort((a, b) => b.blockNumber - a.blockNumber);
        return events;
    } catch (error) {
        console.error('Activity log error:', error);
        return [];
    }
}

// ─── Wallet Listeners ───────────────────────────
function setupWalletListeners(onChainChanged, onAccountChanged) {
    if (!window.ethereum) return;
    window.ethereum.on('chainChanged', onChainChanged);
    window.ethereum.on('accountsChanged', onAccountChanged);
}
