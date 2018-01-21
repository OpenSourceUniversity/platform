
pragma solidity ^0.4.15;

import "Certificate.sol";
import "CertificateInterface.sol";
import "CertificateLibrary.sol";

contract Parent {
    event CertificateCreated(address certificate, uint now);

    // Ownership
    address osu;
    address owner;

    using CertificateLibrary for address;
    address public addressLibrary;

    mapping(uint => address) public certificates;

    modifier OwnerOrOSUniversity {
        if(msg.sender != owner && msg.sender != osu) revert();
        else _;
    }

    // Constructor
    function Parent(address _owner, address _osu, address _addressLibrary) public {
        owner = _owner;
        osu = _osu;
        addressLibrary = _addressLibrary;
    }

    function createCertificateStorage()
    public
    payable
    {
        var certificateStorage = new Certificate(msg.sender, osu);

        addressLibrary.addCertificateInstances(certificateStorage);
        CertificateCreated(certificateStorage, now);
    }

    function getCertificateStorage(uint _index) public constant returns (address, bool) {
        return addressLibrary.getCertificateInstances(_index);
    }


    function setLibraryAddress(address __addressLibrary) OwnerOrOSUniversity public returns (bool) {
        addressLibrary = _addressLibrary;
        return true;
    }

    function countNrOfCertificates() public constant returns (uint) {
        return addressLibrary.countNrOfCertificates();
    }


}
