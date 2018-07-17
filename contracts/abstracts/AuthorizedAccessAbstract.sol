pragma solidity ^0.4.24;

contract AuthorizedAccess {
    event Authorized(address sender, address issuer, bytes32 title, bytes hash);
    event Deathorized(address sender, address issuer, bytes32 title, bytes hash);

    struct AuthorityStruct {
        bool active;
        bytes32 academyTitle;
        bytes authorityHash;
    }

    mapping (address => AuthorityStruct) issuers;
    function authorizedCall() internal constant returns (bool);
    function authorize(address _issuer, bytes32 _title, bytes _hash) external returns (bool);
    function deauthorize(address _issuer) external returns (bool);
    function isAuthorized(address _issuer) external view returns (bool);
}
