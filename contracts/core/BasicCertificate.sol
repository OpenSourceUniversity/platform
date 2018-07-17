pragma solidity ^0.4.24;

import "../ownership/Ownable.sol";
import "../tokenCirculation/EDUcirculation.sol";
import "../abstracts/AuthorizedAccessAbstract.sol";

/**
 * @title Basic Certificate
 * @dev This basic contract allows to issue certificates along with
 *      skills gained in the certification process.
 */
contract BasicCertificate is Ownable, EDUcirculation {
    event CertificateIssued(uint256 id, address issuer, address recipient, bytes32[] skillsVerified);
    event CertificateUploaded(uint256 id, address issuer, address recipient, bytes32[] skills, bytes certificateHash);

    struct CertificateBody {
        address issuer;
        address recipient;
        bytes certificateHash;
        bytes32[] skills;
        bool verifiedSkills;
    }

    // addresses are related to address of every course
    mapping (uint256 => CertificateBody) certificates;
    address public authorityAddress;

    // global counter
    uint256 public iCertificates;

    // Constructor of the smart contract which has been executed only once
    // with the deploiment of the smart contract
    constructor(address _authorityContractAddress) public {
        iCertificates = 0;
        authorityAddress = _authorityContractAddress;
    }

    /**
     * @dev VErify certificate.
     */
    function verifyCertificate(
        uint256 _id,
        bytes32[] _skills
    )
        payable
        public
        returns (bool)
    {
        require(msg.sender != address(0));
        require(AuthorizedAccess(authorityAddress).isAuthorized(msg.sender));
        require(_id >= 0 && _id < iCertificates);
        uint256 i = 0;

        certificates[_id].issuer = msg.sender;
        certificates[_id].recipient = owner;
        delete certificates[_id].skills;
        while (i < _skills.length) {
            if (i > 4) { continue; }
            certificates[_id].skills[i] = _skills[i];
            i += 1;
        }
        if (certificates[_id].skills.length > 0) {
            certificates[_id].verifiedSkills = true;
        }
        emit CertificateIssued(iCertificates, certificates[_id].issuer, certificates[_id].recipient, certificates[_id].skills);
        return true;
    }

    /**
     * @dev Upload existing certificate.
     */
    function uploadCertificate(
        address _issuer,
        bytes _certificateHash,
        bytes32[] _skills
    )
        payable
        public
        doPlatformFee(msg.sender)
        returns (bool)
    {
        require(_certificateHash[0] != 0);
        require(iCertificates >= 0);

        if (_issuer != address(0)) {
            certificates[iCertificates].issuer = _issuer;
        }
        certificates[iCertificates].recipient = msg.sender;
        certificates[iCertificates].certificateHash = _certificateHash;
        if (!certificates[iCertificates].verifiedSkills) {
            if (certificates[iCertificates].skills.length > 0) { delete certificates[iCertificates].skills; }
            uint256 i = 0;
            while (i < _skills.length) {
                if (i > 4) { continue; }
                certificates[iCertificates].skills[i] = _skills[i];
                i += 1;
            }
        }
        emit CertificateUploaded(iCertificates, certificates[iCertificates].issuer, certificates[iCertificates].recipient, certificates[iCertificates].skills, certificates[iCertificates].certificateHash);
        iCertificates ++;
        return true;
    }
}
