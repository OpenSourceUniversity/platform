pragma solidity ^0.4.24;

import "../core/BasicCertificate.sol";
import "../core/RevokableCertificate.sol";
import "../core/TransfarableCertificate.sol";

/**
 * @title PublicDocument
 * @dev Anyone who knows the contract address can issue and revoke documents.
 */
contract PublicCertificate is BasicCertificate, RevokableCertificate, TransfarableCertificate {
    /**
     * @dev Returns certificate's information.
     * @dev Can be called by anyone who knows the contract address.
     */
    function getCertificate(address _course) public view returns (address, address, bytes, bytes32[5], bool) {
        return (certificates[_course].issuer,
                certificates[_course].recipient,
                certificates[_course].certificateHash,
                certificates[_course].skills,
                certificates[_course].verifiedSkills
                );
    }


    /**
     * @dev Verifies if the document belongs to the given recipient.
     */
    function verifyDocument(address recipient, bytes32 document) public constant returns (bool) {
        return recipient != address(0) && documents[document].recipient == recipient;
    }

    /**
     * @dev This contract accepts donations.
     */
    function () payable public {
        require(msg.value > 0);
        owner.transfer(msg.value);
    }

    /**
     * Forwards all funds to the owner account.
     */
    function widthraw() onlyOwner external {
        owner.transfer(this.balance);
    }
}
