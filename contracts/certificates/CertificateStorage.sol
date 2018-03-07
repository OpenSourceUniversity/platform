pragma solidity ^0.4.15;


contract CertificateStorage {
    event CertificateCreated(uint upon_creation, uint index);
    event CertificateUpdated(uint upon_creation);
    event CertificateDeleted(uint upon_creation);

    event MaxNrOfRecordsReached(address smartcontract, uint startIndex, uint maxNrRecords, uint upon_creation);
    event CloseToMaxNrOfRecords(address smartcontract, uint startIndex, uint maxNrRecords, uint currentNrRecords, uint upon_creation);

    address public owner;
    address public osu;

    CertificateStruct[] public certificateStruct;
    uint counter;
    uint updPosition;

    // Set indexes as unique for every certificate
    uint tempIndex;
    uint startIndex;
    uint maxLimitOfRecords;
    uint endIndex;

    struct RelationalUIDStruct {
        uint index;
        bool isExisting;
    }

    mapping (uint => RelationalUIDStruct) public relationalMapping;

    struct CertificateStruct {
        uint UID;
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

    // Constructor
    function CertificateStorage(
        address _owner,
        address _osu,
        uint _startIndex,
        uint _maxLimitOfRecords
    )
        public
    {
        owner = _owner;
        osu = _osu;
        startIndex = _startIndex;
        maxLimitOfRecords = _maxLimitOfRecords;
        endIndex = startIndex + maxLimitOfRecords;
        tempIndex = startIndex;
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
        require(_academy == tx.origin || _learner == tx.origin || owner == tx.origin || osu == tx.origin);
        if (tempIndex >= endIndex) {
            MaxNrOfRecordsReached(address(this), startIndex, maxLimitOfRecords, now);
            return false;
        } else if (tempIndex + 100 >= endIndex) {
            CloseToMaxNrOfRecords(address(this), startIndex, maxLimitOfRecords, tempIndex+1, now);
        }

        if (_academy == address(0) && _learner == address(0)) {
            return false;
        }
        certificateStruct.length++;
        certificateStruct[certificateStruct.length-1].academy = _academy;
        certificateStruct[certificateStruct.length-1].course = _course;
        certificateStruct[certificateStruct.length-1].learner = _learner;
        certificateStruct[certificateStruct.length-1].name = _name;
        certificateStruct[certificateStruct.length-1].subject = _subject;
        if (certificateStruct[certificateStruct.length-1].academy == tx.origin) {
            // this flag will be retrieved from the AuthorityStorage via Future nodes
            certificateStruct[certificateStruct.length-1].verified = _verified;
        } else {
            certificateStruct[certificateStruct.length-1].verified = false;
        }
        certificateStruct[certificateStruct.length-1].score = _score;
        certificateStruct[certificateStruct.length-1].creator = tx.origin;
        certificateStruct[certificateStruct.length-1].expirationDate = _expirationDate;

        // Index relation
        relationalMapping[tempIndex].index = certificateStruct.length-1;
        relationalMapping[tempIndex].isExisting = true;
        certificateStruct[certificateStruct.length-1].UID = tempIndex;
        CertificateCreated(now, tempIndex);
        tempIndex++;
        return true;
    }


    // Get all addresses for a specific certificate
    function getCertificateAddressesByIndex(uint _index) public constant returns (address, address, address, address) {
        require(relationalMapping[_index].isExisting);
        if (relationalMapping[_index].index < certificateStruct.length) {
            uint[] memory tmpCounter = new uint[](1);
            tmpCounter[0] = relationalMapping[_index].index;
            return (certificateStruct[tmpCounter[0]].academy,
                    certificateStruct[tmpCounter[0]].course,
                    certificateStruct[tmpCounter[0]].learner,
                    certificateStruct[tmpCounter[0]].creator
            );
        } else {
            return (address(0), address(0), address(0), address(0));
        }
    }


    // Get all the additional information for a specific certificate
    function getCertificateDataByIndex(uint _index) public constant returns (uint, bytes32[2], bytes32[2], bool, uint8, uint) {
        require(relationalMapping[_index].isExisting);
        if (relationalMapping[_index].index < certificateStruct.length) {
            uint[] memory tmpCounter = new uint[](1);
            tmpCounter[0] = relationalMapping[_index].index;
            return (certificateStruct[tmpCounter[0]].UID,
                    certificateStruct[tmpCounter[0]].name,
                    certificateStruct[tmpCounter[0]].subject,
                    certificateStruct[tmpCounter[0]].verified,
                    certificateStruct[tmpCounter[0]].score,
                    certificateStruct[tmpCounter[0]].expirationDate
            );
        } else {
            bytes32[2] memory tmp1;
            return (0, tmp1, tmp1, false, 0, 0);
        }
    }


    // Update existing certificate
    function updateCertificateByIndex(
        uint _i,
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
        require(certificateStruct.length != 0 && relationalMapping[_i].isExisting == true);
        require(relationalMapping[_i].index < certificateStruct.length);
        updPosition = relationalMapping[_i].index;
        require(certificateStruct[updPosition].academy == tx.origin || certificateStruct[updPosition].learner == tx.origin || owner == tx.origin || osu == tx.origin);

        // Right to update only specific information about the certificate
        // depending on the role sender of the message has

        if (certificateStruct[updPosition].UID == _i) {
            if (certificateStruct[updPosition].academy == tx.origin) {
                certificateStruct[updPosition].academy = _academy;
                certificateStruct[updPosition].course = _course;
                certificateStruct[updPosition].score = _score;
                certificateStruct[updPosition].expirationDate = _expirationDate;
            } else if (certificateStruct[updPosition].learner == tx.origin) {
                certificateStruct[updPosition].learner = _learner;
            } else {
                certificateStruct[updPosition].academy = _academy;
                certificateStruct[updPosition].course = _course;
                certificateStruct[updPosition].learner = _learner;
                certificateStruct[updPosition].name = _name;
                certificateStruct[updPosition].subject = _subject;
                certificateStruct[updPosition].verified = _verified;
                certificateStruct[updPosition].score = _score;
                certificateStruct[updPosition].creator = _creator;
                certificateStruct[updPosition].expirationDate = _expirationDate;
            }
            CertificateUpdated(now);
            return true;
        }
        return false;
    }


    // Remove specific
    function deleteCertificateByIndex(
        uint _index
    )
        public
        returns (bool)
    {
        // check if the user of some of owner addresses is using this functionality
        require(relationalMapping[_index].isExisting);
        updPosition = relationalMapping[_index].index;
        require(certificateStruct[updPosition].learner == tx.origin || owner == tx.origin || osu == tx.origin);

        if (certificateStruct[updPosition].UID == _index) {
            if (updPosition >= certificateStruct.length) return false;
            delete certificateStruct[updPosition];
            delete relationalMapping[_index];
            CertificateDeleted(now);
            return true;
        }
        return false;
    }

    function certificateCounter() public constant returns (uint) {
        return certificateStruct.length;
    }


}
