pragma solidity ^0.4.24;

import "../ownership/Ownable.sol";
import "../userFeesAndAuth/feeAndAuth.sol";

/**
 * @title Basic Certificate
 * @dev This basic contract allows to issue certificates along with
 *      skills gained in the certification process.
 */
contract BasicCertificate is Ownable, feeAndAuth {
    event CertificateVerified(uint256 id, address issuer, address recipient, bytes32[] skillsVerified);
    event CertificateUploaded(uint256 id, address issuer, address recipient, bytes32[] skills, bytes certificateHash);
    event InitiateBasicCertificate(address ownerAddr, address AuthorityAddr, address TokenSettingsAddr);
    event CertificateRevoked(uint256 id);
    event CertificateTransfered(address from, address to, uint256 id);

    struct CertificateBody {
        address issuer;
        address recipient;
        bytes certificateHash;
        bytes32[] skills;
        bool verifiedSkills;
    }

    // Courses will be stored sequentially
    mapping (uint256 => CertificateBody) certificates;
    address public authorityAddress;
    address public tokenSettingsAddress;
    address public tokenAddress;

    // global counter
    uint256 public iCertificates;



    constructor(
        address _authorityContractAddress,
        address _tokenSettingsAddress
    )
        public
    {
        iCertificates = 0;
        setAutContract(_authorityContractAddress);
        setSettingsContract(_tokenSettingsAddress);

        emit InitiateBasicCertificate(msg.sender, authorityAddress, tokenSettingsAddress);
    }

    /**
     * @dev Verify certificate.
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
        require(authContract.isAuthorized(msg.sender));
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
        emit CertificateVerified(iCertificates, certificates[_id].issuer, certificates[_id].recipient, certificates[_id].skills);
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
        onlyOwner
        returns (bool)
    {
        require(_certificateHash[0] != 0);
        require(iCertificates >= 0);

        if (_issuer != address(0)) {
            certificates[iCertificates].issuer = _issuer;
        }
        certificates[iCertificates].recipient = msg.sender;
        certificates[iCertificates].certificateHash = _certificateHash;
        certificates[iCertificates].skills = _skills;
        emit CertificateUploaded(iCertificates, certificates[iCertificates].issuer, certificates[iCertificates].recipient, certificates[iCertificates].skills, certificates[iCertificates].certificateHash);
        iCertificates ++;
        return true;
    }


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



    function changeControllingAddresses(
        address _authorityContractAddress,
        address _tokenSettingsAddress
    )
        public
    {
        require(authContract.isManager(msg.sender));
        setAutContract(_authorityContractAddress);
        setSettingsContract(_tokenSettingsAddress);

        emit InitiateBasicCertificate(msg.sender, authorityAddress, tokenSettingsAddress);
    }

    function setAutContract(address _authorityContractAddress) internal {
        authorityAddress = _authorityContractAddress;
        authContract = new AuthorizedAccess();
        authContract = AuthorizedAccess(authorityAddress);
    }

    function setSettingsContract(address _tokenSettingsAddress) internal {
        tokenSettingsAddress = _tokenSettingsAddress;
        tokenCirculation = new EDUcirculation();
        tokenCirculation = EDUcirculation(tokenSettingsAddress);
        tokenSettings = new TokenSettings();
        tokenSettings = TokenSettings(tokenSettingsAddress);
        setERC20();
    }

    function setERC20() internal {
        tokenAddress = address(tokenSettings.tokenContractAddress());
        ercStandard = new ERC20();
        ercStandard = ERC20(tokenAddress);
    }


}
