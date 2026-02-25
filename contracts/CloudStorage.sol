// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CloudStorage {
    struct File {
        string fileId;        // SHA256 hash of file content
        string ipfsHash;      // IPFS CID (empty if not pinned)
        string fileName;
        uint256 fileSize;
        uint256 uploadTime;
        address owner;
        bool isEncrypted;
    }

    mapping(address => File[]) private userFiles;

    event FileUploaded(
        address indexed owner,
        string fileId,
        string ipfsHash,
        string fileName,
        uint256 fileSize,
        uint256 uploadTime,
        bool isEncrypted
    );
    event FileDeleted(address indexed owner, uint256 index, string fileId);
    event FileRenamed(address indexed owner, uint256 index, string oldName, string newName);

    function uploadFile(
        string memory _fileId,
        string memory _ipfsHash,
        string memory _fileName,
        uint256 _fileSize,
        bool _isEncrypted
    ) public {
        require(bytes(_fileId).length > 0, "File ID cannot be empty");
        require(bytes(_fileName).length > 0, "File name cannot be empty");
        require(_fileSize > 0, "File size must be greater than 0");

        File memory newFile = File({
            fileId: _fileId,
            ipfsHash: _ipfsHash,
            fileName: _fileName,
            fileSize: _fileSize,
            uploadTime: block.timestamp,
            owner: msg.sender,
            isEncrypted: _isEncrypted
        });

        userFiles[msg.sender].push(newFile);

        emit FileUploaded(msg.sender, _fileId, _ipfsHash, _fileName, _fileSize, block.timestamp, _isEncrypted);
    }

    function getMyFiles() public view returns (File[] memory) {
        return userFiles[msg.sender];
    }

    function getFileCount() public view returns (uint256) {
        return userFiles[msg.sender].length;
    }

    function deleteFile(uint256 _index) public {
        require(_index < userFiles[msg.sender].length, "File index out of bounds");

        string memory fileId = userFiles[msg.sender][_index].fileId;
        uint256 lastIndex = userFiles[msg.sender].length - 1;

        if (_index != lastIndex) {
            userFiles[msg.sender][_index] = userFiles[msg.sender][lastIndex];
        }

        userFiles[msg.sender].pop();

        emit FileDeleted(msg.sender, _index, fileId);
    }

    function getFile(uint256 _index) public view returns (File memory) {
        require(_index < userFiles[msg.sender].length, "File index out of bounds");
        return userFiles[msg.sender][_index];
    }

    function renameFile(uint256 _index, string memory _newName) public {
        require(_index < userFiles[msg.sender].length, "File index out of bounds");
        require(bytes(_newName).length > 0, "File name cannot be empty");

        string memory oldName = userFiles[msg.sender][_index].fileName;
        userFiles[msg.sender][_index].fileName = _newName;

        emit FileRenamed(msg.sender, _index, oldName, _newName);
    }
}
