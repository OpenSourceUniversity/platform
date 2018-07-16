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
        uint256 customFeeInEDU;
        uint256 customFeeInETH;
    }

    address public owner;
    address public tokenContractAddress;
    uint256 public feeInEDU;
    uint256 public feeInETH;
    address public walletForFees;
    mapping (address => CustomerPreferencesStruct) public customersWithPreferences;

    /**
    * @dev Events related to EDU token circulation settings on the platform
    */
    event TokenAddressChanged(address indexed tokenAddress);
    event WalletChanged(address indexed walletAddress);
    event TokenFeeChanged(uint256 feeInEDUValue);
    event ETHFeeChanged(uint256 feeInETHValue);
    event CustomFeeSet(address indexed customerAddress, uint256 preferenceFee);
    event CustomFeeRemoved(address indexed customerAddress);

    /**
    * @dev The Ownable constructor sets the original `owner` of the contract to the sender account.
    */
    constructor() {
        owner = msg.sender;
        tokenContractAddress = 0x2A22e5cCA00a3D63308fa39f29202eB1b39eEf52;
        walletForFees = 0x269d55ef8acfdf0b83ccd08278ab440f87f9e9d8;
        feeInEDU = 10 * 10**18;
        feeInETH = 1 * 10**15;
    }

    /**
    * @dev Add or update custom fee
    */
    function setCustomFee(address customer, uint256 customFeeEDU, uint256 customFeeETH) onlyOwner external {
        require(customer == address(0));
        customersWithPreferences[customer].allowance = true;
        customersWithPreferences[customer].customFeeInEDU = customFeeEDU;
        customersWithPreferences[customer].customFeeInETH = customFeeETH;
        emit CustomFeeSet(customer, customersWithPreferences[customer].customFee);
    }

    /**
    * @dev Remove custome fee
    */
    function removeCustomFee(address customer) onlyOwner external {
        require(customer == address(0));
        customersWithPreferences[customer].allowance = false;
        emit CustomFeeRemoved(customer);
    }

    /**
    * @dev Set token address
    */
    function changeTokenContractAddress(address newTokenContractAddress) onlyOwner external returns(address) {
        tokenContractAddress = newTokenContractAddress;
        emit TokenAddressChanged(tokenContractAddress);
        return tokenContractAddress;
    }

    /**
    * @dev Set wallet for platform fees
    */
    function changeWalletForFees(address newWallet) onlyOwner external returns(address) {
        walletForFees = newWallet;
        emit WalletChanged(walletForFees);
        return walletForFees;
    }

    /**
    * @dev Set global fee in EDU tokens
    */
    function setGeneralTokenFee(uint256 _tokenFee) onlyOwner external {
        feeInEDU = _tokenFee;
        emit TokenFeeChanged(feeInEDU);
    }

    /**
    * @dev Set global fee in ETH for transactions without EDU tokens
    */
    function setGeneralETHFee(uint256 _ethFee) onlyOwner external {
        feeInETH = _ethFee;
        emit ETHFeeChanged(feeInETH);
    }

}
