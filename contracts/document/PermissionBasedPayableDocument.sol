pragma solidity ^0.4.16;

import "../core/AuthorizedAccess.sol";
import "./PublicPayableDocument.sol";

/**
 * @title PermissionBasedPayableDocument
 * @dev Charges a fixed fee (goes to the contract's owner) for document issue.
 *      Owner can authorize/deauthorize any address to allow/disallow issue and revoke documents.
 */
contract PermissionBasedPayableDocument is PublicPayableDocument, AuthorizedAccess {
    /**
     * @dev Issues document for a fixed fee.
     * @dev Can be called by the authorized issuer only.
     */
    function issueDocument(address recipient, bytes32 document) payable public returns (bool) {
        require(authorizedCall());
        super.issueDocument(recipient, document);
    }

    /**
     * @dev Revokes document and sets recipient as 0x0.
     * @dev Can be called by the authorized issuer only.
     */
    function revokeDocument(address recipient, bytes32 document) public returns (bool) {
        require(authorizedCall());
        super.revokeDocument(recipient, document);
    }
}
