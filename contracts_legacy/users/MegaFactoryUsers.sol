pragma solidity ^0.4.15;

import "./FactoryUsers.sol";

contract FactoryUsersInterface {
  event UsersStorageCreated(address usersStorage, uint now_time);
  address megaFactoryAddress;
  address usersProxyAddress;
  uint maxNrOfRecordsInStorage;
  uint public iFactory;

  struct UsersStoragesStruct {
      address storageAddress;
      uint storageLimitation;
  }

  UsersStoragesStruct [] public usersStorages;
  function createUsersStorage(uint _lastDigits) public returns (address);
  function setUsersStorageAddress(uint _lastDigits, address _newUsersStorage) public returns (bool);
  function getProcessingUsersStoragesCount(uint _lastDigits) public returns (uint);
  function getProcessingUsersStorageAddress(uint _lastDigits, uint _index) public constant returns (address);
  function removeProcessingUsersStorage(uint _lastDigits, uint _index) public returns (bool);
  function revertUsersStorage(uint _lastDigits) public returns (bool);
  function getUsersStorageCounter() public constant returns (uint);
  function getUsersStorage(uint _index) public constant returns (address, uint);
  function setStorageLimit(uint _value) public returns (uint);
  function createUserContract() public returns (bool);
  function setMegaFactoryUsersAddress(address _megaFactoryAddress) public returns (bool);
  function getMegaFactoryUsersAddress() public returns (address);
  function setUsersProxyAddress(address _UsersProxyAddress) public returns (bool);
  function getUsersProxyAddress() public returns (address);
}


contract MegaFactoryUsers {
    address owner;
    address osu;

    address factoryAddress;
    address proxyAddress;

    FactoryUsersInterface public factory;

    // Ownership of the contract
    modifier OwnerOrOSUniversity {
        if(msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

      function MegaFactoryUsers(address _owner, address _osu) public {
          owner = _owner;
          osu = _osu;
      }

      // ====================================== UsersStorage ===================================
      // for now UsersStorage can be created by the owner
      function createUsersStorageByInterface(uint _lastDigits) public returns(address) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          factory = FactoryUsersInterface(factoryAddress);
          address tempAddr = factory.createUsersStorage(_lastDigits);
          return tempAddr;
      }

      // set already created successfully UsersStorage into the UsersProxy for particular 4 digit cluster
      function setUsersStorageAddress(uint _lastDigits, address _newUsersStorage) public returns(bool) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          return factory.setUsersStorageAddress(_lastDigits, _newUsersStorage);
      }

      // revert if UsersStorage deployment is un-successful
      function revertUsersStorage(uint _lastDigits) public returns(bool) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          return factory.revertUsersStorage(_lastDigits);
      }

      // sets the limit of the future CertificateStorage contracts which will be created
      function setStorageLimit(uint _value) public returns (uint) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          return factory.setStorageLimit(_value);
      }


      // =========================================== User =====================================
      function createUserContractByInterface() public returns (bool) {
          factory = FactoryUsersInterface(factoryAddress);
          bool temp = factory.createUserContract();
          return temp;
      }


      // ================================== Set prelimnary values =============================
      function setFactoryAddress(address _factoryAddress) public OwnerOrOSUniversity returns(address) {
          factoryAddress = _factoryAddress;
          factory = FactoryUsersInterface(factoryAddress);
          return factoryAddress;
      }


}
