pragma solidity ^0.4.16;

import "../ownership/Ownable.sol";

/**
 * @title AuthorizedAccess
 * @dev This contract allows to organise a permission based access.
 */
contract AuthorizedAccess is Ownable {
    event Authorized(address sender, address issuer);
    event Deathorized(address sender, address issuer);

    mapping (address => bool) issuers;

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
    function authorize(address issuer) onlyOwner external returns (bool) {
        issuers[issuer] = true;
        emit Authorized(msg.sender, issuer);

        return true;
    }

    /**
     * @dev Deauthorizes existing issuer.
     */
    function deauthorize(address issuer) onlyOwner external returns (bool) {
        issuers[issuer] = false;
        emit Deathorized(msg.sender, issuer);

        return true;
    }

    /**
     * Indicates whether issuer has been authorized.
     */
    function isAuthorized(address issuer) public constant returns (bool) {
        return issuers[issuer];
    }
}
