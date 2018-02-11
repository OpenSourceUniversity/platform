pragma solidity ^0.4.15;


contract CoursesStorage {
    address public owner;
    address public osu;

    // Proxy
    address proxyAddress;

    struct CoursePresentStruct {
        address courseContract;       // address of the smart contract for specific course
        address verifier;             // address of the autority which will verify the course
        uint numberRetings;           // number of raters for this specific course
        uint averageRating;           // current rating of the course
        bytes32[] skills;             // skills which can be urned after compleating the course
        uint level;                   // specify the level of this course (1 - beginners; 2 - Intermediate; 3 - Expert; 4 - All levels)
        bytes32[] title;             // title of the course
        bytes32 category;             // name of the category in which is this course
        bytes32 subcategory;          // name of the subcategory in which is this course
        bool isExisting;
    }

    // address -> uPort address which is registered in the platform (the owner of these courses)
    mapping (address => CoursePresentStruct) public coursesInformation;

    // Ownership of the contract
    modifier ownerOrOSU {
        if (msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

    // Constructor
    function CoursesStorage(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
    }


    // Set record
    function setCourseViewRecord(
        address _courseContract,
        address _verifier,
        uint _numberRetings,
        uint _averageRating,
        bytes32[] _skills,
        uint _level,
        bytes32[] _title,
        bytes32 _category,
        bytes32 _subcategory
    )
        public
        returns (bool)
    {
        require(proxyAddress != address(0) && msg.sender == proxyAddress);
        address originator;
        originator = tx.origin;
        if (coursesInformation[originator].isExisting) revert();
        coursesInformation[originator].courseContract = _courseContract;
        coursesInformation[originator].verifier = _verifier;
        coursesInformation[originator].numberRetings = _numberRetings;
        coursesInformation[originator].averageRating = _averageRating;
        coursesInformation[originator].skills = _skills;
        coursesInformation[originator].level = _level;
        coursesInformation[originator].title = _title;
        coursesInformation[originator].category = _category;
        coursesInformation[originator].subcategory = _subcategory;
        coursesInformation[originator].isExisting = true;
        return true;
    }

    // Get record
    function getCourseViewRecord() public returns (address, address, uint, uint, bytes32[], uint, bytes32[], bytes32, bytes32) {
        require(proxyAddress != address(0) && msg.sender == proxyAddress);
        address originator;
        originator = tx.origin;
        if (coursesInformation[originator].isExisting) {
            return (coursesInformation[originator].courseContract,
                    coursesInformation[originator].verifier,
                    coursesInformation[originator].numberRetings,
                    coursesInformation[originator].averageRating,
                    coursesInformation[originator].skills,
                    coursesInformation[originator].level,
                    coursesInformation[originator].title,
                    coursesInformation[originator].category,
                    coursesInformation[originator].subcategory
                    );
        }
        bytes32[] memory tstBytes32Array = new bytes32[](1);
        return (address(0),address(0), 0, 0, tstBytes32Array, 0, tstBytes32Array, '', '');
    }


    // Update record
    function updateUserViewRecord(
        address _courseContract,
        address _verifier,
        uint _numberRetings,
        uint _averageRating,
        bytes32[] _skills,
        uint _level,
        bytes32[] _title,
        bytes32 _category,
        bytes32 _subcategory
    )
        public
        returns (bool)
    {
        require(proxyAddress != address(0) && msg.sender == proxyAddress);
        address originator;
        originator = tx.origin;
        if (coursesInformation[originator].isExisting) {
            coursesInformation[originator].courseContract = _courseContract;
            coursesInformation[originator].verifier = _verifier;
            coursesInformation[originator].numberRetings = _numberRetings;
            coursesInformation[originator].averageRating = _averageRating;
            coursesInformation[originator].skills = _skills;
            coursesInformation[originator].level = _level;
            coursesInformation[originator].title = _title;
            coursesInformation[originator].category = _category;
            coursesInformation[originator].subcategory = _subcategory;
            coursesInformation[originator].isExisting = true;
            return true;
        }
        return false;
    }


    // Delete record
    function deleteUserViewRecord() public returns (bool) {
        require(proxyAddress != address(0) && msg.sender == proxyAddress);
        address originator;
        originator = tx.origin;
        if (coursesInformation[originator].isExisting) {
            coursesInformation[originator].isExisting = false;
            return true;
        }
        return false;
    }

    function getProxyAddress() public ownerOrOSU constant returns (address) {
        return proxyAddress;
    }

    function setProxyAddress(address _proxyAddress) public ownerOrOSU returns (bool) {
        require(_proxyAddress != address(0));
        proxyAddress = _proxyAddress;
    }


}
