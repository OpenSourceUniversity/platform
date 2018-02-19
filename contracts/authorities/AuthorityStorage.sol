pragma solidity ^0.4.15;


contract AuthorityStorage {
    address owner;
    address osu;

    // temp data
    address tempAddress;
    bytes32 tempCountry;
    uint tempCount;

    struct AuthorityStruct {
        address addrVerifier;
        address addrVerifierBackup;
        bytes32 title;
        bytes32[] data;
        address[] authorizedForBusinessVerifier;
        address[] authorizedForAcademyVerifier;
        bool isActive;
    }

    struct ReverseAuthorityStruct {
        bytes32 country;
        bool rightToVerifyBusinesses;
        bool rightToVerifyAcademies;
        bool isActive;
    }

    // Authorities are stored by country with possibility to search also by address of authority
    mapping (bytes32 => AuthorityStruct[]) authorityMapping;
    mapping (address => ReverseAuthorityStruct) countryMapping;
    // First address is the addrVerifierBackup
    // Socend address is the primary address
    mapping (address => address) addressBackupRelation;


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
    function addAuthority(
        bytes32 _country,
        address _addrVerifier,
        address _addrVerifierBackup,
        bytes32 _title,
        bytes32[] _data
    )
        public
        returns (bool)
    {
        require(tx.origin == _addrVerifier || osu == tx.origin || owner == tx.origin);
        if (countryMapping[_addrVerifier].country != "")
            return false;

        authorityMapping[_country].length++;
        authorityMapping[_country][authorityMapping[_country].length-1].addrVerifier = _addrVerifier;
        authorityMapping[_country][authorityMapping[_country].length-1].addrVerifierBackup = _addrVerifierBackup;
        authorityMapping[_country][authorityMapping[_country].length-1].title = _title;
        authorityMapping[_country][authorityMapping[_country].length-1].data = _data;
        authorityMapping[_country][authorityMapping[_country].length-1].isActive = true;
        countryMapping[_addrVerifier].country = _country;
        countryMapping[_addrVerifier].isActive = true;
        countryMapping[_addrVerifier].rightToVerifyBusinesses = false;
        countryMapping[_addrVerifier].rightToVerifyAcademies = false;
        addressBackupRelation[_addrVerifierBackup] = _addrVerifier;
        return true;
    }


    // if you don't want to change the country _countryOLD and _country will be the same
    function updateAuthority(
        bytes32 _countryOLD,
        bytes32 _country,
        address _addrVerifier,
        address _addrVerifierBackup,
        bytes32 _title
    )
        public
        returns (bool)
    {
        require(tx.origin == _addrVerifier || osu == tx.origin || owner == tx.origin);
        require(countryMapping[_addrVerifier].country == _countryOLD);
        uint[] memory j = new uint[](1);
        j[0] = 0;
        for (j[0] = 0; j[0] < authorityMapping[_country].length; j[0]++) {
            if (authorityMapping[_country][j[0]].addrVerifier == _addrVerifier) {
                authorityMapping[_country][j[0]].addrVerifierBackup = _addrVerifierBackup;
                authorityMapping[_country][j[0]].title = _title;
                countryMapping[_addrVerifier].country = _country;
                addressBackupRelation[_addrVerifierBackup] = _addrVerifier;
                removePreviousRecord(_countryOLD, _addrVerifier);
                return true;
            }
        }
        authorityMapping[_country].length++;
        authorityMapping[_country][authorityMapping[_country].length-1].addrVerifier = _addrVerifier;
        authorityMapping[_country][authorityMapping[_country].length-1].addrVerifierBackup = _addrVerifierBackup;
        authorityMapping[_country][authorityMapping[_country].length-1].title = _title;
        countryMapping[_addrVerifier].country = _country;
        addressBackupRelation[_addrVerifierBackup] = _addrVerifier;
        removePreviousRecord(_countryOLD, _addrVerifier);
        return true;
    }

    function removePreviousRecord(bytes32 _country, address _addrVerifier) internal returns (bool) {
        uint[] memory i = new uint[](1);
        i[0] = 0;
        for (i[0] = 0; i[0] < authorityMapping[_country].length; i[0]++) {
            if (authorityMapping[_country][i[0]].addrVerifier == _addrVerifier) {
                delete authorityMapping[_country][i[0]];
                return true;
            }
        }
    }


    function updateTitle(bytes32 _title) public returns (bool) {
        tempCountry = countryMapping[tx.origin].country;
        if (tempCountry != "") {
            require(countryMapping[tx.origin].isActive);
            uint[] memory i = new uint[](1);
            i[0] = 0;
            for (i[0] = 0; i[0] < authorityMapping[tempCountry].length; i[0]++) {
                if (authorityMapping[tempCountry][i[0]].addrVerifier == tx.origin) {
                    authorityMapping[tempCountry][i[0]].title = _title;
                    return true;
                }
            }
        }
    }

    function addBusinessAuthorizer(address _addrVerifier) public returns (bool) {
        require(countryMapping[tx.origin].isActive == true && tx.origin != _addrVerifier && countryMapping[_addrVerifier].isActive == true);
        tempCountry = countryMapping[_addrVerifier].country;
        if (tempCountry != "") {
            uint[] memory i = new uint[](1);
            i[0] = 0;
            for (i[0] = 0; i[0] < authorityMapping[tempCountry].length; i[0]++) {
                if (authorityMapping[tempCountry][i[0]].addrVerifier == _addrVerifier) {
                    authorityMapping[tempCountry][i[0]].authorizedForBusinessVerifier.length++;
                    authorityMapping[tempCountry][i[0]].authorizedForBusinessVerifier[authorityMapping[tempCountry][i[0]].authorizedForBusinessVerifier.length-1] = tx.origin;
                    countryMapping[_addrVerifier].rightToVerifyBusinesses = true;
                    return true;
                }
            }
        }
    }

    function removeBusinessAuthorizer(address _addrVerifier) public returns (bool) {
        require(countryMapping[tx.origin].isActive == true && tx.origin != _addrVerifier && countryMapping[_addrVerifier].isActive == true);
        tempCountry = countryMapping[_addrVerifier].country;
        if (tempCountry != "") {
            uint[] memory i = new uint[](1);
            i[0] = 0;
            uint[] memory j = new uint[](1);
            j[0] = 0;
            for (i[0] = 0; i[0] < authorityMapping[tempCountry].length; i[0]++) {
                if (authorityMapping[tempCountry][i[0]].addrVerifier == _addrVerifier) {
                    tempCount = authorityMapping[tempCountry][i[0]].authorizedForBusinessVerifier.length;
                    for (j[0] = 0; j[0] < tempCount; j[0]++) {
                        if (authorityMapping[tempCountry][i[0]].authorizedForBusinessVerifier[j[0]] == tx.origin) {

                            authorityMapping[tempCountry][i[0]].authorizedForBusinessVerifier[j[0]] = authorityMapping[tempCountry][i[0]].authorizedForBusinessVerifier[tempCount-1];
                            delete authorityMapping[tempCountry][i[0]].authorizedForBusinessVerifier[tempCount-1];
                            authorityMapping[tempCountry][i[0]].authorizedForBusinessVerifier.length--;
                            if (authorityMapping[tempCountry][i[0]].authorizedForBusinessVerifier.length > 0) {
                                countryMapping[tx.origin].rightToVerifyBusinesses = true;
                            } else {
                                countryMapping[tx.origin].rightToVerifyBusinesses = false;
                            }
                            return true;
                        }
                    }
                }
            }
        }
    }


    function addAcademyAuthorizer(address _addrVerifier) public returns (bool) {
        require(countryMapping[tx.origin].isActive == true && tx.origin != _addrVerifier && countryMapping[_addrVerifier].isActive == true);
        tempCountry = countryMapping[_addrVerifier].country;
        if (tempCountry != "") {
            uint[] memory i = new uint[](1);
            i[0] = 0;
            for (i[0] = 0; i[0] < authorityMapping[tempCountry].length; i[0]++) {
                if (authorityMapping[tempCountry][i[0]].addrVerifier == _addrVerifier) {
                    authorityMapping[tempCountry][i[0]].authorizedForAcademyVerifier.length++;
                    tempCount = authorityMapping[tempCountry][i[0]].authorizedForAcademyVerifier.length;
                    authorityMapping[tempCountry][i[0]].authorizedForAcademyVerifier[tempCount] = tx.origin;
                    countryMapping[_addrVerifier].rightToVerifyBusinesses = true;
                    return true;
                }
            }
        }
    }

    function removeAcademyAuthorizer(address _addrVerifier) public returns (bool) {
        require(countryMapping[tx.origin].isActive == true && tx.origin != _addrVerifier && countryMapping[_addrVerifier].isActive == true);
        tempCountry = countryMapping[_addrVerifier].country;
        if (tempCountry != "") {
            uint[] memory i = new uint[](1);
            i[0] = 0;
            uint[] memory j = new uint[](1);
            j[0] = 0;
            for (i[0] = 0; i[0] < authorityMapping[tempCountry].length; i[0]++) {
                if (authorityMapping[tempCountry][i[0]].addrVerifier == _addrVerifier) {
                    tempCount = authorityMapping[tempCountry][i[0]].authorizedForAcademyVerifier.length;
                    for (j[0] = 0; j[0] < tempCount; j[0]++) {
                        if (authorityMapping[tempCountry][i[0]].authorizedForAcademyVerifier[j[0]] == tx.origin) {

                            authorityMapping[tempCountry][i[0]].authorizedForAcademyVerifier[j[0]] = authorityMapping[tempCountry][i[0]].authorizedForAcademyVerifier[tempCount-1];
                            delete authorityMapping[tempCountry][i[0]].authorizedForAcademyVerifier[tempCount-1];
                            authorityMapping[tempCountry][i[0]].authorizedForAcademyVerifier.length--;
                            if (authorityMapping[tempCountry][i[0]].authorizedForAcademyVerifier.length > 0) {
                                countryMapping[tx.origin].rightToVerifyAcademies = true;
                            } else {
                                countryMapping[tx.origin].rightToVerifyAcademies = false;
                            }
                            return true;
                        }
                    }
                }
            }
        }
    }

    // Activate or deactivate the authorities (if authority is deactivated it will be not possible to do anything with it)
    function setActive(bool _val) public returns (bool) {
        return activationFunction(tx.origin, _val);
    }

    function seActiveByOSU(address _addrVerifier, bool _val) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        return activationFunction(_addrVerifier, _val);
    }

    function activationFunction(address _addrVerifier, bool _val) internal returns (bool) {
        tempCountry = countryMapping[_addrVerifier].country;
        if (tempCountry != "") {
            uint[] memory i = new uint[](1);
            i[0] = 0;
            for (i[0] = 0; i[0] < authorityMapping[tempCountry].length; i[0]++) {
                if (authorityMapping[tempCountry][i[0]].addrVerifier == _addrVerifier) {
                    authorityMapping[tempCountry][i[0]].isActive = _val;
                    countryMapping[_addrVerifier].isActive = _val;
                    return true;
                }
            }
        }
    }

    function recoverMainAddress(address _addrVerifier) public returns (bool) {
        require(addressBackupRelation[tx.origin] != address(0));
        tempAddress = addressBackupRelation[tx.origin];
        tempCountry = countryMapping[tempAddress].country;
        require(countryMapping[tempAddress].isActive);
        uint[] memory i = new uint[](1);
        i[0] = 0;
        for (i[0] = 0; i[0] < authorityMapping[tempCountry].length; i[0]++) {
            if (authorityMapping[tempCountry][i[0]].addrVerifierBackup == tx.origin) {
                authorityMapping[tempCountry][i[0]].addrVerifier = _addrVerifier;
                addressBackupRelation[tx.origin] = _addrVerifier;
                countryMapping[_addrVerifier].country = countryMapping[tempAddress].country;
                countryMapping[_addrVerifier].rightToVerifyBusinesses = countryMapping[tempAddress].rightToVerifyBusinesses;
                countryMapping[_addrVerifier].rightToVerifyAcademies = countryMapping[tempAddress].rightToVerifyAcademies;
                countryMapping[_addrVerifier].isActive = countryMapping[tempAddress].isActive;
                delete countryMapping[tempAddress];
                return true;
            }
        }
    }

    // can be used by the main address for specific verifier
    function deleteAuthorityItself(address _addrVerifier) public returns (bool) {
        if (countryMapping[_addrVerifier].isActive == true) {
            tempCountry = countryMapping[_addrVerifier].country;
            require(countryMapping[_addrVerifier].isActive);
            uint[] memory i = new uint[](1);
            i[0] = 0;
            for (i[0] = 0; i[0] < authorityMapping[tempCountry].length; i[0]++) {
                if (authorityMapping[tempCountry][i[0]].addrVerifier == _addrVerifier) {
                    address tempAddr = authorityMapping[tempCountry][i[0]].addrVerifierBackup;
                    delete authorityMapping[tempCountry][i[0]];
                    delete countryMapping[_addrVerifier];
                    delete addressBackupRelation[tempAddr];
                    return true;
                }
            }
        }
    }



}
