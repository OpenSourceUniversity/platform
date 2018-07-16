pragma solidity ^0.4.24;

import "./BasicCertificate.sol";

/**
 * @title TransfarableCertificate
 * @dev This contract supports certificate transfer between accounts.
 */
contract TransfarableCertificate is BasicCertificate {
    event CertificateTransfered(address from, address to, address course);

    /**
     * @dev Transfers existing certificate to another account.
     */
    function transferCertificate(address recipient, address course) onlyOwner external returns (bool) {
        require(recipient != address(0));
        require(certificates[course].recipient == owner);
        bool verifyCertificateTransfer;
        bytes emptyHash;
        verifyCertificateTransfer = recipient.uploadCertificate(course, certificates[course].issuer, certificates[course].certificateHash, certificates[course].skills);
        certificates[course].recipient = address(0);
        certificates[course].certificateHash = emptyHash;
        delete certificates[course].skills;
        emit CertificateTransfered(owner, recipient, course);

        return true;
    }
}
