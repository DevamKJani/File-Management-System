pragma solidity ^0.8.0;

contract FileManagement {
    // Variables
    mapping(bytes32 => bool) private files;

    // Events
    event FileAdded(bytes32 indexed fileHash);
    event FileRemoved(bytes32 indexed fileHash);

    // Functions
    function addFile(bytes32 fileHash) public {
        require(!files[fileHash], "File already exists");
        files[fileHash] = true;
        emit FileAdded(fileHash);
    }

    function removeFile(bytes32 fileHash) public {
        require(files[fileHash], "File does not exist");
        files[fileHash] = false;
        emit FileRemoved(fileHash);
    }

    function fileExists(bytes32 fileHash) public view returns (bool) {
        return files[fileHash];
    }
}
