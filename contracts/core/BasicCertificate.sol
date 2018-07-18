pragma solidity ^0.4.24;

import "../ownership/Ownable.sol";
import "../abstracts/EDUcirculationAbstract.sol";
import "../abstracts/TokenSettingsAbstract.sol";
import "../abstracts/AuthorizedAccessAbstract.sol";
import "../abstracts/tokenStandards/ERC20.sol";

/**
 * @title Basic Certificate
 * @dev This basic contract allows to issue certificates along with
 *      skills gained in the certification process.
 */
contract BasicCertificate is Ownable {
    event CertificateIssued(uint256 id, address issuer, address recipient, bytes32[] skillsVerified);
    event CertificateUploaded(uint256 id, address issuer, address recipient, bytes32[] skills, bytes certificateHash);
    event InitiateControllingAddresses(address AuthorityAddr, address TokenSettingsAddr, address EDUCurculationAddr);

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
    address public tokenSettingsAddress;
    address public eduCirculationAddress;
    address public tokenAddress;

    // global counter
    uint256 public iCertificates;
    uint256 public feeEDU;
    uint256 public feeETH;

    modifier doFee {
        (feeEDU, feeETH) = EDUcirculation(eduCirculationAddress).getFee(msg.sender);
        require(msg.value >= feeETH);
        tokenAddress = TokenSettings(tokenSettingsAddress).tokenContractAddress();
        require(ERC20(tokenAddress).balanceOf(msg.sender) >= feeEDU);
        EDUcirculation(eduCirculationAddress).getWalletFees().transfer(feeETH);
        ERC20(tokenAddress).transfer(EDUcirculation(eduCirculationAddress).getWalletFees(), feeEDU);
        _;
    }

    // Constructor of the smart contract which has been executed only once
    // with the deploiment of the smart contract
    constructor(address _authorityContractAddress, address _tokenSettingsAddress, address _eduCirculationAddress) public {
        iCertificates = 0;
        authorityAddress = _authorityContractAddress;
        tokenSettingsAddress = _tokenSettingsAddress;
        eduCirculationAddress = _eduCirculationAddress;
        emit InitiateControllingAddresses(authorityAddress, tokenSettingsAddress, eduCirculationAddress);
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
        doFee
        public
        returns (bool)
    {
        require(_certificateHash[0] != 0);
        require(iCertificates >= 0);
        /* // Platform fee
        (feeEDU, feeETH) = EDUcirculation(eduCirculationAddress).getFee(msg.sender);
        require(msg.value >= feeETH);
        tokenAddress = TokenSettings(tokenSettingsAddress).tokenContractAddress();
        require(ERC20(tokenAddress).balanceOf(msg.sender) >= feeEDU);
        EDUcirculation(eduCirculationAddress).getWalletFees().transfer(feeETH);
        ERC20(tokenAddress).transfer(EDUcirculation(eduCirculationAddress).getWalletFees(), feeEDU); */

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

    function changeControlingAddresses(
        address _authorityContractAddress,
        address _tokenSettingsAddress,
        address _eduCirculationAddress
    )
        onlyOwner
        public
    {
        authorityAddress = _authorityContractAddress;
        tokenSettingsAddress = _tokenSettingsAddress;
        eduCirculationAddress = _eduCirculationAddress;
        emit InitiateControllingAddresses(authorityAddress, tokenSettingsAddress, eduCirculationAddress);
    }


}
