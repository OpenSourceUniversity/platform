pragma solidity ^0.4.15;


contract CourseLearners {
    // Ownership
    address owner;
    address osu;

    // Course
    address courseAddress;

    // Learners who still learning following course
    address[] public participants;
    uint[] public participantsDates;

    // Learners who already took followign course
    address[] public graduated;
    uint[] public graduatedDate;

    // Increments
    uint iParticipants;
    uint iGraduated;

    // Constructor
    function CourseLearners (address _owner, address _osu, address _courseAddress) public {
        owner = _owner;
        osu = _osu;
        courseAddress = _courseAddress;
        iParticipants=0;
        iGraduated=0;
    }


    function getParticipantsCount() public constant returns (uint) {
        return participants.length;
    }

    function getAllParticipants() public constant returns (address[], uint[]) {
        return (participants, participantsDates);
    }

    function getParticipant(uint _index) public constant returns (address, uint) {
        require(_index < participants.length && _index < participantsDates.length);
        return (participants[_index], participantsDates[_index]);
    }

    function setParticipant(address _participantAddress) public returns (bool) {
        require(courseAddress == msg.sender);
        if (participants.length != participantsDates.length) {
            participants.length = iParticipants;
            participantsDates.length = iParticipants;
        }
        participants.push(_participantAddress);
        participantsDates.push(now);
        iParticipants++;
        return true;
    }

    function deleteParticipant(address _participantAddress) public returns (bool) {
        require(courseAddress == msg.sender);
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

    function getGraduate(uint _index) public constant returns (address, uint) {
        require(_index < graduated.length && _index < graduatedDate.length);
        return (graduated[_index], graduatedDate[_index]);
    }

    function setGraduate(address _graduateAddress) public returns (bool) {
        require(courseAddress == msg.sender);
        if (graduated.length != graduatedDate.length) {
            graduated.length = iGraduated;
            graduatedDate.length = iGraduated;
        }
        graduated.push(_graduateAddress);
        graduatedDate.push(now);
        iGraduated++;
        return true;
    }

    function deleteGraduate(address _graduateAddress) public returns (bool) {
        require(courseAddress == msg.sender);
        if (graduated.length != graduatedDate.length) {
            graduated.length = iGraduated;
            graduatedDate.length = iGraduated;
        }
        uint[] memory i = new uint[](1);
        i[0] = 0;
        for (i[0] = 0; i[0] < iGraduated; i[0]++) {
            if (graduated[i[0]] == _graduateAddress) {
                graduated[i[0]] = graduated[graduated.length-1];
                delete graduated[graduated.length-1];
                graduated.length--;
                graduatedDate[i[0]] = graduatedDate[graduatedDate.length-1];
                delete graduatedDate[graduatedDate.length-1];
                graduatedDate.length--;
                iGraduated--;
                return true;
            }
        }
    }

    function compleateCourse(address _graduateAddress) public returns (bool) {
        require(courseAddress == msg.sender);
        deleteParticipant(_graduateAddress);
        setGraduate(_graduateAddress);
        return true;
    }

}
