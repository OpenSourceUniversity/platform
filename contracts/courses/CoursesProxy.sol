pragma solidity ^0.4.15;


contract CoursesProxy {
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

    // flag if this proxy is full with records
    bool public isFull;
    bool public isCloseToFull;

    struct CourseLearnersStruct {
        address courseAddress;
        address learnersAddress;
        bool isActive;
    }

    CourseLearnersStruct[] public courseLearnersStruct;

    // address -> courseAddress
    // uint[] -> containing indexes to records in the 'courseLearnersStruct' array
    mapping (address => uint[]) public coursesBySenderMapping;

    function CoursesProxy(
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
        isCloseToFull = false;
        isFull = false;
    }

    // get addresses of course contract and coresponding learners participating to the course
    function setCourseRelation(address _courseAddress, address _learnersAddress) public returns (bool) {
        if (tempIndex >= endIndex) {
            MaxNrOfRecordsReached(address(this), startIndex, maxLimitOfRecords, now);
            isFull = true;
            return false;
        } else if (tempIndex + 100 > endIndex) {
            CloseToMaxNrOfRecords(address(this), startIndex, maxLimitOfRecords, tempIndex+1, now);
            isCloseToFull = true;
        }
        courseLearnersStruct.length++;
        courseLearnersStruct[courseLearnersStruct.length-1].courseAddress = _courseAddress;
        courseLearnersStruct[courseLearnersStruct.length-1].learnersAddress = _learnersAddress;
        courseLearnersStruct[courseLearnersStruct.length-1].isActive = true;
        coursesBySenderMapping[tx.origin].length++;
        coursesBySenderMapping[tx.origin][coursesBySenderMapping[tx.origin].length-1] = courseLearnersStruct.length-1;
        tempIndex++;
        return true;
    }

    // -------------  Methods (using index over all records in the contract) --------------
    function getCourseRelationByIndex(uint _index) public constant returns (address, address, bool) {
        require(courseLearnersStruct.length > _index);
        return (courseLearnersStruct[_index].courseAddress,
                courseLearnersStruct[_index].learnersAddress,
                courseLearnersStruct[_index].isActive);
    }

    function getNrOfStoredCourses() public constant returns (uint) {
        return courseLearnersStruct.length;
    }


    // -------------  Methods (by issuer in the contract) --------------
    function getCourseRelationByIssuer(uint _index) public constant returns (address, address, bool) {
        require(coursesBySenderMapping[tx.origin].length > _index);
        return (courseLearnersStruct[coursesBySenderMapping[tx.origin][_index]].courseAddress,
                courseLearnersStruct[coursesBySenderMapping[tx.origin][_index]].learnersAddress,
                courseLearnersStruct[coursesBySenderMapping[tx.origin][_index]].isActive);
    }

    function getNrOfCoursesByIssuer(address _issuerAddress) public constant returns (uint) {
        if (coursesBySenderMapping[tx.origin].length > 0) {
            return coursesBySenderMapping[tx.origin].length;
        }
        return 0;
    }

    // get addresses of course contract and coresponding learners participating to the course
    /* function getCourseRelation(uint _index) public constant returns (address, address) {
        require(_index < courseMapping[tx.origin].length);
        if (courseMapping[tx.origin][_index].isActive == true) {
            return (courseMapping[tx.origin][_index].courseAddress, courseMapping[tx.origin][_index].learnersAddress);
        } else {
            return (address(0), address(0));
        }
    } */

}
