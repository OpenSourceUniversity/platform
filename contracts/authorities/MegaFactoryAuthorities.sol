pragma solidity ^0.4.15;

import "./FactoryAuthorities.sol";


contract FactoryAuthoritiesInterface {
  event AuthorityStorageCreated(address authorityStorage, uint now_time);
  uint public iFactory;

  struct AuthoritiesStoragesStruct {
      address storageAddress;
      uint storageLimitation;
  }

  mapping (uint => AuthoritiesStoragesStruct[]) public newAuthoritiesStorageMapping;

  function createAuthoritiesStorage() public returns (address);
  function storeAuthoritiesStorage(uint _lastDigits, address _newAuthoritiesStorage) public returns (uint);
  function setAuthoritiesStorageAddress(uint _lastDigits, address _newAuthoritiesStorage) public returns (bool);
  function getAuthoritiesStoragesCount(uint _lastDigits) public constant returns (uint);
  function getAuthoritiesStorageAddress(uint _lastDigits, uint _index) public constant returns (address);
  function getAuthoritiesStorageLimit(uint _lastDigits, uint _index) public constant returns (uint);
  function revertAuthoritiesStorage(uint _lastDigits, address _addressAuthoritiesStorage) public returns (bool);
  function getAuthoritiesStorage(uint _lastDigits, uint _index) public constant returns (address, uint);
  function setStorageLimit(uint _value) public returns (uint);
  function setMegaFactoryAuthoritiesAddress(address _megaFactoryAddress) public returns (bool);
  function getMegaFactoryAuthoritiesAddress() public constant returns (address);
  function setAuthoritiesProxyAddress(address _authorityProxyAddress) public returns (bool);
  function getAuthoritiesProxyAddress() public constant returns (address);
}




contract MegaFactoryAuthorities {
    address owner;
    address osu;

    address factoryAddress;
    address proxyAddress;

    FactoryAuthoritiesInterface public factory;

    // Ownership of the contract
    modifier OwnerOrOSUniversity {
        if(msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

      function MegaFactoryAuthorities(address _owner, address _osu) public {
          owner = _owner;
          osu = _osu;
      }

      // ====================================== AuthoritiesStorage ===================================
      // for now AuthoritiesStorage can be created by the owner
      function createAuthoritiesStorageByInterface() public returns(address) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          factory = FactoryAuthoritiesInterface(factoryAddress);
          address tempAddr = factory.createAuthoritiesStorage();
          return tempAddr;
      }

      // set already created successfully AuthoritiesStorage into the AuthorityProxy for particular 4 digit cluster
      function setAuthoritiesStorageAddress(uint _lastDigits, address _newCoursesStorage) public returns(uint) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          return factory.storeAuthoritiesStorage(_lastDigits, _newCoursesStorage);
      }

      // revert if AuthoritiesStorage deployment is un-successful
      function revertAuthoritiesStorage(uint _lastDigits, address _authoritiesStorage) public returns(bool) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          return factory.revertAuthoritiesStorage(_lastDigits, _authoritiesStorage);
      }

      // sets the limit of the future CertificateStorage contracts which will be created
      function setStorageLimit(uint _value) public returns (uint) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          return factory.setStorageLimit(_value);
      }


      // ================================== Set prelimnary values =============================
      function setFactoryAddress(address _factoryAddress) public OwnerOrOSUniversity returns(address) {
          factoryAddress = _factoryAddress;
          factory = FactoryAuthoritiesInterface(factoryAddress);
          return factoryAddress;
      }


}
