pragma solidity ^0.4.24;

contract ipfsHashStorage {
    event IPFSverification(bytes IpfsHash, address learner);
    bytes ipfsHash;
    address learnerAddress;

    function sendHash(bytes x, address _learner) public {
        ipfsHash = x;
        learnerAddress = _learner;
        emit IPFSverification(ipfsHash, learnerAddress);
    }
}
