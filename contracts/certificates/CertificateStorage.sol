pragma solidity ^0.4.15;


contract CertificateStorage {
    event CertificateCreated(address academy_address, address course_address, address learner_address, bytes32[2] name_string, bytes32[2] subject_string, bool verification_flag, uint8 score_value, uint now_time);
    event CertificateUpdated(address academy_address, address course_address, address learner_address, bytes32[2] name_string, bytes32[2] subject_string, bool verification_flag, uint8 score_value, uint now_time);
    event CertificateDeleted(uint now_time);

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
        address creator;
    }

    // Ownership of the contract
    modifier OwnerOrOSUniversity {
        if(msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

    // Constructor
    function CertificateStorage(address _owner, address _osu) {
        owner = _owner;
        osu = _osu;
    }

    // Adding new certificate
    function addCertificate(
        address _academy,
        address _course,
        address _learner,
        bytes32[2] _name,
        bytes32[2] _subject,
        uint8 _score
    )
        public
        returns (bool)
    {
        // check if the user of some of owner addresses is using this functionality
        require(_academy == msg.sender || _learner == msg.sender || owner == msg.sender || osu == msg.sender);
        if (_academy == address(0) && _learner == address(0)) {
            return false;
        }
        certificateStruct.push(CertificateStruct(_academy, _course, _learner, _name, _subject, false, _score, msg.sender));
        CertificateCreated(_academy, _course, _learner, _name, _subject, false, _score, now);
        return true;
    }


    // Update existing certificate
    function updateCertificateByIndex(
        uint _index,
        address _academyOLD,
        address _courseOLD,
        address _learnerOLD,
        bytes32[2] _nameOLD,
        address _academy,
        address _course,
        address _learner,
        bytes32[2] _name,
        bytes32[2] _subject,
        uint8 _score
    )
        public
        returns (bool)
    {
        // check if the user of some of owner addresses is using this functionality
        require(_academyOLD == msg.sender || _learnerOLD == msg.sender || owner == msg.sender || osu == msg.sender);
        if (_index >= certificateStruct.length && certificateStruct.length > 0) {
            if (certificateStruct.length > 50)
                _index = certificateStruct.length / 2;
            else
                _index = 0;
        }
        bool verificationFlag;
        // Declate temporary variables in the memory
        if (certificateStruct[_index].academy == _academyOLD &&
            certificateStruct[_index].course == _courseOLD &&
            certificateStruct[_index].learner == _learnerOLD &&
            certificateStruct[_index].name[1] == _nameOLD[1]
        ) {
              certificateStruct[_index].academy = _academy;
              certificateStruct[_index].course = _course;
              certificateStruct[_index].learner = _learner;
              certificateStruct[_index].name = _name;
              certificateStruct[_index].subject = _subject;
              certificateStruct[_index].score = _score;
              verificationFlag = certificateStruct[_index].verified;
              CertificateUpdated(_academy, _course, _learner, _name, _subject, verificationFlag, _score, now);
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
                    verificationFlag = certificateStruct[i].verified;
                CertificateUpdated(_academy, _course, _learner, _name, _subject, verificationFlag, _score, now);
                return true;
                }
            }
        }
        return false;
    }


    // Remove specific
    function deleteCertificateByIndex(
        uint _index,
        address _academyOLD,
        address _courseOLD,
        address _learnerOLD,
        bytes32[2] _nameOLD
    )
        public
        returns (bool)
    {
        // check if the user of some of owner addresses is using this functionality
        require(_academyOLD == msg.sender || _learnerOLD == msg.sender || owner == msg.sender || osu == msg.sender);
        if (_index >= certificateStruct.length && certificateStruct.length > 0) {
            if (certificateStruct.length > 50)
                _index = certificateStruct.length / 2;
            else
                _index = 0;
        }
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


    // remove specific record from the array of certificates
    function remove(uint index) internal returns(bool) {
        if (index >= certificateStruct.length) return false;
        CertificateStruct[] memory newCertificate = new CertificateStruct[](1);
        newCertificate[0] = certificateStruct[index];
        certificateStruct[index] = certificateStruct[certificateStruct.length-1];
        delete certificateStruct[certificateStruct.length-1];
        certificateStruct.length--;
        CertificateDeleted(now);
        return true;
    }


}
