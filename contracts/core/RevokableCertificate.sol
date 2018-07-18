pragma solidity ^0.4.24;

import "./BasicCertificate.sol";

/**
 * @title RevokableCertificate
 * @dev This contract supports revokable certificates.
 */
contract RevokableCertificate is BasicCertificate {
    event CertificateRevoked(uint256 id);

    /**
     * @dev Revokes existing certificate and sets the recipient to 0x0.
     */
    function revokeCertificate(
        uint256 _id
    )
        payable
        public
        onlyOwner
        doFee
        returns (bool)
    {
        require(_id >= 0 && _id < iCertificates);

        certificates[_id].recipient = address(0);
        emit CertificateRevoked(_id);
        return true;
    }
}
