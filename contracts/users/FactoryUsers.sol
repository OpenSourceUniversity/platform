pragma solidity ^0.4.15;

/*import "./MegaFactoryCertificate.sol";
import "./CertificateStorage.sol";*/

import "./MegaFactoryUsers.sol";
import "./UsersStorage.sol";
import "./User.sol";

contract UsersProxy {
    mapping (uint => address[]) public userStorageAddresses;
    function isUsersStorageExist(uint _lastDigits) public constant returns (bool);
    function getUsersStorageAddress(uint _lastDigits, uint _index) public constant returns (address);
    function getUsersStorageCounter(uint _lastDigits) public constant returns (uint);
    function setUsersStorageAddress(uint _lastDigits, address _newUsersStorageAddress) public returns (uint);
    function getUserAddress() public constant returns (address);
}

contract FactoryUsers {
    event UsersStorageCreated(address usersStorage, uint now_time);
    event UserContractCreated(address userContract, uint now_time);

    // Ownership
    address osu;
    address owner;

    // Mega factory
    address megaFactoryAddress;

    // UsersProxy
    address usersProxyAddress;

    // Storage limitations
    uint maxNrOfRecordsInStorage;
    uint public iFactory;

    struct UsersStoragesStruct {
        address storageAddress;
        uint storageLimitation;
    }

    UsersStoragesStruct [] public usersStorages;

    mapping (uint => address[]) public newUsersStorageTEMP;

    modifier OwnerOrOSUniversity {
        if(msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

    // Constructor
    function FactoryUsers(address _osu) public {
        owner = msg.sender;
        osu = _osu;
        maxNrOfRecordsInStorage = 10000;
    }

    // =========================== About UsersStorage =======================================
    // Create storage for users of specific 4 digit cluster
    function createUsersStorage(uint _lastDigits) public returns (address) {
        require(tx.origin == owner || tx.origin == osu);
        UsersStorage newUsersStorage = new UsersStorage(owner, osu);
        usersStorages.length++;
        usersStorages[usersStorages.length-1].storageAddress = address(newUsersStorage);
        usersStorages[usersStorages.length-1].storageLimitation = maxNrOfRecordsInStorage;
        newUsersStorageTEMP[_lastDigits].push(newUsersStorage);
        UsersStorageCreated(newUsersStorage, now);
        return newUsersStorage;
    }

    function setUsersStorageAddress(uint _lastDigits, address _newUsersStorage) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        UsersProxy usersProxy = UsersProxy(usersProxyAddress);
        usersProxy.setUsersStorageAddress(_lastDigits, _newUsersStorage);
        return true;
    }

    function getProcessingUsersStoragesCount(uint _lastDigits) public constant returns (uint) {
        require(tx.origin == owner || tx.origin == osu);
        return newUsersStorageTEMP[_lastDigits].length;
    }

    function getProcessingUsersStorageAddress(uint _lastDigits, uint _index) public constant returns (address) {
        require(tx.origin == owner || tx.origin == osu);
        if (newUsersStorageTEMP[_lastDigits].length > _index && newUsersStorageTEMP[_lastDigits].length > 0) {
            return newUsersStorageTEMP[_lastDigits][_index];
        }
        return address(0);
    }

    function removeProcessingUsersStorage(uint _lastDigits, uint _index) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        if (newUsersStorageTEMP[_lastDigits].length > _index && newUsersStorageTEMP[_lastDigits].length > 0) {
            delete newUsersStorageTEMP[_lastDigits][_index];
            return true;
        }
        return false;
    }

    // revert if UsersStorage deployment is un-successful
    function revertUsersStorage(address _addressUsersStorage) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        if (usersStorages.length > 0) {
            uint[] memory i = new uint[](1);
            for (i[0] = 0; i[0] < usersStorages.length; i[0]++) {
                if (usersStorages[i[0]].storageAddress == _addressUsersStorage) {
                    usersStorages[i[0]].storageAddress = usersStorages[usersStorages.length-1].storageAddress;
                    usersStorages[i[0]].storageLimitation = usersStorages[usersStorages.length-1].storageLimitation;
                    usersStorages.length--;
                    return true;
                }
            }
        }
        return false;
    }


    function getUsersStorageCounter() public constant returns (uint) {
        return usersStorages.length;
    }

    // get data for specific certificate
    function getUsersStorage(uint _index) public constant returns (address, uint) {
        if (_index >= usersStorages.length)
            return (address(0), 0);
        else
            return (usersStorages[_index].storageAddress, usersStorages[_index].storageLimitation);
    }

    // sets the limit of the future CertificateStorage contracts which will be created
    function setStorageLimit(uint _value) public returns (uint) {
        require(tx.origin == owner || tx.origin == osu);
        maxNrOfRecordsInStorage = _value;
        return maxNrOfRecordsInStorage;
    }

    // =========================== About User =======================================
    // Create certificate (owners of the created certificate are OSUni and deployer)
    function createUserContract() public returns (address) {
        require(megaFactoryAddress == msg.sender);
        User newUser = new User(osu);
        UserContractCreated(newUser, now);
        return address(newUser);
    }


    // =========================== MegaFactoryUsers =======================================
    // set MegaFactoryUsers address
    function setMegaFactoryUsersAddress(address _megaFactoryAddress) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        megaFactoryAddress = _megaFactoryAddress;
        return true;
    }

    // get MegaFactoryUsers address
    function getMegaFactoryUsersAddress() public constant returns (address) {
        return megaFactoryAddress;
    }

    // =========================== UsersProxy =======================================
    // set UsersProxy address
    function setUsersProxyAddress(address _usersProxyAddress) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        usersProxyAddress = _usersProxyAddress;
        return true;
    }

    // get UsersProxy address
    function getUsersProxyAddress() public constant returns (address) {
        return usersProxyAddress;
    }


}
