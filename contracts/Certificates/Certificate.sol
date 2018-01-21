pragma solidity ^0.4.15;

import "CertificateInterface.sol";

contract Certificate is CertificateInterface {
    address owner;
    address osu;

    CertificateStruct[] public certificateStruct;

    struct CertificateStruct {
        address academy;
        address course;
        address learner;
        bytes32[2] name;
        bytes32[2] subject;
        bool verified;
        uint8 score;
    }

    /*modifier OwnerOrOSUniversity {
        if(msg.sender != owner && msg.sender != osu) revert();
        else _;
    }*/

    // Constructor
    function Certificate(address _owner, address _osu) {
        owner = _owner;
        osu = _osu;
    }

    // Adding new certificate
    function addCertificate(address _academy, address _course, address _learner, bytes32[2] _name, bytes32[2] _subject, uint8 _score) OwnerOrOSUniversity public returns (bool) {
        if (_academy == address(0) && _learner == address(0)) {
            return false;
        }
        certificateStruct.push(CertificateStruct(_academy, _course, _learner, _name, _subject, false, _score));
        return true;
    }

    // Update existing certificate
    function updateCertificateByIndex(uint _index, address _academyOLD, address _courseOLD, address _learnerOLD, bytes32[2] _nameOLD, address _academy, address _course, address _learner, bytes32[2] _name, bytes32[2] _subject, uint8 _score) OwnerOrOSUniversity public returns (bool) {
        if (_index < certificateStruct.length) { return false; }
        // Declate temporary variables in the memory
        if (certificateStruct[_index].academy == _academyOLD &&
          certificateStruct[_index].course == _courseOLD &&
          certificateStruct[_index].learner == _learnerOLD &&
          certificateStruct[_index].name[1] == _nameOLD[1]) {
              certificateStruct[_index].academy = _academy;
              certificateStruct[_index].course = _course;
              certificateStruct[_index].learner = _learner;
              certificateStruct[_index].name = _name;
              certificateStruct[_index].subject = _subject;
              certificateStruct[_index].score = _score;
              return true;
        } else {

            for (uint i = 0; i <= _index; i++) {
                if (certificateStruct[i].academy == _academyOLD && certificateStruct[i].course == _courseOLD && certificateStruct[i].learner == _learnerOLD && certificateStruct[i].name[1] == _nameOLD[1]) {
                    certificateStruct[i].academy = _academy;
                    certificateStruct[i].course = _course;
                    certificateStruct[i].learner = _learner;
                    certificateStruct[i].name = _name;
                    certificateStruct[i].subject = _subject;
                    certificateStruct[i].score = _score;
                return true;
                }
            }
        }
        return false;
    }

    // Remove specific
    function deleteCertificateByIndex(uint _index, address _academyOLD, address _courseOLD, address _learnerOLD, bytes32[2] _nameOLD) OwnerOrOSUniversity public returns (bool) {
        if (_index < certificateStruct.length) { return false; }
        if (certificateStruct[_index].academy == _academyOLD && certificateStruct[_index].course == _courseOLD && certificateStruct[_index].learner == _learnerOLD && certificateStruct[_index].name[1] == _nameOLD[1]) {
            return remove(_index);
        } else {

            for (uint i = 0; i <= _index; i++) {
                if (certificateStruct[i].academy == _academyOLD && certificateStruct[i].course == _courseOLD && certificateStruct[i].learner == _learnerOLD && certificateStruct[i].name[1] == _nameOLD[1]) {
                    return remove(i);
                }
            }
        }
        return false;
    }

    function remove(uint index) OwnerOrOSUniversity public returns(bool) {
        if (index >= certificateStruct.length) return false;
        CertificateStruct[] memory newCertificate = new CertificateStruct[](1);
        newCertificate[0] = certificateStruct[index];
        certificateStruct[index] = certificateStruct[certificateStruct.length-1];
        delete certificateStruct[certificateStruct.length-1];
        certificateStruct.length--;
        return true;
    }


}
