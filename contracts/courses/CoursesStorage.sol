pragma solidity ^0.4.15;


contract CoursesStorage {
    event MaxNrOfRecordsReached(address smartcontract, uint startIndex, uint maxNrRecords, uint upon_creation);
    event CloseToMaxNrOfRecords(address smartcontract, uint startIndex, uint maxNrRecords, uint currentNrRecords, uint upon_creation);

    // Ownership
    address public owner;
    address public osu;

    // Set indexes as unique for every certificate
    uint tempIndex;
    uint startIndex;
    uint maxLimitOfRecords;
    uint endIndex;

    struct CoursePresentStruct {
        address courseContract;       // address of the smart contract for specific course
        address issuer;               // address of the autority which will verify the course
        bytes32[] skills;             // skills which can be gained after compleating the course
        uint level;                   // specify the level of this course (1 - beginners; 2 - Intermediate; 3 - Expert; 4 - All levels)
        bytes32[2] title;             // title of the course
        bytes32 category;             // name of the category in which is this course
        bytes32 subcategory;          // name of the subcategory in which is this course
        bool isExisting;
    }

    // address -> the unique address of smart contract for specific course (== courseContract)
    mapping (address => CoursePresentStruct) public coursesInformation;

    // Constructor
    function CoursesStorage(
        address _owner,
        address _osu,
        uint _startIndex,
        uint _maxLimitOfRecords
    )
        public
    {
        owner = _owner;
        osu = _osu;
        startIndex = _startIndex;
        maxLimitOfRecords = _maxLimitOfRecords;
        endIndex = startIndex + maxLimitOfRecords;
        tempIndex = startIndex;
    }


    // Set record via Course contract when it's successfully deployed
    // It's necessary to be set via Course contract because we need to verify that it's unique
    function addCourseViewRecord(
        bytes32[] _skills,
        uint _level,
        bytes32[2] _title,
        bytes32 _category,
        bytes32 _subcategory
    )
        public
        returns (bool)
    {
        require(coursesInformation[msg.sender].isExisting == false);
        if (tempIndex >= endIndex) {
            MaxNrOfRecordsReached(address(this), startIndex, maxLimitOfRecords, now);
            return false;
        } else if (tempIndex + 100 > endIndex) {
            CloseToMaxNrOfRecords(address(this), startIndex, maxLimitOfRecords, tempIndex+1, now);
        }

        coursesInformation[msg.sender].courseContract = msg.sender;
        coursesInformation[msg.sender].issuer = tx.origin;
        coursesInformation[msg.sender].skills = _skills;
        coursesInformation[msg.sender].level = _level;
        coursesInformation[msg.sender].title = _title;
        coursesInformation[msg.sender].category = _category;
        coursesInformation[msg.sender].subcategory = _subcategory;
        coursesInformation[msg.sender].isExisting = true;
        tempIndex++;
        return true;
    }

    // Get short information after specify the address of the course contract
    function getCourseViewGeneralRecord(
        address _courseAddress
    )
        public
        constant
        returns (address, address, bytes32[], uint)
    {
        require(coursesInformation[_courseAddress].isExisting);
        return (coursesInformation[_courseAddress].courseContract,
                coursesInformation[_courseAddress].issuer,
                coursesInformation[_courseAddress].skills,
                coursesInformation[_courseAddress].level
                );
    }

    // Get short information after specify the address of the course contract
    function getCourseViewAdditionalRecord(
        address _courseAddress
    )
        public
        constant
        returns (bytes32[2], bytes32, bytes32)
    {
        require(coursesInformation[_courseAddress].isExisting);
        return (coursesInformation[_courseAddress].title,
                coursesInformation[_courseAddress].category,
                coursesInformation[_courseAddress].subcategory
                );
    }


    function updateCourseViewRecord(
        address _courseContract,
        address _issuer,
        bytes32[] _skills,
        uint _level,
        bytes32[2] _title,
        bytes32 _category,
        bytes32 _subcategory
    )
        public
        returns (bool)
    {
        require(tx.origin == _issuer || tx.origin == owner || tx.origin == osu);
        require(coursesInformation[_courseContract].isExisting);

        coursesInformation[_courseContract].courseContract = _courseContract;
        coursesInformation[_courseContract].issuer = _issuer;
        coursesInformation[_courseContract].skills = _skills;
        coursesInformation[_courseContract].level = _level;
        coursesInformation[_courseContract].title = _title;
        coursesInformation[_courseContract].category = _category;
        coursesInformation[_courseContract].subcategory = _subcategory;
        coursesInformation[_courseContract].isExisting = true;
        return true;
    }


    // Will be initiated again via Course contract
    function deleteCourseViewRecord(
        address _courseContract
    )
       public
       returns (bool)
    {
        require(coursesInformation[_courseContract].isExisting);
        require(coursesInformation[_courseContract].issuer == tx.origin || owner == tx.origin || osu == tx.origin);
        coursesInformation[_courseContract].isExisting = false;
        delete coursesInformation[_courseContract];
        return true;
    }


}
