pragma solidity ^0.4.15;

/**
 * Its only purpose is to handle the
 * last 4 digits of already converted user address
 * to a numver.
 * Expected to have CoursesStorage for all addresses ending
 * with numbers from 0 to 9999.
 * Statistically if we have enough records they will be
 * normally distributed.
 */

contract CoursesProxy {
    address owner;
    address osu;

    // unt -> 4 digit number
    // address -> CoursesStorage representing this number
    mapping (uint => address[]) public coursesStorageAddresses;

    function CoursesProxy(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
    }

    // Check if CoursesStorage for specific cluster exists
    function isCoursesStorageExist(uint _lastDigits) public constant returns (bool) {
        return bool(coursesStorageAddresses[_lastDigits].length > 0);
    }

    // get the address
    function getCoursesStorageAddress(uint _lastDigits, uint _index) public constant returns (address) {
        require(coursesStorageAddresses[_lastDigits].length > 0);
        return coursesStorageAddresses[_lastDigits][_index];
    }

    // get the number of CoursesStorage contracts created for a specific 4 digit cluster
    function getCoursesStorageCounter(uint _lastDigits) public constant returns (uint) {
        return coursesStorageAddresses[_lastDigits].length;
    }

    // for now it's defined only owner to create CoursesStorage and to store the new address into CoursesProxy
    // Returns: new number of addresses related to specific 4 digit cluster
    // TO BE IMPROVED
    function setCoursesStorageAddress(uint _lastDigits, address _newCoursesStorageAddress) public returns (uint) {
        require(tx.origin == owner || tx.origin == osu);
        coursesStorageAddresses[_lastDigits].push(_newCoursesStorageAddress);
        return coursesStorageAddresses[_lastDigits].length;
    }

    // retrieve the address of original sender of the transaction
    function getUserAddress() public constant returns (address) {
      return tx.origin;
    }

}
