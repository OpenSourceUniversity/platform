pragma solidity ^0.4.24;

/**
 * @title TokenSettings
 * @dev The TokenSettings contract will update the general EDU token parameters
 *      related to token circulation and the specific purpose it has.
 */

import "../math/SafeMath.sol";
import "../ownership/Ownable.sol";

contract TokenSettings is Ownable {
    using SafeMath for uint256;

    struct CustomerPreferencesStruct {
        bool allowance;
        uint256 customFee;
    }

    address public owner;
    address public tokenContractAddress;
    uint256 public feeInEDU;
    mapping (address => CustomerPreferencesStruct) public customersWithPreferences;

    /**
    * @dev Events related to EDU token circulation settings on the platform
    */
    event TokenSettingsOwnerChanged(address indexed ownerOLD, address indexed ownerNEW);
    event TokenAddressChanged(address indexed tokenAddress);
    event TokenFeeChanged(uint256 feeInEDUValue);
    event SpecialCustomerAdded(address indexed customerAddress, uint256 preferenceFee);
    event SpecialCustomerFeeUpdate(address indexed customerAddress, uint256 preferenceFee);
    event SpecialCustomerRemoved(address indexed customerAddress);

    /**
    * @dev The Ownable constructor sets the original `owner` of the contract to the sender account.
    */
    constructor() {
        owner = msg.sender;
        tokenContractAddress = 0x2A22e5cCA00a3D63308fa39f29202eB1b39eEf52;
        feeInEDU = 10 * 10**18;
    }


    function setCustomFee(address customer, uint256 customFee) public onlyOwner {
        require(customer == address(0));
        customersWithPreferences[customer].allowance = true;
        customersWithPreferences[customer].customFee = customFee;
    }

    function removeCustomFee(address customer) public onlyOwner {
        require(customer == address(0));
        customersWithPreferences[customer].allowance = false;
    }

    /**
    * @dev Set token address
    */
    function changeTokenContractAddress(address newTokenContractAddress) public onlyOwner returns(address) {
        tokenContractAddress = newTokenContractAddress;
        emit TokenAddressChanged(tokenContractAddress);
        return tokenContractAddress;
    }

}
