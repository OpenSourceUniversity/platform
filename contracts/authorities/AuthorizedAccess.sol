pragma solidity ^0.4.24;

import "../ownership/Ownable.sol";

/**
 * @title AuthorizedAccess
 * @dev This contract allows to organise a permission based access.
 */
contract AuthorizedAccess is Ownable {
    event AuthorizedIssuer(address sender, address issuer, bytes32 title, bytes hash);
    event Deathorized(address sender, address issuer, bytes32 title, bytes hash);

    struct AuthorityStruct {
        bool active;
        bytes32 academyTitle;
        bytes authorityHash;
    }
    // Address and hash from IPFS storage of the documents related to
    // legalizing the institution as an academy
    mapping (address => AuthorityStruct) issuers;
    mapping (address => bool) managers;
    mapping (address => bool) administrators;

    /**
     * @dev Throws if called by any account other than the athorized issuer.
     * @notice Owner is not authorized by default.
    */
    function authorizedCall() internal constant returns (bool) {
        require(this.isAuthorized(msg.sender));
        return true;
    }

    /**
     * @dev Authorizes a new issuer (trusted ethereum address) to issue and revoke documents.
     */
    function authorizeIssuer(address _issuer, bytes32 _title, bytes _hash) onlyOwner external returns (bool) {
        issuers[_issuer].active = true;
        issuers[_issuer].academyTitle = _title;
        issuers[_issuer].authorityHash = _hash;
        emit AuthorizedIssuer(msg.sender, _issuer, _title, _hash);
        return true;
    }

    /**
     * @dev Deauthorizes existing issuer.
     */
    function deauthorize(address _issuer) onlyOwner external returns (bool) {
        issuers[_issuer].active = false;
        emit Deathorized(msg.sender, _issuer, issuers[_issuer].academyTitle, issuers[_issuer].authorityHash);
        return true;
    }

    /**
     * Indicates whether issuer has been authorized.
     */
    function isAuthorized(address _issuer) external view returns (bool) {
        return issuers[_issuer].active;
    }

    /**
     * @dev Authorizes a new manager
     */
    function authorizeManager(address[] _managers, bool[] _values) onlyOwner external returns (uint256) {
        uint256 i = 0;
        while (i < _managers.length) {
            managers[_managers[i]] = _values[i];
            i += 1;
        }
        return(i);
    }

    /**
     * Indicates whether manager has been authorized.
     */
    function isManager(address _manager) external view returns (bool) {
        return managers[_manager];
    }


    /**
     * @dev Authorizes a new administrator
     */
    function authorizeAdministrator(address[] _administrators, bool[] _values) onlyOwner external returns (uint256) {
        uint256 i = 0;
        while (i < _administrators.length) {
            administrators[_administrators[i]] = _values[i];
            i += 1;
        }
        return(i);
    }

    /**
     * Indicates whether administrator has been authorized.
     */
    function isAdministrator(address _administrator) external view returns (bool) {
        return administrators[_administrator];
    }



}
