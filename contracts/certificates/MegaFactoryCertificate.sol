pragma solidity ^0.4.15;

import "./FactoryCertificate.sol";

contract FactoryCertificateInterface {
      // Create certificate
      function createCertificateStorage(uint _startIndex, uint _maxLimitOfRecords) public returns (address);
}

contract MegaFactoryCertificate {
    event CertificateStorageCreating(address certificate, uint now_time);

    address public owner;
    address public osu;

    // About FactoryCertificate
    address public factoryAddress;

    // About CertificateStorage
    uint public maxLimitOfRecords;
    uint public currentIndex;
    address newCertificateStorage;

    // Define the structure of CertificateStorages which are
    // successfuly created
    struct CertificateStoragesMined {
        address storageAddress;
        uint startIndex;
        uint storageLimitation;
    }

    CertificateStoragesMined[] public certificateStoragesMined;

    // Ownership of the contract
    modifier OwnerOrOSUniversity {
        if(tx.origin != owner && tx.origin != osu)
            revert();
        else
            _;
    }

    function MegaFactoryCertificate(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
        maxLimitOfRecords = 100000;
        currentIndex = maxLimitOfRecords + 1;
    }

    function createCertificateStorageByInterface() public returns(address) {
        require(tx.origin == owner || tx.origin == osu);
        require(factoryAddress != address(0));
        newCertificateStorage = address(0);
        FactoryCertificateInterface factory = FactoryCertificateInterface(factoryAddress);
        newCertificateStorage = factory.createCertificateStorage(currentIndex, maxLimitOfRecords);
        CertificateStorageCreating(newCertificateStorage, now);
        return newCertificateStorage;
    }

    function confirmedCreationOfCertificateStorage(address _confirmedAddress) public returns(bool) {
        require(tx.origin == owner || tx.origin == osu);
        if (newCertificateStorage != address(0)) {
            certificateStoragesMined.length++;
            certificateStoragesMined[certificateStoragesMined.length-1].storageAddress = _confirmedAddress;
            certificateStoragesMined[certificateStoragesMined.length-1].startIndex = currentIndex;
            certificateStoragesMined[certificateStoragesMined.length-1].storageLimitation = maxLimitOfRecords;
            newCertificateStorage = address(0);
            currentIndex = currentIndex + maxLimitOfRecords + 1;
            return true;
        } else {
            newCertificateStorage = address(0);
            return false;
        }
    }

    // Extra functionality to have full controll over the creation of CertificateStorage contracts
    function updateCreationOfCertificateStorage(uint _index, address _confirmedAddress, uint _currentIndex) public returns(bool) {
        require(tx.origin == owner || tx.origin == osu);
        require(_index < certificateStoragesMined.length);
        currentIndex = _currentIndex;
        certificateStoragesMined[_index].storageAddress = _confirmedAddress;
        certificateStoragesMined[_index].startIndex = currentIndex;
        certificateStoragesMined[_index].storageLimitation = maxLimitOfRecords;
        newCertificateStorage = address(0);
        return true;
    }

    function getCertificateStorage(uint _index) public constant returns (address, uint, uint) {
        if (_index < certificateStoragesMined.length) {
            return (certificateStoragesMined[_index].storageAddress, certificateStoragesMined[_index].startIndex, certificateStoragesMined[_index].storageLimitation);
        } else {
            return (address(0), 0, 0);
        }
    }

    function getNrOfCertificateStorages() public constant returns (uint) {
        return certificateStoragesMined.length;
    }


    // ABOUT CERTIFICATESTORAGE
    // sets the limit of records the future CertificateStorage contracts will have
    function setStorageLimit(uint _value) public OwnerOrOSUniversity returns (uint) {
        maxLimitOfRecords = _value;
        return maxLimitOfRecords;
    }


    // ABOUT THE FACTORYCERTIFICATE
    function setFactoryAddress(address _factoryAddress) public OwnerOrOSUniversity returns(address) {
        factoryAddress = _factoryAddress;
        return factoryAddress;
    }

}
