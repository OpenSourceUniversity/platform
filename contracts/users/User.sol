pragma solidity ^0.4.15;


contract User {
    // Ownership
    address owner;
    address osu;

    // Authority
    address public authorityBusiness;            // Address of the organization which have the right to verify this business
    address public authorityAcademy;             // Address of the organization which have the right to verify this academy

    // general
    address public userOrigin;           // the verified address of specific user
    bool public isActive;                // 'true' if the user is active
    uint8 public rating;                 // current rating of the user
    bytes32[] public skills;             // all skills as a tags (if the user is learner, business or accademy)
    bytes32[2] public title;             // general title for every user
    address[] public connectedUsers;     // users connected with this particular user
    bytes32 public industry;             // industry sector; academy -> like university of science; learner -> the sector of employeement)

    // learner
    bool public availability;            // user will be reachable and will request notifications (for example businesses interested of his profile etc.)
    address[] public addrCourses;        // list of courses to which the user has participated
    bool public isMale;                  // only for persons (not take into account if the user is institution)

    // business
    bool public verifiedBusiness;        // if the user is verified business
    uint public openPositions;         // if user is academy or business and it has open positions for lecturers, developers, physicians etc.
    bytes32[2] public companyName;       // name of the company

    // academy
    bool public verifiedAcademy;         // if the user is verified academy
    address[] public addrOwnedCourses;   // addresses of all created by the academy courses
    bytes32[2] public academyName;       // name of the academy

    // extra data into additional contract if needed
    address public additionalStorage;


    function User(address _osu) public {
        owner = msg.sender;
        osu = _osu;
        userOrigin = tx.origin;    // address from which the transactions has been initiated
        isActive = true;
    }

    // About general information
    function changeUserOrigin(address _newOrigin) public returns (bool) {
        require(userOrigin == tx.origin && isActive == true);
        userOrigin = _newOrigin;
        return true;
    }


    // Create new users (Learners, Business, Academy)
    function setUserData (
        uint8 _rating,
        bytes32[] _skills,
        bytes32[2] _title,
        bytes32 _industry,
        bool _availability,
        bool _isMale,
        uint _openPositions,
        bytes32[2] _companyName,
        bytes32[2] _academyName
    )
        public
        returns (bool)
    {
        require(userOrigin == tx.origin || osu == tx.origin || osu == msg.sender);
        require(isActive == true);
        return storeData(
            _rating,
            _skills,
            _title,
            _industry,
            _availability,
            _isMale,
            _openPositions,
            _companyName,
            _academyName
        );
    }


    // Adding users to these allowed to message to current user
    function addConnectedUsers(address[] _connectedUsers) public returns (bool) {
        require(userOrigin == tx.origin || osu == tx.origin || osu == msg.sender);
        require(isActive == true && _connectedUsers.length > 0);
        for (uint i=0; i < _connectedUsers.length; i++) {
            connectedUsers.push(_connectedUsers[i]);
        }
        return true;
    }


    // Delete users from these allowed to message to current user
    function deleteConnectedUsers(address[] _connectedUsers) public returns (bool) {
        require(userOrigin == tx.origin || osu == tx.origin || osu == msg.sender);
        require(isActive == true && _connectedUsers.length > 0);
        uint[] memory i = new uint[](1);
        i[0] = 0;
        uint[] memory j = new uint[](1);
        j[0] = 0;
        if (_connectedUsers.length == 1) {
            for (i[0] = 0; i[0] < connectedUsers.length; i[0]++) {
                if (connectedUsers[i[0]] == _connectedUsers[0]) {
                    connectedUsers[i[0]] = connectedUsers[connectedUsers.length-1];
                    delete connectedUsers[connectedUsers.length-1];
                    connectedUsers.length--;
                }
            }
        } else {
            uint[] memory counter = new uint[](1);
            counter[0] = _connectedUsers.length;
            for (i[0] = 0; i[0] < connectedUsers.length; i[0]++) {
                for (j[0] = 0; j[0] < _connectedUsers.length; j[0]++) {
                    if (connectedUsers[i[0]] == _connectedUsers[j[0]]) {
                        connectedUsers[i[0]] = connectedUsers[connectedUsers.length-1];
                        delete connectedUsers[connectedUsers.length-1];
                        connectedUsers.length--;
                        counter[0]--;
                        if (counter[0] == 0) {
                            return true;
                        }
                        break;
                    }
                }
            }
        }
    }

    // Internal function for string data
    function storeData(
        uint8 _rating,
        bytes32[] _skills,
        bytes32[2] _title,
        bytes32 _industry,
        bool _availability,
        bool _isMale,
        uint _openPositions,
        bytes32[2] _companyName,
        bytes32[2] _academyName
    )
        internal
        returns (bool)
    {
        rating = _rating;
        skills = _skills;
        title = _title;
        industry = _industry;
        availability = _availability;
        isMale = _isMale;
        openPositions = _openPositions;
        companyName = _companyName;
        academyName = _academyName;
        return true;
    }

    // Courses which are owned by the user
    function setOwnCourse(address[] _newCourses) public returns (bool) {
        require(userOrigin == tx.origin || osu == tx.origin || osu == msg.sender);
        require(isActive == true && _newCourses.length > 0);
        for (uint i = 0; i < _newCourses.length; i++) {
            addrOwnedCourses.push(_newCourses[i]);
        }
        return true;
    }

    // Delete own courses
    function deleteOwnCourse(address[] _courses) public returns (bool) {
        require(userOrigin == tx.origin || osu == tx.origin || osu == msg.sender);
        require(isActive == true && _courses.length > 0);
        uint[] memory i = new uint[](1);
        i[0] = 0;
        uint[] memory j = new uint[](1);
        j[0] = 0;
        if (_courses.length == 1) {
            for (i[0] = 0; i[0] < addrOwnedCourses.length; i[0]++) {
                if (addrOwnedCourses[i[0]] == _courses[0]) {
                    addrOwnedCourses[i[0]] = addrOwnedCourses[addrOwnedCourses.length-1];
                    delete addrOwnedCourses[addrOwnedCourses.length-1];
                    addrOwnedCourses.length--;
                    return true;
                }
            }
        } else {
            uint[] memory counter = new uint[](1);
            counter[0] = _courses.length;
            for (i[0] = 0; i[0] < addrOwnedCourses.length; i[0]++) {
                for (j[0] = 0; j[0] < _courses.length; j[0]++) {
                    if (addrOwnedCourses[i[0]] == _courses[j[0]]) {
                        addrOwnedCourses[i[0]] = addrOwnedCourses[addrOwnedCourses.length-1];
                        delete addrOwnedCourses[addrOwnedCourses.length-1];
                        addrOwnedCourses.length--;
                        counter[0]--;
                        if (counter[0] == 0) {
                            return true;
                        }
                        break;
                    }
                }
            }
        }
    }


    // When user join to a new course (if in progress or finished)
    function joinCourse(address[] _newCourse) public returns (bool) {
        require(userOrigin == tx.origin || osu == tx.origin || osu == msg.sender);
        require(isActive == true && _newCourse.length > 0);
        for (uint i = 0; i < _newCourse.length; i++) {
            addrCourses.push(_newCourse[i]);
        }
        return true;
    }


    // delete courses (which are in progress or done)
    function terminateCourseParticipation(address[] _courses) public returns (bool) {
      require(userOrigin == tx.origin || osu == tx.origin || osu == msg.sender);
      require(isActive == true && _courses.length > 0);
      uint[] memory i = new uint[](1);
      i[0] = 0;
      uint[] memory j = new uint[](1);
      j[0] = 0;
      if (_courses.length == 1) {
          for (i[0] = 0; i[0] < addrCourses.length; i[0]++) {
              if (addrCourses[i[0]] == _courses[0]) {
                  addrCourses[i[0]] = addrCourses[addrCourses.length-1];
                  delete addrCourses[addrCourses.length-1];
                  addrCourses.length--;
                  return true;
              }
          }
      } else {
          uint[] memory counter = new uint[](1);
          counter[0] = _courses.length;
          for (i[0] = 0; i[0] < addrCourses.length; i[0]++) {
              for (j[0] = 0; j[0] < _courses.length; j[0]++) {
                  if (addrCourses[i[0]] == _courses[j[0]]) {
                      addrCourses[i[0]] = addrCourses[addrCourses.length-1];
                      delete addrCourses[addrCourses.length-1];
                      addrCourses.length--;
                      counter[0]--;
                      if (counter[0] == 0) {
                          return true;
                      }
                      break;
                  }
              }
          }
      }
    }

    // Set address of the organization which can verify this business
    function setVerificationOfBusiness(bool _verifiedBusiness) public returns (bool) {
        require(authorityBusiness != address(0));
        require(authorityBusiness == tx.origin || authorityBusiness == msg.sender);
        verifiedBusiness = _verifiedBusiness;
        return verifiedBusiness;
    }

    // Set address of the organization which can verify this academy
    function setVerificationOfAcademy(bool _verifiedAcademy) public returns (bool) {
        require(authorityAcademy != address(0));
        require(authorityAcademy == tx.origin || authorityAcademy == msg.sender);
        verifiedAcademy = _verifiedAcademy;
        return verifiedAcademy;
    }

    // Set address of the organization which can verify this business
    function setAuthorityForBusiness(address _authorityBusiness) public returns (address) {
        require(osu == tx.origin || osu == msg.sender);
        authorityBusiness = _authorityBusiness;
        return authorityBusiness;
    }

    // Set address of the organization which can verify this academy
    function setAuthorityForAcademy(address _authorityAcademy) public returns (address) {
        require(osu == tx.origin || osu == msg.sender);
        authorityAcademy = _authorityAcademy;
        return authorityAcademy;
    }

    // Activating this user again but all previous information has been lost
    // during deprecation process
    function setActive() public returns (bool) {
        require(osu == tx.origin || osu == msg.sender);
        isActive = true;
    }

    // Deprecate the smart contract
    function deprecate() public returns (bool) {
        require(userOrigin == tx.origin || osu == msg.sender || osu == tx.origin);
        // dummy data for erasing previous once
        bytes32[] memory tempSkills = new bytes32[](1);
        bytes32[2] memory tempTitle;
        address[] memory tempConnectedUsers = new address[](1);
        address[] memory tempAddrCourses = new address[](1);
        bytes32[2] memory tempCompanyName;
        address[] memory tempAddrOwnedCourses = new address[](1);
        bytes32[2] memory tempAcademyName;

        // erase
        rating = 0;
        skills = tempSkills;
        title = tempTitle;
        connectedUsers = tempConnectedUsers;
        industry = "";
        availability = false;
        addrCourses = tempAddrCourses;
        isMale = false;
        verifiedBusiness = false;
        openPositions = 0;
        companyName = tempCompanyName;
        verifiedAcademy = false;
        addrOwnedCourses = tempAddrOwnedCourses;
        academyName = tempAcademyName;
        isActive = false;
        return isActive;
    }



}
