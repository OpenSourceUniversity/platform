pragma solidity ^0.4.15;


contract AuthoritiesStorage {
    address owner;
    address osu;

    AuthorityStruct[] public authorityStruct;

    struct AuthorityStruct {
        address addrVerifier;
        address addrContract;
        bytes32[2] title;
        bool rightToVerifyBusiness;                 // OSUni verify if this authority is able to verify businesses in the current country
        bool rightToVerifyAcademia;                 // OSUni verify if this authority is able to verify academia in the current country
        bool isActive;                              // If the authority is active or not operational
    }

    // bytes32 -> country
    // AuthorityStruct contains all the information needed for an
    mapping (bytes32 => AuthorityStruct[]) public authorityMapping;
    mapping (address => bytes32) countryMapping;

    // Ownership of the contract
    modifier ownerORosu {
        if (msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

    // Constructor
    function AuthoritiesStorage(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
    }


    function addAuthority(
        bytes32 _country,
        bytes32[2] _title
    )
        public
        returns (bool)
    {
        uint[] memory j = new uint[](1);
        j[0] = 0;
        for (j[0] = 0; j[0] < authorityMapping[_country].length; j[0]++) {
            if (authorityMapping[_country][j[0]].addrVerifier == tx.origin) {
                return false;
            }
        }

        authorityMapping[_country].length++;
        authorityMapping[_country][authorityMapping[_country].length-1].addrVerifier = tx.origin;
        authorityMapping[_country][authorityMapping[_country].length-1].title = _title;
        authorityMapping[_country][authorityMapping[_country].length-1].isActive = true;
        countryMapping[tx.origin] = _country;
        return true;
    }


    function updateAuthority(
        bytes32 _countryOLD,
        bytes32 _country,
        address _addrContract,
        bytes32[2] _title
    )
        public
        returns (bool)
    {
        uint[] memory j = new uint[](1);
        j[0] = 0;
        require(authorityMapping[_countryOLD].length > 0);
        for (j[0] = 0; j[0] < authorityMapping[_country].length; j[0]++) {
            if (authorityMapping[_country][j[0]].addrVerifier == tx.origin) {
                authorityMapping[_country][j[0]].addrContract = _addrContract;
                authorityMapping[_country][j[0]].title = _title;
                countryMapping[tx.origin] = _country;
                return true;
            }
        }
        authorityMapping[_country].length++;
        authorityMapping[_country][authorityMapping[_country].length-1].addrContract = _addrContract;
        authorityMapping[_country][authorityMapping[_country].length-1].title = _title;
        countryMapping[tx.origin] = _country;
        return true;
    }



    function deleteAuthority(
        bytes32 _country
    )
        public
        returns (bool)
    {
        require(authorityMapping[_countryOLD].length > 0);
        if (_index >= certificateStruct.length && certificateStruct.length > 0) {
            if (certificateStruct.length > 50)
                _index = certificateStruct.length / 2;
            else
                _index = 0;
        }
        if (certificateStruct[_index].academy == _academyOLD && certificateStruct[_index].course == _courseOLD && certificateStruct[_index].learner == _learnerOLD && certificateStruct[_index].name[1] == _nameOLD[1]) {
            return remove(_index);
        } else {

            for (uint i = 0; i <= _index; i++) {
                if (certificateStruct[i].academy == _academyOLD && certificateStruct[i].course == _courseOLD && certificateStruct[i].learner == _learnerOLD && certificateStruct[i].name[1] == _nameOLD[1]) {
                    return remove(i);
                }
            }
        }
        return false;
    }

    // remove specific record from the array of certificates
    function remove(uint index) internal returns(bool) {
        if (index >= certificateStruct.length) return false;
        certificateStruct[index] = certificateStruct[certificateStruct.length-1];
        delete certificateStruct[certificateStruct.length-1];
        certificateStruct.length--;
        CertificateDeleted(true);
        return true;
    }

}
