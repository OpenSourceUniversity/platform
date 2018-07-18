pragma solidity ^0.4.24;

import "./BasicCertificate.sol";

/**
 * @title TransfarableCertificate
 * @dev This contract supports certificate transfer between accounts.
 */
contract TransfarableCertificate is BasicCertificate {
    event CertificateTransfered(address from, address to, uint256 id);

    /**
     * @dev Transfers existing certificate to another account.
     */
    function transferCertificate(uint256 _id, address recipient) payable onlyOwner doFee public returns (bool) {
        require(recipient != address(0));
        require(_id >= 0 && _id < iCertificates);
        require(certificates[_id].recipient == owner);

        bool verifyCertificateTransfer;
        bytes storage emptyHash;
        verifyCertificateTransfer = BasicCertificate(recipient).uploadCertificate(certificates[_id].issuer, certificates[_id].certificateHash, certificates[_id].skills);
        certificates[_id].recipient = address(0);
        certificates[_id].certificateHash = emptyHash;
        delete certificates[_id].skills;
        emit CertificateTransfered(owner, recipient, _id);
        return true;
    }
}
