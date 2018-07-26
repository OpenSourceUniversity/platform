pragma solidity ^0.4.24;

contract AuthorizedAccess {
    event AuthorizedIssuer(address sender, address issuer, bytes32 title, bytes hash);
    event Deathorized(address sender, address issuer, bytes32 title, bytes hash);

    struct AuthorityStruct {
        bool active;
        bytes32 academyTitle;
        bytes authorityHash;
    }

    mapping (address => AuthorityStruct) issuers;
    function authorizedCall() internal constant returns (bool) {}
    function authorize(address _issuer, bytes32 _title, bytes _hash) external returns (bool) {}
    function deauthorizeIssuer(address _issuer) external returns (bool) {}
    function isAuthorized(address _issuer) external view returns (bool) {}
    function authorizeManager(address[] _managers, bool[] _values) external returns (uint256) {}
    function isManager(address _manager) external view returns (bool) {}
    function authorizeAdministrator(address[] _administrators, bool[] _values) external returns (uint256) {}
    function isAdministrator(address _administrator) external view returns (bool) {}
}
