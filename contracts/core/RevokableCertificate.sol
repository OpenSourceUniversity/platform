pragma solidity ^0.4.16;

import "./BasicCertificate.sol";

/**
 * @title RevokableCertificate
 * @dev This contract supports revokable certificates.
 */
contract RevokableCertificate is BasicCertificate {
    event CertificateRevoked(address course);

    /**
     * @dev Revokes existing certificate and sets the recipient to 0x0.
     */
    function revokeCertificate(address course) public onlyOwner returns (bool) {
        certificates[course].recipient = address(0);
        emit CertificateRevoked(course);
        return true;
    }
}
