pragma solidity ^0.4.15;


import "./CoursesStorage.sol";
import "./Course.sol";
import "./CourseLearners.sol";
import "./CoursesProxy.sol";


contract FactoryCourses {

    // Ownership
    address public osu;
    address public owner;

    // Mega factory
    address public megaFactoryAddress;

    // Constructor
    function FactoryCourses(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
    }

    // =========================== About CoursesStorage =======================================
    function createCoursesStorage(
        uint _startIndex,
        uint _maxLimitOfRecords
    )
        public
        returns (address)
    {
        require(tx.origin == owner || tx.origin == osu);
        CoursesStorage newCoursesStorage = new CoursesStorage(owner, osu, _startIndex, _maxLimitOfRecords);
        return newCoursesStorage;
    }

    // =========================== About Course and CourseLearners ==========================
    // Create course (owners are OSUni and the creator of the course)
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
        require(megaFactoryAddress == msg.sender);
        Course newCourse = new Course(owner, osu, _verifier, _skills, _level, _numberLectures, _title, _participantStorage, _graduateStorage, _category, _subcategory);
        CourseLearners newCourseLearners = new CourseLearners(owner, osu, newCourse);
        return (newCourse, newCourseLearners);
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
        require(megaFactoryAddress == msg.sender);
        Course newCourse = new Course(owner, osu, _verifier, _skills, _level, _numberLectures, _title, _participantStorage, _graduateStorage, _category, _subcategory);
        return newCourse;
    }


    function createOnlyCourseLearners(
        address _newContract
    )
        public
        returns (address)
    {
        require(megaFactoryAddress == msg.sender);
        CourseLearners newCourseLearners = new CourseLearners(owner, osu, _newContract);
        return newCourseLearners;
    }

    // =========================== About CoursesProxy =======================================
    function createCoursesProxy(
        uint _startIndex,
        uint _maxLimitOfRecords
    )
        public
        returns (address)
    {
        require(tx.origin == owner || tx.origin == osu);
        CoursesProxy newCoursesProxy = new CoursesProxy(owner, osu, _startIndex, _maxLimitOfRecords);
        return newCoursesProxy;
    }


    // =========================== MegaFactoryCourses =======================================
    // set MegaFactoryCourses address
    function setMegaFactoryCoursesAddress(address _megaFactoryAddress) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        megaFactoryAddress = _megaFactoryAddress;
        return true;
    }

    // get MegaFactoryCourses address
    function getMegaFactoryCoursesAddress() public constant returns (address) {
        return megaFactoryAddress;
    }


}
