pragma solidity ^0.4.15;

import "Certificate.sol";

contract CertificateInterface {
    address owner;
    address osu;

    modifier OwnerOrOSUniversity {
        if(msg.sender != owner && msg.sender != osu) revert();
        else _;
    }

    struct CertificateStruct {
        address academy;
        address course;
        address learner;
        bytes32[2] name;
        bytes32[2] subject;
        bool verified;
        uint8 score;
    }

    CertificateStruct[] public certificateStruct;

    function addCertificate(address _academy, address _course, address _learner, bytes32[2] _name, bytes32[2] _subject, uint8 _score) OwnerOrOSUniversity public returns (bool);

    function updateCertificateByIndex(uint _index, address _academyOLD, address _courseOLD, address _learnerOLD, bytes32[2] _nameOLD, address _academy, address _course, address _learner, bytes32[2] _name, bytes32[2] _subject, uint8 _score) OwnerOrOSUniversity public returns (bool);

    function deleteCertificateByIndex(uint _index, address _academyOLD, address _courseOLD, address _learnerOLD, bytes32[2] _nameOLD) OwnerOrOSUniversity public returns (bool);

    function remove(uint index) OwnerOrOSUniversity public returns(bool);
}
