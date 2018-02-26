pragma solidity ^0.4.15;


contract CourseLearnersInterface {
    address courseAddress;
    address[] public participants;
    uint[] public participantsDates;
    address[] public graduated;
    uint[] public graduatedDate;
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


contract Course {
    // Ownership
    address public owner;
    address public osu;

    // State
    bool public isDegree;             // if there are more than one course

    // Course learner storage
    CourseLearnersInterface public courseLearners;

    // Information about the course
    struct CourseStruct {
        address creator;              // address of the coure creator
        address verifier;             // address of the autority which will verify the course
        bool isActive;                // if this specific course is still active 'true'
        uint numberRatings;           // number of raters for this specific course
        uint averageRating;          // current rating of the course
        bytes32[] skills;             // skills which can be urned after compleating the course
        uint level;                  // specify the level of this course (1 - beginners; 2 - Intermediate; 3 - Expert; 4 - All levels)
        uint numberLectures;          // number of lectures this course has
        bytes32[2] title;             // title of the course
        address[] participantStorage; // storages of all users in state of taking the course
        address[] graduateStorage;     // graduate storages containing all the users who compleated this course
        bytes32 category;             // name of the category in which is this course
        bytes32 subcategory;          // name of the subcategory in which is this course
    }

    CourseStruct[] public course;

    function Course(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
    }

    // CRUD course (if number of courses > 1 than its a degree)
    function addCourse (
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
        returns (uint)
    {
        course.length = course.length + 1;
        course[course.length-1].creator = tx.origin;
        course[course.length-1].verifier = _verifier;
        course[course.length-1].isActive = true;
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
        return course.length;
    }

    function getCoursesLength() public constant returns (uint) {
        return course.length;
    }

    function getCourseCreator (uint _index) public constant returns (address) {
        require(_index < course.length);
        return course[_index].creator;
    }

    function getCourseVerifier (uint _index) public constant returns (address) {
        require(_index < course.length);
        return course[_index].verifier;
    }

    function isCourseActive (uint _index) public constant returns (bool) {
        require(_index < course.length);
        return course[_index].isActive;
    }

    function getNrOfRaters (uint _index) public constant returns (uint) {
        require(_index < course.length);
        return course[_index].numberRatings;
    }

    function getRating (uint _index) public constant returns (uint) {
        require(_index < course.length);
        return course[_index].averageRating;
    }

    function getSkills (uint _index) public constant returns (bytes32[]) {
        require(_index < course.length);
        return course[_index].skills;
    }

    function getLevel (uint _index) public constant returns (uint) {
        require(_index < course.length);
        return course[_index].level;
    }

    function getNrOfLectures (uint _index) public constant returns (uint) {
        require(_index < course.length);
        return course[_index].numberLectures;
    }

    function getTitle (uint _index) public constant returns (bytes32[2]) {
        require(_index < course.length);
        return course[_index].title;
    }

    function getParticipantsCount(uint _index) public constant returns (uint) {
        require(_index < course.length);
        return course[_index].participantStorage.length;
    }

    function getGraduatesCount(uint _index) public constant returns (uint) {
        require(_index < course.length);
        return course[_index].graduateStorage.length;
    }

    function getGraduatStorage (uint _index) public constant returns (address[]) {
        require(_index < course.length);
        return course[_index].participantStorage;
    }

    function getCategory (uint _index) public constant returns (bytes32) {
        require(_index < course.length);
        return course[_index].category;
    }

    function getSubcategory (uint _index) public constant returns (bytes32) {
        require(_index < course.length);
        return course[_index].subcategory;
    }


    function updateEntireCourse (
        address _verifier,
        uint _numberRatings,
        uint _averageRating,
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
        returns (bool)
    {
      uint[] memory i = new uint[](1);
      i[0] = 0;
          for (i[0] = 0; i[0] < course.length; i[0]++) {
              if (course[i[0]].creator == tx.origin) {
                  course[i[0]].verifier = _verifier;
                  // TODO: creator should not be able to update the rating of
                  // their own courses.
                  course[i[0]].numberRatings = _numberRatings;
                  course[i[0]].averageRating = _averageRating;
                  course[i[0]].skills = _skills;
                  course[i[0]].level = _level;
                  course[i[0]].numberLectures = _numberLectures;
                  course[i[0]].title = _title;
                  course[i[0]].participantStorage = _participantStorage;
                  course[i[0]].graduateStorage = _graduateStorage;
                  course[i[0]].category = _category;
                  course[i[0]].subcategory = _subcategory;
                  return true;
              }
          }
        return false;
    }


    function deleteCourse ()
        public
        returns (bool)
    {
      uint[] memory i = new uint[](1);
      i[0] = 0;
          for (i[0] = 0; i[0] < course.length; i[0]++) {
              if (course[i[0]].creator == tx.origin) {
                  course[i[0]] = course[course.length-1];
                  course.length--;
                  if (course.length < 2) {
                      isDegree = false;
                  }
                  return true;
              }
          }
        return false;
    }


    function setActive(uint _index, bool _val) public returns (bool) {
        require(_index < course.length);
        course[_index].isActive = _val;
        return true;
    }

    // Change course authority
    function setCourseAuthority(uint _index, address _newAuthority) public returns (bool) {
        require(owner == tx.origin || osu == tx.origin);
        require(course.length > _index);
        course[_index].verifier = _newAuthority;
        return true;
    }

}
