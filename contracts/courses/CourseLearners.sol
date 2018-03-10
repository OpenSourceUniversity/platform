pragma solidity ^0.4.15;


contract CourseLearners {
    event NewParticipant(address courseAddress, address courseLearnersAddress, uint NrOfParticipants, uint NrOfGraduated, uint upon_creation);
    event NewGraduated(address courseAddress, address courseLearnersAddress, uint NrOfParticipants, uint NrOfGraduated, uint upon_creation);

    // Ownership
    address public owner;
    address public osu;
    address public issuer;

    // Course
    address public courseAddress;

    // Learners who still learning following course
    address[] public participants;
    uint[] public participantsDates;

    // Learners who already took followign course
    address[] public graduated;
    uint[] public graduatedDate;

    // Increments
    uint iParticipants;
    uint iGraduated;

    // Store all participants and graduated
    // address of the learner
    // bool is 'true' if learner participate or graduated this course
    // if learner cancel his participation in this course is 'false'
    mapping (address => bool) public allJoinedLearners;

    // Constructor
    function CourseLearners (
        address _owner,
        address _osu,
        address _courseAddress
    ) public {
        owner = _owner;
        osu = _osu;
        issuer = tx.origin;
        courseAddress = _courseAddress;
        iParticipants=0;
        iGraduated=0;
    }


    function getParticipantsCount() public constant returns (uint) {
        return participants.length;
    }

    function getAllParticipants() public constant returns (address[], uint[]) {
        require(participants.length > 0);
        return (participants, participantsDates);
    }

    function getParticipantByIndex(
        uint _index
    )
        public
        constant
        returns (address, uint)
    {
        require(_index < participants.length && _index < participantsDates.length);
        return (participants[_index], participantsDates[_index]);
    }

    // Only participant can join to a course via Course contract
    function setParticipant() public returns (bool) {
        require(courseAddress == msg.sender);
        require(allJoinedLearners[tx.origin] != true);
        // Recover
        if (participants.length != participantsDates.length) {
            participants.length = iParticipants;
            participantsDates.length = iParticipants;
        }
        participants.length++;
        participantsDates.length = participants.length;
        participants[participants.length-1] = tx.origin;
        participantsDates[participantsDates.length-1] = now;
        allJoinedLearners[tx.origin] = true;
        iParticipants = participants.length;
        return true;
    }

    // Delete participant
    // Deletion of participant can be done via Course contract
    function deleteParticipant(
        address _participantAddress
    )
        public
        returns (bool)
    {
        require(courseAddress == msg.sender);
        require(_participantAddress == tx.origin || owner == tx.origin || osu == tx.origin);
        // Recover
        if (participants.length != participantsDates.length) {
            participants.length = iParticipants;
            participantsDates.length = iParticipants;
        }
        uint[] memory i = new uint[](1);
        i[0] = 0;
        for (i[0] = 0; i[0] < iParticipants; i[0]++) {
            if (participants[i[0]] == _participantAddress) {
                participants[i[0]] = participants[participants.length-1];
                delete participants[participants.length-1];
                participants.length--;
                participantsDates[i[0]] = participantsDates[participantsDates.length-1];
                delete participantsDates[participantsDates.length-1];
                participantsDates.length--;
                iParticipants--;
                return true;
            }
        }
    }


    function getGraduatesCount() public constant returns (uint) {
        return graduated.length;
    }

    function getAllGraduates() public constant returns (address[], uint[]) {
        return (graduated, graduatedDate);
    }

    function getGraduateByIndex(
        uint _index
    )
        public
        constant
        returns (address, uint)
    {
        require(_index < graduated.length && _index < graduatedDate.length);
        return (graduated[_index], graduatedDate[_index]);
    }

    function setGraduate(
        address _graduateAddress
    )
        public
        returns (bool)
    {
        require(courseAddress == msg.sender);
        require(allJoinedLearners[tx.origin] == true && tx.origin == _graduateAddress);
        // Recover
        if (graduated.length != graduatedDate.length) {
            graduated.length = iGraduated;
            graduatedDate.length = iGraduated;
        }
        graduated.length++;
        graduatedDate.length = graduated.length;
        graduated[graduated.length-1] = _graduateAddress;
        graduatedDate[graduatedDate.length-1] = now;
        iGraduated = graduated.length;
        return true;
    }


    function compleateCourse(
        address _graduateAddress
    )
        public
        returns (bool)
    {
        require(courseAddress == msg.sender);
        require(allJoinedLearners[tx.origin] == true && tx.origin == _graduateAddress);
        deleteParticipant(_graduateAddress);
        setGraduate(_graduateAddress);
        return true;
    }

}
