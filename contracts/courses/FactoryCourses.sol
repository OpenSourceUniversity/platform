pragma solidity ^0.4.15;

import "./MegaFactoryCourses.sol";
import "./CoursesStorage.sol";
import "./Course.sol";
import "./CourseLearners.sol";


contract CoursesProxy {
    mapping (uint => address[]) public coursesStorageAddresses;

    function isCoursesStorageExist(uint _lastDigits) public constant returns (bool);
    function getCoursesStorageAddress(uint _lastDigits, uint _index) public constant returns (address);
    function getCoursesStorageCounter(uint _lastDigits) public constant returns (uint);
    function setCoursesStorageAddress(uint _lastDigits, address _newCoursesStorageAddress) public returns (uint);
    function getUserAddress() public constant returns (address);
}


contract FactoryCourses {
    event CoursesStorageCreated(address coursesStorage, uint now_time);
    event CourseContractCreated(address courseContract, uint now_time);
    event CourseLearnersContractCreated(address courseContract, uint now_time);

    // Ownership
    address osu;
    address owner;

    // Mega factory
    address megaFactoryAddress;

    // CoursesProxy
    address coursesProxyAddress;

    // Storage limitations
    uint maxNrOfRecordsInStorage;
    uint public iFactory;

    struct CoursesStoragesStruct {
        address storageAddress;
        uint storageLimitation;
    }

    CoursesStoragesStruct [] public coursesStorages;

    mapping (uint => address[]) public newCoursesStorageTEMP;

    modifier OwnerOrOSUniversity {
        if(msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

    // Constructor
    function FactoryCourses(address _osu) public {
        owner = msg.sender;
        osu = _osu;
        maxNrOfRecordsInStorage = 10000;
    }

    // =========================== About CoursesStorage =======================================
    // Create storage for courses of specific 4 digit cluster
    function createCoursesStorage(uint _lastDigits) public returns (address) {
        require(tx.origin == owner || tx.origin == osu);
        CoursesStorage newCoursesStorage = new CoursesStorage(owner, osu);
        coursesStorages.length++;
        coursesStorages[coursesStorages.length-1].storageAddress = address(newCoursesStorage);
        coursesStorages[coursesStorages.length-1].storageLimitation = maxNrOfRecordsInStorage;
        newCoursesStorageTEMP[_lastDigits].push(newCoursesStorage);
        CoursesStorageCreated(newCoursesStorage, now);
        return newCoursesStorage;
    }

    function setCoursesStorageAddress(uint _lastDigits, address _newCoursesStorage) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        CoursesProxy coursesProxy = CoursesProxy(coursesProxyAddress);
        coursesProxy.setCoursesStorageAddress(_lastDigits, _newCoursesStorage);
        return true;
    }

    function getProcessingCoursesStoragesCount(uint _lastDigits) public constant returns (uint) {
        require(tx.origin == owner || tx.origin == osu);
        return newCoursesStorageTEMP[_lastDigits].length;
    }

    function getProcessingCoursesStorageAddress(uint _lastDigits, uint _index) public constant returns (address) {
        require(tx.origin == owner || tx.origin == osu);
        if (newCoursesStorageTEMP[_lastDigits].length > _index && newCoursesStorageTEMP[_lastDigits].length > 0) {
            return newCoursesStorageTEMP[_lastDigits][_index];
        }
        return address(0);
    }

    function removeProcessingCoursesStorage(uint _lastDigits, uint _index) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        if (newCoursesStorageTEMP[_lastDigits].length > _index && newCoursesStorageTEMP[_lastDigits].length > 0) {
            delete newCoursesStorageTEMP[_lastDigits][_index];
            return true;
        }
        return false;
    }

    // revert if CoursesStorage deployment is un-successful
    function revertCoursesStorage(address _addressCoursesStorage) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        if (coursesStorages.length > 0) {
            uint[] memory i = new uint[](1);
            for (i[0] = 0; i[0] < coursesStorages.length; i[0]++) {
                if (coursesStorages[i[0]].storageAddress == _addressCoursesStorage) {
                    coursesStorages[i[0]].storageAddress = coursesStorages[coursesStorages.length-1].storageAddress;
                    coursesStorages[i[0]].storageLimitation = coursesStorages[coursesStorages.length-1].storageLimitation;
                    coursesStorages.length--;
                    return true;
                }
            }
        }
        return false;
    }


    function getCoursesStorageCounter() public constant returns (uint) {
        return coursesStorages.length;
    }

    // get data for specific certificate
    function getCoursesStorage(uint _index) public constant returns (address, uint) {
        if (_index >= coursesStorages.length)
            return (address(0), 0);
        else
            return (coursesStorages[_index].storageAddress, coursesStorages[_index].storageLimitation);
    }

    // sets the limit of the future CertificateStorage contracts which will be created
    function setStorageLimit(uint _value) public returns (uint) {
        require(tx.origin == owner || tx.origin == osu);
        maxNrOfRecordsInStorage = _value;
        return maxNrOfRecordsInStorage;
    }

    // =========================== About Course =======================================
    // Create certificate (owners of the created certificate are OSUni and deployer)
    function createCourseContract() public returns (address) {
        require(megaFactoryAddress == msg.sender);
        Course newCourse = new Course(tx.origin, osu);
        CourseContractCreated(newCourse, now);
        return address(newCourse);
    }

    // =========================== About CourseLearners =======================================
    // Create certificate (owners of the created certificate are OSUni and deployer)
    function createCourseLearnersContract() public returns (address) {
        require(megaFactoryAddress == msg.sender);
        CourseLearners newCourseLearners = new CourseLearners(owner, osu, tx.origin);
        CourseLearnersContractCreated(newCourseLearners, now);
        return address(newCourseLearners);
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

    // =========================== CoursesProxy =======================================
    // set CoursesProxy address
    function setCoursesProxyAddress(address _coursesProxyAddress) public returns (bool) {
        require(tx.origin == owner || tx.origin == osu);
        coursesProxyAddress = _coursesProxyAddress;
        return true;
    }

    // get CoursesProxy address
    function getCoursesProxyAddress() public constant returns (address) {
        return coursesProxyAddress;
    }


}
