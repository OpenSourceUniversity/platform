pragma solidity ^0.4.15;


contract AuthorityStorage {
    address public owner;
    address public osu;

    struct AuthorityStruct {
        address addrVerifier;
        address addrVerifierBackup;
        address contractVerifier;
        bytes32 title;
        address[] authorizedBy;
        bool rightToVerifyBusinesses;
        bool rightToverifyAcademies;
        bool isActive;
    }

    // Authorities are stored by country with possibility to search also by address of authority
    mapping (bytes32 => AuthorityStruct[]) public authorityMapping;
    mapping (address => bytes32) countryMapping;


    // Ownership of the contract
    modifier ownerOrOSU {
        if (msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

    // Constructor
    function AuthorityStorage(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
    }

    // Set record
    function setAuthority(
        address _addrVerifier,
        address _addrVerifierBackup,
        address _contractVerifier,
        address[] _authorizedBy,
        bytes32 _country,
        bytes32 _title
    )
        public
        returns (bool)
    {
        require(tx.origin == addrVerifier || osu == tx.origin || owner == tx.origin);
        if (countryMapping[_addrVerifier] != "")
            return false;

        authorityMapping[_country].length++;
        authorityMapping[_country][authorityMapping[_country].length-1].addrVerifier = _addrVerifier;
        authorityMapping[_country][authorityMapping[_country].length-1].addrVerifierBackup = _addrVerifierBackup;
        authorityMapping[_country][authorityMapping[_country].length-1].contractVerifier = _contractVerifier;
        authorityMapping[_country][authorityMapping[_country].length-1].authorizedBy = _authorizedBy;
        authorityMapping[_country][authorityMapping[_country].length-1].title = _title;
        authorityMapping[_country][authorityMapping[_country].length-1].rightToVerifyBusinesses = false;
        authorityMapping[_country][authorityMapping[_country].length-1].rightToverifyAcademies = false;
        authorityMapping[_country][authorityMapping[_country].length-1].isActive = true;
        return true;
    }




}
