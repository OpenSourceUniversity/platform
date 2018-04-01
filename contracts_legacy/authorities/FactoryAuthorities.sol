pragma solidity ^0.4.15;

import "./MegaFactoryAuthorities.sol";
import "./AuthorityStorage.sol";
import "./mainAuthorities.sol";


contract AuthorityProxy {
    mapping (uint => address[]) public authoritiesStorageAddresses;

    function isAuthorityStorageExist(uint _lastDigits) public constant returns (bool);
    function getAuthorityStorageAddress(uint _lastDigits, uint _index) public constant returns (address);
    function getAuthorityStorageCounter(uint _lastDigits) public constant returns (uint);
    function setAuthorityStorageAddress(uint _lastDigits, address _newAuthorityStorageAddress) public returns (uint);
    function getUserAddress() public constant returns (address);
}


contract FactoryAuthorities {
    event AuthorityStorageCreated(address authorityStorage, uint now_time);

    // Ownership
    address osu;
    address owner;

    // Mega factory
    address megaFactoryAddress;

    // AuthoritiesProxy
    address authorityProxyAddress;

    // Storage limitations
    uint maxNrOfRecordsInStorage;
    uint public iFactory;

    struct AuthoritiesStoragesStruct {
        address storageAddress;
        uint storageLimitation;
    }

    /* AuthoritiesStoragesStruct [] public authoritiesStorages; */

    mapping (uint => AuthoritiesStoragesStruct[]) public newAuthoritiesStorageMapping;

    // Constructor
    function FactoryAuthorities(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
        maxNrOfRecordsInStorage = 10000;
    }

    // =========================== About AuthoritiesStorage =======================================
    // Create storage for authorityStorage of specific 4 digit cluster
    function createAuthoritiesStorage() public returns (address) {
        require(tx.origin == owner || tx.origin == osu);
        AuthorityStorage newAuthoritiesStorage = new AuthorityStorage(owner, osu);
        return newAuthoritiesStorage;
    }

    function storeAuthoritiesStorage(uint _lastDigits, address _newAuthoritiesStorage) public returns (uint) {
        require(tx.origin == owner || tx.origin == osu);
        newAuthoritiesStorageMapping[_lastDigits].length++;
        newAuthoritiesStorageMapping[_lastDigits][newAuthoritiesStorageMapping[_lastDigits].length-1].storageAddress = address(_newAuthoritiesStorage);
        newAuthoritiesStorageMapping[_lastDigits][newAuthoritiesStorageMapping[_lastDigits].length-1].storageLimitation = maxNrOfRecordsInStorage;
        setAuthoritiesStorageAddress(_lastDigits, _newAuthoritiesStorage);
        AuthorityStorageCreated(_newAuthoritiesStorage, now);
        return (newAuthoritiesStorageMapping[_lastDigits].length-1);
    }

    function setAuthoritiesStorageAddress(uint _lastDigits, address _newAuthoritiesStorage) internal returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        AuthorityProxy authorityProxy = AuthorityProxy(authorityProxyAddress);
        authorityProxy.setAuthorityStorageAddress(_lastDigits, _newAuthoritiesStorage);
        return true;
    }

    function getAuthoritiesStoragesCount(uint _lastDigits) public constant returns (uint) {
        if (newAuthoritiesStorageMapping[_lastDigits].length > 0) {
            return newAuthoritiesStorageMapping[_lastDigits].length;
        } else {
            return 0;
        }
    }

    function getAuthoritiesStorageAddress(uint _lastDigits, uint _index) public constant returns (address) {
        if (newAuthoritiesStorageMapping[_lastDigits].length > _index && newAuthoritiesStorageMapping[_lastDigits].length > 0) {
            return newAuthoritiesStorageMapping[_lastDigits][_index].storageAddress;
        }
        return address(0);
    }

    function getAuthoritiesStorageLimit(uint _lastDigits, uint _index) public constant returns (uint) {
        if (newAuthoritiesStorageMapping[_lastDigits].length > _index && newAuthoritiesStorageMapping[_lastDigits].length > 0) {
            return newAuthoritiesStorageMapping[_lastDigits][_index].storageLimitation;
        }
        return 0;
    }


    // revert if AuthoritiesStorage deployment is un-successful
    function revertAuthoritiesStorage(uint _lastDigits, address _addressAuthoritiesStorage) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        if (newAuthoritiesStorageMapping[_lastDigits].length > 0) {
            uint[] memory i = new uint[](1);
            for (i[0] = 0; i[0] < newAuthoritiesStorageMapping[_lastDigits].length; i[0]++) {
                if (newAuthoritiesStorageMapping[_lastDigits][i[0]].storageAddress == _addressAuthoritiesStorage) {
                    newAuthoritiesStorageMapping[_lastDigits][i[0]].storageAddress = newAuthoritiesStorageMapping[_lastDigits][newAuthoritiesStorageMapping[_lastDigits].length-1].storageAddress;
                    newAuthoritiesStorageMapping[_lastDigits][i[0]].storageLimitation = newAuthoritiesStorageMapping[_lastDigits][newAuthoritiesStorageMapping[_lastDigits].length-1].storageLimitation;
                    delete newAuthoritiesStorageMapping[_lastDigits][newAuthoritiesStorageMapping[_lastDigits].length-1];
                    return true;
                }
            }
        }
        return false;
    }


    // get data for specific storage
    function getAuthoritiesStorage(uint _lastDigits, uint _index) public constant returns (address, uint) {
        if (_index >= newAuthoritiesStorageMapping[_lastDigits].length) {
            return (address(0), 0);
        } else {
            return (newAuthoritiesStorageMapping[_lastDigits][_index].storageAddress, newAuthoritiesStorageMapping[_lastDigits][_index].storageLimitation);
        }
    }

    // sets the limit of the future CertificateStorage contracts which will be created
    function setStorageLimit(uint _value) public returns (uint) {
        require(tx.origin == owner || tx.origin == osu);
        maxNrOfRecordsInStorage = _value;
        return maxNrOfRecordsInStorage;
    }


    // =========================== MegaFactoryAuthorities =======================================
    // set MegaFactoryAuthorities address
    function setMegaFactoryAuthoritiesAddress(address _megaFactoryAddress) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        megaFactoryAddress = _megaFactoryAddress;
        return true;
    }

    // get MegaFactoryAuthorities address
    function getMegaFactoryAuthoritiesAddress() public constant returns (address) {
        return megaFactoryAddress;
    }

    // =========================== AuthoritiesProxy =======================================
    // set AuthoritiesProxy address
    function setAuthoritiesProxyAddress(address _authorityProxyAddress) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        authorityProxyAddress = _authorityProxyAddress;
        return true;
    }

    // get AuthoritiesProxy address
    function getAuthoritiesProxyAddress() public constant returns (address) {
        return authorityProxyAddress;
    }


}
