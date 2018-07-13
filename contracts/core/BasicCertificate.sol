pragma solidity ^0.4.24;

import "../ownership/Ownable.sol";

/**
 * @title Basic Certificate
 * @dev This basic contract allows to issue certificates along with
 *      skills gained in the certification process.
 */
contract BasicCertificate is Ownable {
    event CertificateIssued(address issuer, address recipient, bytes32[] skillsVerified);
    event CertificateUploaded(address issuer, address recipient, bytes32[] skills, bytes certificateHash);

    struct CertificateBody {
        address issuer;
        address recipient;
        bytes certificateHash;
        bytes32[] skills;
        bool verifiedSkills;
    }

    // addresses are related to address of every course
    mapping (address => CertificateBody) certificates;

    /**
     * @dev Issues certificate.
     */
    function issueCertificate(
        address _course,
        address _recipient,
        bytes32[] _skills
    )
        payable
        public
        returns (bool)
    {
        require(msg.sender != address(0) || recipient != address(0));
        uint256 i = 0;
        certificates[_course].issuer = msg.sender;
        certificates[_course].recipient = recipient;
        delete certificates[_course].skills;
        while (i < _skills.length) {
            if (i > 4) { continue; }
            certificates[_course].skills[i] = _skills[i];
            i += 1;
        }
        if (certificates[_course].skills.length > 0) {
            certificates[_course].verifiedSkills = true;
        }
        emit CertificateIssued(certificates[_course].issuer, certificates[_course].recipient, certificates[_course].skills);
        return true;
    }

    /**
     * @dev Upload existing certificate.
     */
    function uploadCertificate(
        address _course,
        address _issuer,
        bytes _certificateHash,
        bytes32[] _skills
    )
        payable
        public
        returns (bool)
    {
        require(_certificateHash);
        require(_course != address(0));

        if (_issuer != address(0)) {
            certificates[_course].issuer = _issuer;
        }
        certificates[_course].recipient = msg.sender;
        certificates[_course].certificateHash = _certificateHash;
        if (!certificates[_course].verifiedSkills) {
            if (certificates[_course].skills.length > 0) { delete certificates[_course].skills; }
            uint256 i = 0;
            while (i < _skills.length) {
                if (i > 4) { continue; }
                certificates[_course].skills[i] = _skills[i];
                i += 1;
            }
        }
        emit CertificateUploaded(certificates[_course].issuer, certificates[_course].recipient, certificates[_course].skills, certificates[_course].certificateHash);
        return true;
    }
}
