pragma solidity ^0.4.15;


contract FactoryCoursesInterface {

  address public osu;
  address public owner;

  address public megaFactoryAddress;

  function createCoursesStorage(uint _startIndex,uint _maxLimitOfRecords) public returns (address);

  function createCourseContract(
      address _verifier,
      bytes32[] _skills,
      uint _level,
      uint _numberLectures,
      bytes32[2] _title,
      address[] _participantStorage,
      address[] _graduateStorage,
      bytes32 _category,
      bytes32 _subcategory
  )public returns (address, address);

  function createOnlyCourseContract(
      address _verifier,
      bytes32[] _skills,
      uint _level,
      uint _numberLectures,
      bytes32[2] _title,
      address[] _participantStorage,
      address[] _graduateStorage,
      bytes32 _category,
      bytes32 _subcategory
  ) public returns (address);
  function createOnlyCourseLearners(address _newContract ) public returns (address);
  function createCoursesProxy(uint _startIndex, uint _maxLimitOfRecords) public returns (address);
  function setMegaFactoryCoursesAddress(address _megaFactoryAddress) public returns (bool);
  function getMegaFactoryCoursesAddress() public constant returns (address);
}

contract CoursesProxyInterface {
  event MaxNrOfRecordsReached(address smartcontract, uint startIndex, uint maxNrRecords, uint upon_creation);
  event CloseToMaxNrOfRecords(address smartcontract, uint startIndex, uint maxNrRecords, uint currentNrRecords, uint upon_creation);

  address public owner;
  address public osu;

  uint tempIndex;
  uint startIndex;
  uint maxLimitOfRecords;
  uint endIndex;

  bool public isFull;
  bool public isCloseToFull;

  struct CourseLearnersStruct {
      address courseAddress;
      address learnersAddress;
      bool isActive;
  }

  CourseLearnersStruct[] public courseLearnersStruct;

  mapping (address => uint[]) public coursesBySenderMapping;

  function CoursesProxy(address _owner, address _osu, uint _startIndex, uint _maxLimitOfRecords) public;
  function setCourseRelation(address _courseAddress, address _learnersAddress) public returns (bool);
  function getCourseRelationByIndex(uint _index) public constant returns (address, address, bool);
  function getNrOfStoredCourses() public constant returns (uint);
  function getCourseRelationByIssuer(uint _index) public constant returns (address, address, bool);
  function getNrOfCoursesByIssuer(address _issuerAddress) public constant returns (uint);
}


contract CoursesStorageInterface {
    event MaxNrOfRecordsReached(address smartcontract, uint startIndex, uint maxNrRecords, uint upon_creation);
    event CloseToMaxNrOfRecords(address smartcontract, uint startIndex, uint maxNrRecords, uint currentNrRecords, uint upon_creation);

    address public owner;
    address public osu;

    struct CoursePresentStruct {
        address courseContract;
        address issuer;
        bytes32[] skills;
        uint level;
        bytes32[2] title;
        bytes32 category;
        bytes32 subcategory;
        bool isExisting;
    }

    mapping (address => CoursePresentStruct) public coursesInformation;
    function addCourseViewRecord(address _courseContract,address _issuer,bytes32[] _skills,uint _level,bytes32[2] _title,bytes32 _category,bytes32 _subcategory) public returns (bool);
    function getCourseViewGeneralRecord(address _courseAddress) public constant returns (address, address, bytes32[], uint);
    function getCourseViewAdditionalRecord(address _courseAddress) public constant returns (bytes32[2], bytes32, bytes32);
    function updateCourseViewRecord(address _courseContract,address _issuer,bytes32[] _skills,uint _level,bytes32[2] _title,bytes32 _category,bytes32 _subcategory) public returns (bool);
    function deleteCourseViewRecord(address _issuer, address _courseContract) public returns (bool);
}

contract MegaFactoryCourses {
    event CoursesStorageCreating(address coursesStorage, uint upon_creation);
    event CoursesStorageConfirmed(address coursesStorage, uint beginIndex, uint limitOfRecords, uint index, uint upon_creation);
    event CourseContractCreating(address courseContract, address courseContractLearners, uint upon_creation);
    event OnlyCourseLearnersCreating(address courseContractLearners, uint upon_creation);
    event OnlyCourseContractCreating(address courseContract, uint upon_creation);
    event CoursesProxyCreating(address coursesProxy, uint upon_creation);
    event CoursesProxyConfirmed(address coursesProxy, uint upon_creation);
    event CloseToMaximumProxy(address coursesProxy, uint upon_creation);
    event FullProxyStorage(address coursesProxy, uint upon_creation);
    event FactoryInstance(address coursesProxy, uint upon_creation);
    event ProxyInstance(address coursesProxy, uint upon_creation);
    event StorageInstance(address coursesProxy, uint beginIndex, uint limitOfRecords, uint upon_creation);

    // Ownership
    address public owner;
    address public osu;

    // Preliminary addresses which needs to be set
    address public factoryAddress;
    address public proxyAddress;

    // Interfaces
    FactoryCoursesInterface public factoryInterface;
    CoursesProxyInterface public proxyInterface;
    CoursesStorageInterface public storageInterface;

    // About CoursesStorage
    uint public maxLimitOfRecordsCourses;
    uint public currentIndexCourses;

    // About CoursesProxy
    uint public maxLimitOfRecordsProxy;
    uint public currentIndexProxy;

    address newCoursesStorage;
    address newCourseContract;
    address newCourseLearner;
    address newCoursesProxy;

    struct CoursesCreationOwnership {
        address CourseContract;
        address CourseLearnersContract;
        bool isExisting;
    }

    mapping (address => CoursesCreationOwnership) courseContractsOwnership;

    // Define the structure of CertificateStorages which are
    // successfuly created
    struct CoursesStoragesMined {
        address storageAddress;
        uint startIndex;
        uint storageLimitation;
    }

    struct CoursesProxyesMined {
        address proxyAddress;
        uint proxyStartIndex;
        uint proxyStorageLimitation;
    }

    CoursesStoragesMined[] public coursesStoragesMined;
    CoursesProxyesMined[] public coursesProxyesMined;


    function MegaFactoryCourses(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
        maxLimitOfRecordsCourses = 100000;
        currentIndexCourses = maxLimitOfRecordsCourses + 1;
        maxLimitOfRecordsProxy = 100000;
        currentIndexProxy = maxLimitOfRecordsProxy + 1;
    }

    // ====================================== CoursesStorage ===================================
    function createCoursesStorage() public returns(address) {
        require(tx.origin == owner || tx.origin == osu);
        require(factoryAddress != address(0));
        factoryInterface = FactoryCoursesInterface(factoryAddress);
        newCoursesStorage = factoryInterface.createCoursesStorage(currentIndexCourses, maxLimitOfRecordsCourses);
        CoursesStorageCreating(newCoursesStorage, now);
        return newCoursesStorage;
    }

    // after confirming that the CoursesStorage contract is created successfuly
    // newCoursesStorage needs to hold the actual address of the new smart contract
    function confirmedCreationOfCoursesStorage() public returns(bool) {
        require(tx.origin == owner || tx.origin == osu);
        storageInterface = CoursesStorageInterface(newCoursesStorage);
        require(storageInterface.owner() == owner);
        if (newCoursesStorage != address(0)) {
             coursesStoragesMined.length++;
             coursesStoragesMined[coursesStoragesMined.length-1].storageAddress = newCoursesStorage;
             coursesStoragesMined[coursesStoragesMined.length-1].startIndex = currentIndexCourses;
             coursesStoragesMined[coursesStoragesMined.length-1].storageLimitation = maxLimitOfRecordsCourses;
             CoursesStorageConfirmed(newCoursesStorage, currentIndexCourses, maxLimitOfRecordsCourses, coursesStoragesMined.length-1, now);
             newCoursesStorage = address(0);
             currentIndexCourses = currentIndexCourses + maxLimitOfRecordsCourses + 1;
             return true;
        }
        return false;
    }

    // _index -> update the record placed under specific index
    // _confirmedAddress -> the address which was given to the CoursesStorage after it has been mined
    // _currentIndex -> mechanism to set different start index of specific contract (this index is the starting UID for every single storage)
    function updateCreationOfCoursesStorage(uint _index, address _confirmedAddress, uint _currentIndex) public returns(bool) {
        require(tx.origin == owner || tx.origin == osu);
        require(_index < coursesStoragesMined.length);
        currentIndexCourses = _currentIndex;
        coursesStoragesMined[_index].storageAddress = _confirmedAddress;
        coursesStoragesMined[_index].startIndex = currentIndexCourses;
        coursesStoragesMined[_index].storageLimitation = maxLimitOfRecordsCourses;
        newCoursesStorage = address(0);
        return true;
    }

    // get the address and limitation of storage selected by index
    function getCoursesStorage(uint _index) public constant returns (address, uint, uint) {
        require(_index < coursesStoragesMined.length);
        return (coursesStoragesMined[_index].storageAddress, coursesStoragesMined[_index].startIndex, coursesStoragesMined[_index].storageLimitation);
    }

    // number of all stored CourseStorages
    function getNrOfCoursesStorages() public constant returns (uint) {
        return coursesStoragesMined.length;
    }

    // sets the limit of the future CoursesStorage contracts which will be created
    function setStorageLimit(uint _value) public returns (uint) {
        require(tx.origin == owner || tx.origin == osu);
        maxLimitOfRecordsCourses = _value;
        return maxLimitOfRecordsCourses;
    }


    // =========================================== Course =====================================
    function createCourseContract(
        address _verifier,
        bytes32[] _skills,
        uint _level,
        uint _numberLectures,
        bytes32[2] _title,
        address[] _participantStorage,
        address[] _graduateStorage,
        bytes32 _category,
        bytes32 _subcategory
    )
        public
        returns (address, address)
    {
        require(tx.origin != address(0) && factoryAddress != address(0));
        factoryInterface = FactoryCoursesInterface(factoryAddress);
        (newCourseContract, newCourseLearner) = factoryInterface.createCourseContract(_verifier, _skills, _level, _numberLectures, _title, _participantStorage, _graduateStorage, _category, _subcategory);
        CourseContractCreating(newCourseContract, newCourseLearner, now);
        delete courseContractsOwnership[tx.origin];
        courseContractsOwnership[tx.origin].CourseContract = newCourseContract;
        courseContractsOwnership[tx.origin].CourseLearnersContract = newCourseLearner;
        courseContractsOwnership[tx.origin].isExisting = true;
        return (newCourseContract, newCourseLearner);
    }

    function createOnlyCourseContract(
        address _verifier,
        bytes32[] _skills,
        uint _level,
        uint _numberLectures,
        bytes32[2] _title,
        address[] _participantStorage,
        address[] _graduateStorage,
        bytes32 _category,
        bytes32 _subcategory
    )
        public
        returns (address)
    {
        require(tx.origin != address(0) && factoryAddress != address(0));
        factoryInterface = FactoryCoursesInterface(factoryAddress);
        newCourseContract = factoryInterface.createOnlyCourseContract(_verifier, _skills, _level, _numberLectures, _title, _participantStorage, _graduateStorage, _category, _subcategory);
        OnlyCourseContractCreating(newCourseContract, now);
        courseContractsOwnership[tx.origin].CourseContract = newCourseContract;
        courseContractsOwnership[tx.origin].isExisting = true;
        return newCourseContract;
    }

    // This function needs to get as an argument the address of already created contract for specific course
    function createOnlyCourseLearners(address _newContract) public returns (address) {
        require(tx.origin != address(0) && factoryAddress != address(0));
        factoryInterface = FactoryCoursesInterface(factoryAddress);
        newCourseContract = factoryInterface.createOnlyCourseLearners(_newContract);
        OnlyCourseLearnersCreating(newCourseContract, now);
        courseContractsOwnership[tx.origin].CourseLearnersContract = newCourseContract;
        courseContractsOwnership[tx.origin].isExisting = true;
        return newCourseContract;
    }

    // after confirming that the CourseContract is created successfuly
    function confirmedCreationOfCourse() public returns(bool) {
        if (courseContractsOwnership[tx.origin].CourseContract != address(0) &&
            courseContractsOwnership[tx.origin].CourseLearnersContract != address(0) &&
            courseContractsOwnership[tx.origin].isExisting == true) {
            if (coursesProxyesMined.length > 0) {
                if (bool(proxyInterface.isFull()) == false) {
                    if (bool(proxyInterface.isCloseToFull()) == true) {
                      CloseToMaximumProxy(address(proxyInterface), now);
                    }
                    proxyInterface.setCourseRelation(courseContractsOwnership[tx.origin].CourseContract, courseContractsOwnership[tx.origin].CourseLearnersContract);
                    delete courseContractsOwnership[tx.origin];
                    return true;
                } else {
                    FullProxyStorage(address(proxyInterface), now);
                }
            }
        }
        return false;
    }

    /* maxLimitOfRecordsProxy = 100000;
    currentIndexProxy = maxLimitOfRecordsProxy + 1; */

    // =========================================== CoursesProxy =======================================
    function createCoursesProxy() public returns(address) {
        require(tx.origin == owner || tx.origin == osu);
        require(factoryAddress != address(0));
        factoryInterface = FactoryCoursesInterface(factoryAddress);
        newCoursesProxy = factoryInterface.createCoursesProxy(currentIndexProxy, maxLimitOfRecordsProxy);
        CoursesProxyCreating(newCoursesProxy, now);
        return newCoursesProxy;
    }

    // after confirming that the CoursesProxy contract is created successfuly
    function confirmedCreationOfCoursesProxy(address _confirmedAddress) public returns(bool) {
        require(tx.origin == owner || tx.origin == osu);
        if (newCoursesProxy == _confirmedAddress && newCoursesProxy != address(0)) {
             coursesProxyesMined.length++;
             coursesProxyesMined[coursesProxyesMined.length-1].proxyAddress = _confirmedAddress;
             coursesProxyesMined[coursesProxyesMined.length-1].proxyStartIndex = currentIndexProxy;
             coursesProxyesMined[coursesProxyesMined.length-1].proxyStorageLimitation = maxLimitOfRecordsProxy;
             CoursesProxyConfirmed(_confirmedAddress, now);
             newCoursesProxy = address(0);
             currentIndexProxy = currentIndexProxy + maxLimitOfRecordsProxy + 1;
             return true;
        }
        return false;
    }


    // ================================== Set prelimnary values =============================
    function preliminarySettings(
        address _megaFactoryAddress,
        address _factoryAddress,
        address _proxyAddress,
        address _storageAddress
    )
        public
        returns (bool)
    {
        require(tx.origin == owner || tx.origin == osu);
        setFactoryAddress(_factoryAddress);
        setProxyAddress(_proxyAddress);
        setStorageAddress(_storageAddress);
        factoryInterface.setMegaFactoryCoursesAddress(_megaFactoryAddress);
        return true;
    }

    function setFactoryAddress(address _factoryAddress) public returns(bool) {
        require(tx.origin == owner || tx.origin == osu);
        factoryAddress = _factoryAddress;
        factoryInterface = FactoryCoursesInterface(factoryAddress);
        FactoryInstance(factoryAddress, now);
        return true;
    }

    function setProxyAddress(address _proxyAddress) public returns(bool) {
        require(tx.origin == owner || tx.origin == osu);
        proxyAddress = _proxyAddress;
        //....... All successfully mined CoursesProxy contracts
        coursesProxyesMined.length++;
        coursesProxyesMined[coursesProxyesMined.length-1].proxyAddress = _proxyAddress;
        coursesProxyesMined[coursesProxyesMined.length-1].proxyStartIndex = maxLimitOfRecordsProxy;
        coursesProxyesMined[coursesProxyesMined.length-1].proxyStorageLimitation = maxLimitOfRecordsProxy;
        newCoursesProxy = address(0);
        //.....................................................
        currentIndexProxy = currentIndexProxy + maxLimitOfRecordsProxy + 1;
        proxyInterface = CoursesProxyInterface(proxyAddress);
        ProxyInstance(proxyAddress, now);
        return true;
    }

    function setStorageAddress(address _storageAddress) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        coursesStoragesMined.length++;
        coursesStoragesMined[coursesStoragesMined.length-1].storageAddress = _storageAddress;
        coursesStoragesMined[coursesStoragesMined.length-1].startIndex = currentIndexCourses;
        coursesStoragesMined[coursesStoragesMined.length-1].storageLimitation = maxLimitOfRecordsCourses;
        newCoursesStorage = address(0);
        StorageInstance(proxyAddress, currentIndexCourses, maxLimitOfRecordsCourses, now);
        currentIndexCourses = currentIndexCourses + maxLimitOfRecordsCourses + 1;
        return true;
    }


}
