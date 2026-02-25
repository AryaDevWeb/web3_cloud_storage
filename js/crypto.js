// ═══════════════════════════════════════════════
// CLD Crypto Module - Client-Side File Encryption
// AES-256-GCM with wallet-derived key
// ═══════════════════════════════════════════════

const CLDCrypto = {
    _encKey: null,

    // Derive AES-256 key from wallet signature (deterministic per wallet)
    async deriveKey() {
        if (this._encKey) return this._encKey;
        if (!signer || !userAddress) throw new Error('Wallet not connected');

        const message = [
            'CLD Cloud Storage Encryption Key',
            '',
            'Sign this message to derive your personal encryption key.',
            'This key is unique to your wallet and used to encrypt/decrypt your files.',
            '',
            'Wallet: ' + userAddress
        ].join('\n');

        window.showStatus('🔑 Please sign the message to derive encryption key...', 'info');
        const signature = await signer.signMessage(message);

        // Hash signature to get 256-bit key
        const sigBytes = new TextEncoder().encode(signature);
        const hashBuffer = await crypto.subtle.digest('SHA-256', sigBytes);

        this._encKey = await crypto.subtle.importKey(
            'raw', hashBuffer, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']
        );

        window.showStatus('🔑 Encryption key derived!', 'success');
        return this._encKey;
    },

    // Encrypt file: returns ArrayBuffer with 12-byte IV prepended
    async encrypt(fileBuffer) {
        const key = await this.deriveKey();
        const iv = crypto.getRandomValues(new Uint8Array(12));

        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv }, key, fileBuffer
        );

        const result = new Uint8Array(12 + encrypted.byteLength);
        result.set(iv, 0);
        result.set(new Uint8Array(encrypted), 12);
        return result.buffer;
    },

    // Decrypt file: extracts 12-byte IV, decrypts rest
    async decrypt(encryptedBuffer) {
        const key = await this.deriveKey();
        const data = new Uint8Array(encryptedBuffer);
        const iv = data.slice(0, 12);
        const ciphertext = data.slice(12);

        return await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv }, key, ciphertext
        );
    },

    clearKey() {
        this._encKey = null;
    },

    hasKey() {
        return this._encKey !== null;
    }
};
