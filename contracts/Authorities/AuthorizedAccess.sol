pragma solidity ^0.4.24;

import "../ownership/Ownable.sol";

/**
 * @title AuthorizedAccess
 * @dev This contract allows to organise a permission based access.
 */
contract AuthorizedAccess is Ownable {
    event Authorized(address sender, address issuer, bytes32 title, bytes hash);
    event Deathorized(address sender, address issuer, bytes32 title, bytes hash);

    struct AuthorityStruct {
        bool active;
        bytes32 academyTitle;
        bytes authorityHash;
    }
    // Address and hash from IPFS storage of the documents related to
    // legalizing the institution as an academy
    mapping (address => AuthorityStruct) issuers;

    /**
     * @dev Throws if called by any account other than the athorized issuer.
     * @notice Owner is not authorized by default.
    */
    function authorizedCall() internal constant returns (bool) {
        require(isAuthorized(msg.sender));
        return true;
    }

    /**
     * @dev Authorizes a new issuer (trusted ethereum address) to issue and revoke documents.
     */
    function authorize(address _issuer, bytes32 _title, bytes _hash) onlyOwner external returns (bool) {
        issuers[_issuer].active = true;
        issuers[_issuer].academyTitle = _title;
        issuers[_issuer].authorityHash = _hash;
        emit Authorized(msg.sender, _issuer, _title, _hash);
        return true;
    }

    /**
     * @dev Deauthorizes existing issuer.
     */
    function deauthorize(address _issuer) onlyOwner external returns (bool) {
        issuers[_issuer].active = false;
        emit Deathorized(msg.sender, _issuer);
        return true;
    }

    /**
     * Indicates whether issuer has been authorized.
     */
    function isAuthorized(address _issuer) external view returns (bool) {
        return issuers[_issuer].active;
    }
}
