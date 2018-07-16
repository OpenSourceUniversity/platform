pragma solidity ^0.4.16;

import "../core/AuthorizedAccess.sol";
import "./PublicDocument.sol";

/**
 * @title PermissionBasedDocument
 * @dev Owner can authorize/deauthorize any address to allow/disallow issue and revoke documents.
 */
contract PermissionBasedDocument is PublicDocument, AuthorizedAccess {
    /**
     * @dev Issues document.
     * @dev Can be called by the authorized issuer only.
     */
    function issueDocument(address recipient, bytes32 document) payable public returns (bool) {
        require(authorizedCall());
        super.issueDocument(recipient, document);
    }

    /**
     * @dev Revokes document and sets the recipient to 0x0.
     * @dev Can be called by the authorized issuer only.
     */
    function revokeDocument(address recipient, bytes32 document) public returns (bool) {
        require(authorizedCall());
        super.revokeDocument(recipient, document);
    }
}
