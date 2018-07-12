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
    event TokenAddressChanged(address indexed tokenAddress);
    event TokenFeeChanged(uint256 feeInEDUValue);
    event CustomFeeSet(address indexed customerAddress, uint256 preferenceFee);
    event CustomFeeRemoved(address indexed customerAddress);

    /**
    * @dev The Ownable constructor sets the original `owner` of the contract to the sender account.
    */
    constructor() {
        owner = msg.sender;
        tokenContractAddress = 0x2A22e5cCA00a3D63308fa39f29202eB1b39eEf52;
        feeInEDU = 10 * 10**18;
    }

    /**
    * @dev Add or update custom fee
    */
    function setCustomFee(address customer, uint256 customFee) public onlyOwner {
        require(customer == address(0));
        customersWithPreferences[customer].allowance = true;
        customersWithPreferences[customer].customFee = customFee;
        emit CustomFeeSet(customer, customersWithPreferences[customer].customFee);
    }

    /**
    * @dev Remove custome fee
    */
    function removeCustomFee(address customer) public onlyOwner {
        require(customer == address(0));
        customersWithPreferences[customer].allowance = false;
        emit CustomFeeRemoved(customer);
    }

    /**
    * @dev Set token address
    */
    function changeTokenContractAddress(address newTokenContractAddress) public onlyOwner returns(address) {
        tokenContractAddress = newTokenContractAddress;
        emit TokenAddressChanged(tokenContractAddress);
        return tokenContractAddress;
    }

    /**
    * @dev Set token address
    */
    function setGeneralTokenFee(uint256 _tokenFee) public onlyOwner {
        feeInEDU = _tokenFee;
        emit TokenFeeChanged(feeInEDU);
    }

}
