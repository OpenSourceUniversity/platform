pragma solidity ^0.4.24;

import "../core/BasicCertificate.sol";
import "../core/RevokableCertificate.sol";
import "../core/TransfarableCertificate.sol";
import "../authorities/AuthorizedAccess.sol";


contract StandardCertification is BasicCertificate, RevokableCertificate, TransfarableCertificate, AuthorizedAccess {
    /**
     * @dev Issues certificate.
     * @dev Can be called by Authorized institution only.
     */
    function issueCertificate(address _course, bytes32[] _skills) payable public returns (bool) {
        require(super.isAuthorized(msg.sender));
        super.issueDocument(_course, _skills);
    }


    /**
     * @dev Revokes document and sets the recipient to 0x0.
     * @dev Can be called by the current onwner only.
     */
    function revokeDocument(address recipient, bytes32 document) public returns (bool) {
        require(msg.sender == owner);
        super.revokeDocument(recipient, document);
    }
}
