pragma solidity ^0.4.15;


contract CertificateStorage {
    event CertificateCreated(uint upon_creation);
    event CertificateUpdated(uint upon_creation);
    event CertificateDeleted(uint upon_creation);

    address public owner;
    address public osu;

    CertificateStruct[] public certificateStruct;
    uint counter;

    struct CertificateStruct {
        address academy;
        address course;
        address learner;
        bytes32[2] name;
        bytes32[2] subject;
        bool verified;
        uint8 score;
        address creator;
        uint expirationDate;
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
        bool _verified,
        uint8 _score,
        uint _expirationDate
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
            // this flag will be retrieved from the AuthorityStorage via Future nodes
            certificateStruct[certificateStruct.length-1].verified = _verified;
        } else {
            certificateStruct[certificateStruct.length-1].verified = false;
        }
        certificateStruct[certificateStruct.length-1].score = _score;
        certificateStruct[certificateStruct.length-1].creator = msg.sender;
        certificateStruct[certificateStruct.length-1].expirationDate = _expirationDate;

        CertificateCreated(now);
        return true;
    }


    // Get all addresses for a specific certificate
    function getCertificateAddressesByIndex(uint _index) public constant returns (address, address, address, address) {
        require(certificateStruct.length != 0 && certificateStruct.length > _index);

        return (certificateStruct[_index].academy,
                certificateStruct[_index].course,
                certificateStruct[_index].learner,
                certificateStruct[_index].creator
        );
    }


    // Get all the additional information for a specific certificate
    function getCertificateDataByIndex(uint _index) public constant returns (bytes32[2], bytes32[2], bool, uint8, uint) {
        require(certificateStruct.length != 0 && certificateStruct.length > _index);

        return (certificateStruct[_index].name,
                certificateStruct[_index].subject,
                certificateStruct[_index].verified,
                certificateStruct[_index].score,
                certificateStruct[_index].expirationDate
        );
    }


    // Update existing certificate
    function updateCertificateByIndex(
        uint _i,
        address _academyOLD,
        address _courseOLD,
        address _learnerOLD,
        address _academy,
        address _course,
        address _learner,
        bytes32[2] _name,
        bytes32[2] _subject,
        bool _verified,
        uint8 _score,
        address _creator,
        uint _expirationDate
    )
        public
        returns (bool)
    {
        // check if the user of some of owner addresses is using this functionality
        require(_academyOLD == msg.sender || _learnerOLD == msg.sender || owner == msg.sender || osu == msg.sender);
        require(certificateStruct.length != 0);

        // Right to update only specific information about the certificate
        // depending on the role sender of the message has

        if (certificateStruct[_i].academy == _academyOLD &&
            certificateStruct[_i].course == _courseOLD &&
            certificateStruct[_i].learner == _learnerOLD
        ) {
            if (_academyOLD == msg.sender) {
                certificateStruct[_i].academy = _academy;
                certificateStruct[_i].course = _course;
                certificateStruct[_i].score = _score;
                certificateStruct[_i].expirationDate = _expirationDate;
            } else if (_learnerOLD == msg.sender) {
                certificateStruct[_i].learner = _learner;
            } else {
                certificateStruct[_i].academy = _academy;
                certificateStruct[_i].course = _course;
                certificateStruct[_i].learner = _learner;
                certificateStruct[_i].name = _name;
                certificateStruct[_i].subject = _subject;
                certificateStruct[_i].verified = _verified;
                certificateStruct[_i].score = _score;
                certificateStruct[_i].creator = _creator;
                certificateStruct[_i].expirationDate = _expirationDate;
            }
            CertificateUpdated(now);
            return true;
        } else {
            counter = _i;
            return updateCertificateWithoutIndex(
                counter,
                _academyOLD,
                _courseOLD,
                _learnerOLD,
                _academy,
                _course,
                _learner,
                _name,
                _subject,
                _verified,
                _score,
                _creator,
                _expirationDate
            );
        }
        return false;
    }

    function updateCertificateWithoutIndex(
        uint _sIndex,
        address _academyOLD,
        address _courseOLD,
        address _learnerOLD,
        address _academy,
        address _course,
        address _learner,
        bytes32[2] _name,
        bytes32[2] _subject,
        bool _verified,
        uint8 _score,
        address _creator,
        uint _expirationDate
    )
        internal
        returns (bool)
    {
        counter = _sIndex;
        uint[] memory i = new uint[](1);
        for (i[0] = 0; i[0] <= counter; i[0]++) {
            if (certificateStruct[counter].academy == _academyOLD &&
                certificateStruct[counter].course == _courseOLD &&
                certificateStruct[counter].learner == _learnerOLD
            ) {
                if (_academyOLD == msg.sender) {
                    certificateStruct[i[0]].academy = _academy;
                    certificateStruct[i[0]].course = _course;
                    certificateStruct[i[0]].score = _score;
                    certificateStruct[i[0]].expirationDate = _expirationDate;
                } else if (_learnerOLD == msg.sender) {
                    certificateStruct[i[0]].learner = _learner;
                } else {
                    certificateStruct[i[0]].academy = _academy;
                    certificateStruct[i[0]].course = _course;
                    certificateStruct[i[0]].learner = _learner;
                    certificateStruct[i[0]].name = _name;
                    certificateStruct[i[0]].subject = _subject;
                    certificateStruct[i[0]].verified = _verified;
                    certificateStruct[i[0]].score = _score;
                    certificateStruct[i[0]].expirationDate = _expirationDate;
                    certificateStruct[i[0]].creator = _creator;
                }
                CertificateUpdated(now);
                return true;
            }
      }

    }

    // Remove specific
    function deleteCertificateByIndex(
        uint _index,
        address _academyOLD,
        address _courseOLD,
        address _learnerOLD
    )
        public
        returns (bool)
    {
        // check if the user of some of owner addresses is using this functionality
        require(_learnerOLD == msg.sender || owner == msg.sender || osu == msg.sender);
        if (_index >= certificateStruct.length && certificateStruct.length > 0) {
            if (certificateStruct.length > 50)
                _index = certificateStruct.length / 2;
            else
                _index = 0;
        }
        if (
            certificateStruct[_index].academy == _academyOLD &&
            certificateStruct[_index].course == _courseOLD &&
            certificateStruct[_index].learner == _learnerOLD
        ) {
            return remove(_index);
        } else {

            for (uint i = 0; i <= _index; i++) {
                if (
                    certificateStruct[i].academy == _academyOLD &&
                    certificateStruct[i].course == _courseOLD &&
                    certificateStruct[i].learner == _learnerOLD
                ) {
                    return remove(i);
                }
            }
        }
        return false;
    }

    function certificateCounter() public constant returns (uint) {
        return certificateStruct.length;
    }

    // remove specific record from the array of certificates
    function remove(uint index) internal returns(bool) {
        if (index >= certificateStruct.length) return false;
        certificateStruct[index] = certificateStruct[certificateStruct.length-1];
        delete certificateStruct[certificateStruct.length-1];
        certificateStruct.length--;
        CertificateDeleted(now);
        return true;
    }

}
