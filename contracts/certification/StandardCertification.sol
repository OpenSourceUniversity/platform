pragma solidity ^0.4.24;

import "../core/BasicCertificate.sol";
import "../core/RevokableCertificate.sol";
import "../core/TransfarableCertificate.sol";


contract StandardCertification is BasicCertificate, RevokableCertificate, TransfarableCertificate {
    /**
     * @dev Issues certificate.
     * @dev Can be called by Authorized institution only.
     */
    function verifyCertificate(
        uint256 _id,
        bytes32[] _skills
    )
        payable
        public
        returns (bool)
    {
        super.verifyCertificate(_id, _skills);
    }


    /**
     * @dev Upload certificate.
     * @dev Can be called by the owner of the contract only.
     */
    function uploadCertificate(
        address _issuer,
        bytes _certificateHash,
        bytes32[] _skills
    )
        payable
        public
        returns (bool)
    {
        super.uploadCertificate(_issuer, _certificateHash, _skills);
    }

    /**
     * @dev Revokes document and sets the recipient to 0x0.
     * @dev Can be called by the current onwner only.
     */
    function revokeCertificate(
        uint256 _id
    )
        payable
        public
        returns (bool)
    {
        super.revokeCertificate(_id);
    }


    /**
     * @dev Revokes document and sets the recipient to 0x0.
     * @dev Can be called by the current onwner only.
     */
    function transferCertificate(
        uint256 _id,
        address recipient
    )
        payable
        public
        returns (bool)
    {
        super.transferCertificate(_id, recipient);
    }

    function changeControlingAddresses(
        address _authorityContractAddress,
        address _tokenSettingsAddress,
        address _eduCirculationAddress
    )
        public
    {
        super.changeControlingAddresses(_authorityContractAddress, _tokenSettingsAddress, _eduCirculationAddress);
    }

}
