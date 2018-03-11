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

    // flags in regard of the capacity of records
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
    function setCourseRelation(
        address _courseAddress,
        address _learnersAddress
    )
        public
        returns (bool)
    {
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
    function getCourseRelationByIndex(
        uint _index
    )
        public
        constant
        returns (address, address, bool)
    {
        require(courseLearnersStruct.length > _index);
        return (courseLearnersStruct[_index].courseAddress,
                courseLearnersStruct[_index].learnersAddress,
                courseLearnersStruct[_index].isActive);
    }

    function getNrOfStoredCourses() public constant returns (uint) {
        return courseLearnersStruct.length;
    }


    // -------------  Methods (by issuer in the contract) --------------
    function getCourseRelationByIssuer(
        address _issuerAddress,
        uint _index
    )
        public
        constant
        returns (address, address, bool)
    {
        require(coursesBySenderMapping[_issuerAddress].length > _index);
        return (courseLearnersStruct[coursesBySenderMapping[_issuerAddress][_index]].courseAddress,
                courseLearnersStruct[coursesBySenderMapping[_issuerAddress][_index]].learnersAddress,
                courseLearnersStruct[coursesBySenderMapping[_issuerAddress][_index]].isActive);
    }

    function getAllCoursesRelationByIssuer(
        address _issuerAddress
    )
        public
        constant
        returns (address[], address[], bool[])
    {
        require(coursesBySenderMapping[_issuerAddress].length > 0);
        address[] memory resultAddressesCourses = new address[](coursesBySenderMapping[_issuerAddress].length);
        address[] memory resultAddressesLearners = new address[](coursesBySenderMapping[_issuerAddress].length);
        bool[] memory resultActive = new bool[](coursesBySenderMapping[_issuerAddress].length);
        uint[] memory i = new uint[](1);
        i[0] = 0;
        for (i[0] = 0; i[0] < coursesBySenderMapping[_issuerAddress].length; i[0]++) {
            resultAddressesCourses[i[0]] = courseLearnersStruct[coursesBySenderMapping[_issuerAddress][i[0]]].courseAddress;
            resultAddressesLearners[i[0]] = courseLearnersStruct[coursesBySenderMapping[_issuerAddress][i[0]]].learnersAddress;
            resultActive[i[0]] = courseLearnersStruct[coursesBySenderMapping[_issuerAddress][i[0]]].isActive;
        }
        return (resultAddressesCourses, resultAddressesLearners, resultActive);
    }

    function getNrOfCoursesByIssuer(
        address _issuerAddress
    )
        public
        constant
        returns (uint)
    {
        require(coursesBySenderMapping[_issuerAddress].length > 0);
        return coursesBySenderMapping[_issuerAddress].length;
    }

}
