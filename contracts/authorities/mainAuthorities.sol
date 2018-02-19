pragma solidity ^0.4.15;

contract mainAuthorities {
    address owner;
    address osu;

    struct MainAuthoritiesStruct {
        bytes32 country;
        bytes32 title;
    }

    mapping (address => MainAuthoritiesStruct) public mainAuthorityMapping;

    function mainAuthorities(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
    }

    // Only the owner of this smart contract or OSUni can add main authorities for every single country
    function addMainAuthority(
        bytes32 _country,
        address _mainAuthority,
        bytes32 _title
    )
        public
        returns (bool)
    {
        require(owner == tx.origin || osu == tx.origin);
        if (mainAuthorityMapping[_mainAuthority].country != "")
            return false;

        mainAuthorityMapping[_mainAuthority].country = _country;
        mainAuthorityMapping[_mainAuthority].title = _title;
        return true;
    }

    function updateMainAuthority(
        bytes32 _country,
        bytes32 _title
    )
        public
        returns (bool)
    {
        if (mainAuthorityMapping[tx.origin].country != "") {
            mainAuthorityMapping[tx.origin].country = _country;
            mainAuthorityMapping[tx.origin].title = _title;
            return true;
        }
        return false;
    }


    function removeMainAuthority(address _mainAuthority) public returns (bool) {
        require(_mainAuthority == tx.origin || owner == tx.origin || osu == tx.origin);
        delete mainAuthorityMapping[_mainAuthority];
        return true;
    }
}
