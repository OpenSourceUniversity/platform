pragma solidity ^0.4.15;

/**
 * Its only purpose is to handle the
 * last 4 digits of already converted user address
 * to a numver.
 * Expected to have UsersStorage for all addresses ending
 * with numbers from 0000 to 9999.
 * Statistically if we have enough records they will be
 * normally distributed.
 */

contract UsersProxy {
    address owner;
    address osu;

    // unt -> 4 digit number
    // address -> UsersStorage representing this number
    mapping (uint => address[]) public userStorageAddresses;

    function UsersProxy(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
    }

    // Check if UsersStorage for specific cluster divided by 4 digits cluster
    function isUsersStorageExist(uint _lastDigits) public constant returns (bool) {
        return bool(userStorageAddresses[_lastDigits].length > 0);
    }

    // get the address
    function getUsersStorageAddress(uint _lastDigits, uint _index) public constant returns (address) {
        require(userStorageAddresses[_lastDigits].length > 0);
        return userStorageAddresses[_lastDigits][_index];
    }

    // get the number of UsersStorage contracts created for a specific 4 digit section
    function getUsersStorageCounter(uint _lastDigits) public constant returns (uint) {
        return userStorageAddresses[_lastDigits].length;
    }

    // for now it's defined only owner to create UsersStorage and to store the new address into UsersProxy
    // Returns: new number of addresses related to specific 4 digit cluster
    // TO BE IMPROVED
    function setUsersStorageAddress(uint _lastDigits, address _newUsersStorageAddress) public returns (uint) {
        require(tx.origin == owner || tx.origin == osu);
        userStorageAddresses[_lastDigits].push(_newUsersStorageAddress);
        return userStorageAddresses[_lastDigits].length;
    }

    // retrieve the address of original sender of the transaction
    function getUserAddress() public constant returns (address) {
      return tx.origin;
    }

}
