pragma solidity ^0.4.24;

contract VerificationStorage {
    event Verification(bytes ipfsHash, address granted_to);

    function verify(bytes _ipfsHash, address _grant_to) public {
        emit Verification(_ipfsHash, _grant_to);
    }
}
