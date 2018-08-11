pragma solidity ^0.4.24;

contract VerificationStorage {
    event Verification(bytes ipfsHash, address grantedTo);

    function verify(bytes _ipfsHash, address _grantTo) public {
        emit Verification(_ipfsHash, _grantTo);
    }
}
