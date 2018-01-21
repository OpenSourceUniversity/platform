
pragma solidity ^0.4.15;

import "./MegaFactoryCertificate.sol";
import "./CertificateStorage.sol";

contract FactoryCertificate {
    event CertificateStorageCreated(address certificate, uint now_time);

    // Ownership
    address osu;
    address owner;

    // Mega factory
    address megaFactoryAddress;

    // Storage limitations
    uint256 maxNrOfRecordsInCertificateStorage;
    uint256 public iFactory;

    struct CertificateStoragesStruct {
        address storageAddress;
        uint256 currentNrOfRecords;
        uint256 storageLimitation;
    }

    CertificateStoragesStruct [] public certificateStorages;

    modifier OwnerOrOSUniversity {
        if(msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

    // Constructor
    function FactoryCertificate(address _osu) {
        owner = msg.sender;
        osu = _osu;
        maxNrOfRecordsInCertificateStorage = 100000;
    }

    // Create certificate (owners of the created certificate are OSUni and deployer)
    function createCertificateStorage()
        public
        returns (bool)
    {
        CertificateStorage newCertificateStorage = new CertificateStorage(owner, osu);
        certificateStorages.push(CertificateStoragesStruct(address(newCertificateStorage), 0, maxNrOfRecordsInCertificateStorage));
        CertificateStorageCreated(newCertificateStorage, now);
        return true;
    }

    // get data for specific certificate
    function getCertificateStorage(uint _index) public constant returns (address, uint256, uint256) {
        if (_index >= certificateStorages.length)
            return (address(0), 0, 0);
        else
            return (certificateStorages[_index].storageAddress, certificateStorages[_index].currentNrOfRecords, certificateStorages[_index].storageLimitation);
    }

    // sets the limit of the future CertificateStorage contracts which will be created
    function setStorageLimit(uint256 _value) public OwnerOrOSUniversity returns (uint256) {
        maxNrOfRecordsInCertificateStorage = _value;
        return maxNrOfRecordsInCertificateStorage;
    }


}
