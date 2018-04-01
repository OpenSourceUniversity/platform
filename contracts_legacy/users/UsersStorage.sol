pragma solidity ^0.4.15;


contract UsersStorage {
    address public owner;
    address public osu;

    // Proxy
    address proxyAddress;

    // Origin
    address originator;

    struct UserPresentStruct {
        address userContract;         // address of the users smart contract
        bool verifiedAcademy;         // if the user is verified academy
        bool verifiedBusiness;        // if the user is verified business
        uint8 rating;                 // current rating of the user
        bool availability;            // when the user is available for reaching out
        bytes32[] skills;             // all skills as a tags (if the user is learner, business or accademy)
        uint24 openPositions;         // if user is academy or business and it has open positions for lecturers, developers, physicians etc.
        bytes32 industry;             // if user is (business -> industry sector; academy -> like university of science; learner -> the sector of employeement)
        bool isEmployed;              // if user is employee, freelance or unemployed
        bool isMale;                  // only for persons (not take into account if the user is institution)
        bool isExisting;              // standard way to check if some record really exists in the table (if it's recorded will give 'true')
    }

    // address -> uPort address which is registered in the platform (NOT the Smart Contract of )
    mapping (address => UserPresentStruct) public usersInformation;

    // Ownership of the contract
    modifier ownerOrOSU {
        if (msg.sender != owner && msg.sender != osu)
            revert();
        else
            _;
    }

    // Constructor
    function UsersStorage(address _owner, address _osu) public {
        owner = _owner;
        osu = _osu;
    }


    // Set record
    function setUserViewRecord(
        address _userContract,
        bool _availability,            // when the user is available for reaching out
        bytes32[] _skills,             // all skills as a tags (if the user is learner, business or accademy)
        bytes32 _industry,             // if user is (business -> industry sector; academy -> like university of science; learner -> the sector of employeement)
        bool _isEmployed,              // if user is employee, freelance or unemployed
        bool _isMale
    )
        public
        returns (bool)
    {
        require(proxyAddress != address(0) && msg.sender == proxyAddress);
        originator = tx.origin;
        if (usersInformation[originator].isExisting) revert();      // Check if this record is already ex
        usersInformation[originator].userContract = _userContract;  // First it need to be created smart contract for the used and after that to call following finctionality with existing SC address
        usersInformation[originator].verifiedAcademy = false;
        usersInformation[originator].verifiedBusiness = false;
        usersInformation[originator].rating = 0;
        usersInformation[originator].availability = _availability;
        usersInformation[originator].skills = _skills;
        usersInformation[originator].openPositions = 0;
        usersInformation[originator].industry = _industry;
        usersInformation[originator].isEmployed = _isEmployed;
        usersInformation[originator].isMale = _isMale;
        usersInformation[originator].isExisting = true;
        return true;
    }

    // Get record
    function getUserViewRecord() public returns (address, bool, bool, uint8, bool, bytes32[], uint24, bytes32, bool, bool) {
        require(proxyAddress != address(0) && msg.sender == proxyAddress);
        originator = tx.origin;
        if (usersInformation[originator].isExisting) {
            return (usersInformation[originator].userContract,
                    usersInformation[originator].verifiedAcademy,
                    usersInformation[originator].verifiedBusiness,
                    usersInformation[originator].rating,
                    usersInformation[originator].availability,
                    usersInformation[originator].skills,
                    usersInformation[originator].openPositions,
                    usersInformation[originator].industry,
                    usersInformation[originator].isEmployed,
                    usersInformation[originator].isMale
                    );
        }
        bytes32[] memory tstBytes32Array = new bytes32[](1);
        return (address(0), false, false, uint8(0), true, tstBytes32Array, uint24(0), '', false, false);
    }



    // Update record
    function updateUserViewRecord(
        address _userContract,
        bool _verifiedAcademy,         // if the user is verified academy
        bool _verifiedBusiness,        // if the user is verified business
        uint8 _rating,                 // current rating of the user
        bool _availability,            // when the user is available for reaching out
        bytes32[] _skills,             // all skills as a tags (if the user is learner, business or accademy)
        uint24 _openPositions,         // if user is academy or business and it has open positions for lecturers, developers, physicians etc.
        bytes32 _industry,             // if user is (business -> industry sector; academy -> like university of science; learner -> the sector of employeement)
        bool _isEmployed,              // if user is employee, freelance or unemployed
        bool _isMale
    )
        public
        returns (bool)
    {
        require(proxyAddress != address(0) && msg.sender == proxyAddress);
        originator = tx.origin;
        if (usersInformation[originator].isExisting) {
            usersInformation[originator].userContract = _userContract;
            usersInformation[originator].verifiedAcademy = _verifiedAcademy;
            usersInformation[originator].verifiedBusiness = _verifiedBusiness;
            usersInformation[originator].rating = _rating;
            usersInformation[originator].availability = _availability;
            usersInformation[originator].skills = _skills;
            usersInformation[originator].openPositions = _openPositions;
            usersInformation[originator].industry = _industry;
            usersInformation[originator].isEmployed = _isEmployed;
            usersInformation[originator].isMale = _isMale;
            return true;
        }
        return false;
    }


    // Delete record
    function deleteUserViewRecord() public returns (bool) {
        require(proxyAddress != address(0) && msg.sender == proxyAddress);
        originator = tx.origin;
        if (usersInformation[originator].isExisting) {
            usersInformation[originator].isExisting = false;
            return true;
        }
        return false;
    }

    function getProxyAddress() public ownerOrOSU constant returns (address) {
        return proxyAddress;
    }

    function setProxyAddress(address _proxyAddress) public ownerOrOSU returns (bool) {
        require(_proxyAddress != address(0));
        proxyAddress = _proxyAddress;
    }

    // function to convert address to bytes
    function toBytes(address a) public returns (bytes b) {
        assembly {
            let m := mload(0x40)
            mstore(add(m, 20), xor(0x140000000000000000000000000000000000000000, a))
            mstore(0x40, add(m, 52))
            b := m
       }
    }

}
