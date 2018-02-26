
pragma solidity ^0.4.15;

import "./CertificateStorage.sol";

contract FactoryCertificate {

    // Ownership
    address public osu;
    address public owner;


    // Constructor
    function FactoryCertificate(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
    }

    // Create certificate
    function createCertificateStorage(
        uint _startIndex,
        uint _maxLimitOfRecords
    )
        public
        returns (address)
    {
        CertificateStorage newCertificateStorage = new CertificateStorage(owner, osu, _startIndex, _maxLimitOfRecords);
        return newCertificateStorage;
    }


}
