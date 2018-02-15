pragma solidity ^0.4.15;

import "./FactoryCourses.sol";


contract FactoryCoursesInterface {
    event CoursesStorageCreated(address coursesStorage, uint now_time);
    event CoursesContractCreated(address courseContract, uint now_time);
    event CourseLearnersContractCreated(address courseContract, uint now_time);

    uint maxNrOfRecordsInStorage;
    uint public iFactory;

    struct CoursesStoragesStruct {
        address storageAddress;
        uint storageLimitation;
    }

    CoursesStoragesStruct [] public coursesStorages;
    mapping (uint => address[]) public newCoursesStorageTEMP;
    function createCoursesStorage(uint _lastDigits) public returns (address);
    function setCoursesStorageAddress(uint _lastDigits, address _newCoursesStorage) public returns (bool);
    function getProcessingCoursesStoragesCount(uint _lastDigits) public constant returns (uint);
    function getProcessingCoursesStorageAddress(uint _lastDigits, uint _index) public constant returns (address);
    function removeProcessingCoursesStorage(uint _lastDigits, uint _index) public returns (bool);
    function revertCoursesStorage(address _addressCoursesStorage) public returns (bool);
    function getCoursesStorageCounter() public constant returns (uint);
    function getCoursesStorage(uint _index) public constant returns (address, uint);
    function setStorageLimit(uint _value) public returns (uint);
    function createCourseContract() public returns (address);
    function createCourseLearnersContract() public returns (address);
    function setMegaFactoryCoursesAddress(address _megaFactoryAddress) public returns (bool);
    function getMegaFactoryCoursesAddress() public constant returns (address);
    function setCoursesProxyAddress(address _coursesProxyAddress) public returns (bool);
    function getCoursesProxyAddress() public constant returns (address);
}




contract MegaFactoryCourses {
    address owner;
    address osu;

    address factoryAddress;
    address proxyAddress;

    FactoryCoursesInterface public factory;

    // Ownership of the contract
    modifier OwnerOrOSUniversity {
        if(msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

      function MegaFactoryCourses(address _owner, address _osu) public {
          owner = _owner;
          osu = _osu;
      }

      // ====================================== CoursesStorage ===================================
      // for now CoursesStorage can be created by the owner
      function createCoursesStorageByInterface(uint _lastDigits) public returns(address) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          factory = FactoryCoursesInterface(factoryAddress);
          address tempAddr = factory.createCoursesStorage(_lastDigits);
          return tempAddr;
      }

      // set already created successfully CoursesStorage into the CoursesProxy for particular 4 digit cluster
      function setCoursesStorageAddress(uint _lastDigits, address _newCoursesStorage) public returns(bool) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          return factory.setCoursesStorageAddress(_lastDigits, _newCoursesStorage);
      }

      // revert if CoursesStorage deployment is un-successful
      function revertCoursesStorage(address _courseStorage) public returns(bool) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          return factory.revertCoursesStorage(_courseStorage);
      }

      // sets the limit of the future CertificateStorage contracts which will be created
      function setStorageLimit(uint _value) public returns (uint) {
          require(tx.origin == owner || tx.origin == osu);
          require(factoryAddress != address(0));
          return factory.setStorageLimit(_value);
      }


      // =========================================== Course =====================================
      function createCourseContractByInterface() public returns (address) {
          factory = FactoryCoursesInterface(factoryAddress);
          address temp = factory.createCourseContract();
          return temp;
      }

      // =========================================== CourseLearners =====================================
      function createCourseLearnersContractByInterface() public returns (address) {
          factory = FactoryCoursesInterface(factoryAddress);
          address temp = factory.createCourseLearnersContract();
          return temp;
      }


      // ================================== Set prelimnary values =============================
      function setFactoryAddress(address _factoryAddress) public OwnerOrOSUniversity returns(address) {
          factoryAddress = _factoryAddress;
          factory = FactoryCoursesInterface(factoryAddress);
          return factoryAddress;
      }


}
