pragma solidity ^0.4.15;


contract CourseLearnersInterface {
  event NewParticipant(address courseAddress, address courseLearnersAddress, uint NrOfParticipants, uint NrOfGraduated, uint upon_creation);
  event NewGraduated(address courseAddress, address courseLearnersAddress, uint NrOfParticipants, uint NrOfGraduated, uint upon_creation);

  address public owner;
  address public osu;

  address courseAddress;

  address[] public participants;
  uint[] public participantsDates;

  address[] public graduated;
  uint[] public graduatedDate;

  mapping (address => bool) public allJoinedLearners;

  function getParticipantsCount() public constant returns (uint);
  function getAllParticipants() public constant returns (address[], uint[]);
  function getParticipant(uint _index) public constant returns (address, uint);
  function setParticipant(address _participantAddress) public returns (bool);
  function deleteParticipant(address _participantAddress) public returns (bool);
  function getGraduatesCount() public constant returns (uint);
  function getAllGraduates() public constant returns (address[], uint[]);
  function getGraduate(uint _index) public constant returns (address, uint);
  function setGraduate(address _graduateAddress) public returns (bool);
  function deleteGraduate(address _graduateAddress) public returns (bool);
  function compleateCourse(address _graduateAddress) public returns (bool);
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

  function addCourseViewRecord(address _courseContract, address _issuer, uint _averageRating, bytes32[] _skills, uint _level, bytes32[2] _title, bytes32 _category, bytes32 _subcategory) public returns (bool);

  function getCourseViewRecord(address _courseAddress) public constant returns (address, address, uint, bytes32[], uint, bytes32[2], bytes32, bytes32);

  function updateCourseViewRecord(address _courseContract, address _issuer, uint _averageRating, bytes32[] _skills, uint _level, bytes32[2] _title, bytes32 _category, bytes32 _subcategory) public returns (bool);

  function deleteCourseViewRecord(address _issuer, address _courseContract) public returns (bool);
}


contract Course {
    event AddCourse(address courseContainer,  address includedCourse, uint upon_creation);

    // Ownership
    address public owner;
    address public osu;
    address public issuer;

    // State
    bool public isDegree;             // if there are more than one course


    // Course learner storage
    CourseLearnersInterface public courseLearners;
    CoursesStorageInterface public coursesStorage;
    CourseInterface public courseInterface;

    // Addresses of related contracts\
    address public courseLearnersAddress;


    // Information about the course
    struct CourseStruct {
        address courseSource;         // the address under which the course was initially created and stored in the blockchain
        address creator;              // address of the coure creator
        address verifier;             // address of the autority which will verify the course
        bool isActive;                // if this specific course is still active 'true'
        bytes32[] skills;             // skills which can be urned after compleating the course
        uint level;                   // specify the level of this course (1 - beginners; 2 - Intermediate; 3 - Expert; 4 - All levels)
        uint numberLectures;          // number of lectures this course has
        bytes32[2] title;             // title of the course
        address[] participantStorage; // storages of all users in state of taking the course
        address[] graduateStorage;    // graduate storages containing all the users who compleated this course
        bytes32 category;             // name of the category in which is this course
        bytes32 subcategory;          // name of the subcategory in which is this course
    }

    CourseStruct[] public course;

    function Course(
        address _owner,
        address _osu,
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
    {
        owner = _owner;
        osu = _osu;
        issuer = tx.origin;
        addCourse(address(this), tx.origin, _verifier, true, _skills, _level, _numberLectures, _title, _participantStorage, _graduateStorage, _category, _subcategory);
    }


    function addCourse (
        address _courseSource,
        address _creator,
        address _verifier,
        bool _isActive,
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
        returns (uint)
    {
        require(issuer == tx.origin);
        course.length = course.length + 1;
        course[course.length-1].courseSource = _courseSource;
        course[course.length-1].creator = _creator;
        course[course.length-1].verifier = _verifier;
        course[course.length-1].isActive = _isActive;
        course[course.length-1].skills = _skills;
        course[course.length-1].level = _level;
        course[course.length-1].numberLectures = _numberLectures;
        course[course.length-1].title = _title;
        course[course.length-1].participantStorage = _participantStorage;
        course[course.length-1].graduateStorage = _graduateStorage;
        course[course.length-1].category = _category;
        course[course.length-1].subcategory = _subcategory;
        if (course.length > 1) {
            isDegree = true;
        }

        AddCourse(address(this), _courseSource, now);
        return course.length;
    }

    // Only issuer of this course can add new courses by pointing the
    // address of
    function addExternalCourse(
        address _courseAddress,
        uint _index
    )
        public
        returns (bool)
    {
        require(issuer == tx.origin);
        courseInterface = Course(_courseAddress);
        uint length = courseInterface.getCoursesLength();
        require(length > _index);
        return insertCourse(_index);
    }

    // Insert first chunk of information about adding new course to this degree
    function insertCourse(
        uint _index
    )
        internal
        returns (bool)
    {
        course.length++;
        (course[course.length-1].courseSource,
         course[course.length-1].creator,
         course[course.length-1].verifier,
         course[course.length-1].isActive,
         course[course.length-1].skills,
         course[course.length-1].level) = courseInterface.getCourseGeneralData.call(_index);
         insertCourseAdditionalInformation();
         return true;
    }

    function insertCourseAdditionalInformation(
        uint _index
    )
        internal
        returns (bool)
    {
        (course[course.length-1].numberLectures,
        course[course.length-1].title,
        course[course.length-1].participantStorage,
        course[course.length-1].graduateStorage,
        course[course.length-1].category,
        course[course.length-1].subcategory) = courseInterface.getCourseAdditionalData.call(_index);
        isDegree=true;
        return true;
    }


    // TODO
    /* function setCoursesStorageRecord() public returns (bool) {
        require();
        coursesStorage.addCourseViewRecord(address(this), tx.origin, _skills, _level, _title, _category, _subcategory);
    } */

    function getCoursesLength() public constant returns (uint) {
        return course.length;
    }

    function getCourseGeneralData(
        uint _index
    )
        public
        constant
        returns (address, address, address, bool, bytes32[], uint)
    {
        require(_index < course.length);
        return (course[_index].courseSource,
                course[_index].creator,
                course[_index].verifier,
                course[_index].isActive,
                course[_index].skills,
                course[_index].level
                );
    }

    function getCourseAdditionalData(
        uint _index
    )
        public
        constant
        returns (uint, bytes32[2], address[], address[], bytes32, bytes32)
    {
        require(_index < course.length);
        return (course[_index].numberLectures,
                course[_index].title,
                course[_index].participantStorage,
                course[_index].graduateStorage,
                course[_index].category,
                course[_index].subcategory);
    }



    function updateEntireCourse(
        uint _index,
        address _verifier,
        bytes32[] _skills,
        uint _level,
        uint _numberLectures,
        bytes32[2] _title,
        bytes32 _category,
        bytes32 _subcategory
    )
        public
        returns (bool)
    {
        require(_index < course.length);
        if (course[_index].creator == tx.origin) {
            course[_index].verifier = _verifier;
            course[_index].skills = _skills;
            course[_index].level = _level;
            course[_index].numberLectures = _numberLectures;
            course[_index].title = _title;
            course[_index].category = _category;
            course[_index].subcategory = _subcategory;
            return true;
        }
        return false;
    }


    function deleteCourse (
        uint _index
    )
        public
        returns (bool)
    {
        require(_index < course.length);
        if (_index > 0 || (course.length == 1 && _index == 0)) {
            if (course[_index].creator == tx.origin) {
                course[_index] = course[course.length-1];
                course.length--;
                if (course.length < 2) {
                    isDegree = false;
                }
                return true;
            }
        }
        return false;
    }

    // Change the flag of the course (active or not) only by the creator of the course
    function setActive(
        uint _index,
        bool _val
    )
        public
        returns (bool)
    {
        require(_index < course.length);
        require(course[_index].creator > tx.origin);
        course[_index].isActive = _val;
        return true;
    }

    // Change course authority only by the creator of the course
    function setCourseAuthority(
        uint _index,
        address _newAuthority
    )
        public
        returns (bool)
    {
        require(course.length > _index);
        require(course[_index].creator > tx.origin);
        course[_index].verifier = _newAuthority;
        return true;
    }

    // Set the address of contract storing all participants to this course of degree
    function setCourseLearnersAddress(
        address _courseLearnersAddress
    )
        public
        returns (bool)
    {
        require(issuer == tx.origin);
        courseLearnersAddress = _courseLearnersAddress;
        return true;
    }

}
