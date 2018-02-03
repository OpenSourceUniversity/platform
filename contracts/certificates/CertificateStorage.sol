pragma solidity ^0.4.15;


contract CertificateStorage {
    event CertificateCreated(address addrAcademy, address addrCourse, address addrLearner, bytes32[2] strName, bytes32[2] strSubject, bool bolVerification, uint8 uintScore);
    event CertificateUpdated(address addrAcademy, address addrCourse, address addrLearner, bytes32[2] strName, bytes32[2] strSubject, uint8 uintScore);
    event CertificateDeleted(bool successful);

    address public owner;
    address public osu;

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
    modifier ownerORosu {
        if (msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

    // Constructor
    function CertificateStorage(address _owner, address _osu) public {
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
        uint8 _score,
        bool _verified
    )
        public
        returns (bool)
    {
        // check if the user of some of owner addresses is using this functionality
        require(_academy == msg.sender || _learner == msg.sender || owner == msg.sender || osu == msg.sender);
        if (_academy == address(0) && _learner == address(0)) {
            return false;
        }
        certificateStruct.length++;
        certificateStruct[certificateStruct.length-1].academy = _academy;
        certificateStruct[certificateStruct.length-1].course = _course;
        certificateStruct[certificateStruct.length-1].learner = _learner;
        certificateStruct[certificateStruct.length-1].name = _name;
        certificateStruct[certificateStruct.length-1].subject = _subject;
        if (certificateStruct[certificateStruct.length-1].academy == msg.sender) {
            certificateStruct[certificateStruct.length-1].verified = _verified;
        } else {
            certificateStruct[certificateStruct.length-1].verified = false;
        }
        certificateStruct[certificateStruct.length-1].score = _score;
        certificateStruct[certificateStruct.length-1].creator = msg.sender;

        CertificateCreated(_academy, _course, _learner, _name, _subject, _verified, _score);
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
        uint8 _score,
        bool _verified
    )
        public
        returns (bool)
    {
        // check if the user of some of owner addresses is using this functionality
        require(_academyOLD == msg.sender || _learnerOLD == msg.sender || owner == msg.sender || osu == msg.sender);
        require(certificateStruct.length != 0);

        if (certificateStruct[_index].academy == _academyOLD &&
            certificateStruct[_index].course == _courseOLD &&
            certificateStruct[_index].learner == _learnerOLD &&
            certificateStruct[_index].name[1] == _nameOLD[1]
        ) {
            if (msg.sender == certificateStruct[_index].creator || certificateStruct[_index].creator == certificateStruct[_index].academy ) {
                certificateStruct[_index].academy = _academy;
                certificateStruct[_index].course = _course;
                certificateStruct[_index].learner = _learner;
                certificateStruct[_index].name = _name;
                certificateStruct[_index].subject = _subject;
                certificateStruct[_index].score = _score;
                if (msg.sender == certificateStruct[_index].academy) {
                    certificateStruct[_index].verified = _verified;
                }

                CertificateUpdated(_academy, _course, _learner, _name, _subject, _score);
                return true;
            }
            return false;
        } else {

            for (uint i = 0; i <= _index; i++) {
                if (certificateStruct[i].academy == _academyOLD && certificateStruct[i].course == _courseOLD &&
                    certificateStruct[i].learner == _learnerOLD && certificateStruct[i].name[1] == _nameOLD[1]
                ) {
                    if (msg.sender == certificateStruct[_index].creator || certificateStruct[_index].creator == certificateStruct[_index].academy ) {
                        certificateStruct[i].academy = _academy;
                        certificateStruct[i].course = _course;
                        certificateStruct[i].learner = _learner;
                        certificateStruct[i].name = _name;
                        certificateStruct[i].subject = _subject;
                        certificateStruct[i].score = _score;
                        if (msg.sender == certificateStruct[_index].academy) {
                            certificateStruct[_index].verified = _verified;
                        }
                        CertificateUpdated(_academy, _course, _learner, _name, _subject, _score);
                        return true;
                    }
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
        certificateStruct[index] = certificateStruct[certificateStruct.length-1];
        delete certificateStruct[certificateStruct.length-1];
        certificateStruct.length--;
        CertificateDeleted(true);
        return true;
    }

}
