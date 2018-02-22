pragma solidity ^0.4.15;

/**
 * Its only purpose is to handle the
 * last 4 digits of already converted user address
 * to a numver.
 * Expected to have AuthorityStorage for all addresses ending
 * with numbers from 0 to 9999.
 * Statistically if we have enough records they will be
 * normally distributed.
 */

contract AuthorityProxy {
    address owner;
    address osu;

    // unt -> 4 digit number
    // address -> CoursesStorage representing this number
    mapping (uint => address[]) public authoritiesStorageAddresses;

    function AuthorityProxy(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
    }

    // Check if AuthoritiyStorage for specific cluster exists
    function isAuthorityStorageExist(uint _lastDigits) public constant returns (bool) {
        return bool(authoritiesStorageAddresses[_lastDigits].length > 0);
    }

    // get the address
    function getAuthorityStorageAddress(uint _lastDigits, uint _index) public constant returns (address) {
        require(authoritiesStorageAddresses[_lastDigits].length > 0 && authoritiesStorageAddresses[_lastDigits].length > _index);
        return authoritiesStorageAddresses[_lastDigits][_index];
    }

    // get the number of AuthoritiyStorage contracts created for a specific 4 digit cluster
    function getAuthorityStorageCounter(uint _lastDigits) public constant returns (uint) {
        return authoritiesStorageAddresses[_lastDigits].length;
    }

    // for now it's defined only owner to create AuthoritiesStorage and to store the new address into AuthoritiyProxy
    // Returns: new number of addresses related to specific 4 digit cluster
    // TO BE IMPROVED
    function setAuthorityStorageAddress(uint _lastDigits, address _newAuthorityStorageAddress) public returns (uint) {
        require(tx.origin == owner || tx.origin == osu);
        authoritiesStorageAddresses[_lastDigits].push(_newAuthorityStorageAddress);
        return authoritiesStorageAddresses[_lastDigits].length;
    }

    // retrieve the address of original sender of the transaction
    function getUserAddress() public constant returns (address) {
      return tx.origin;
    }

}
