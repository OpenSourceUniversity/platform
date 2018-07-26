pragma solidity ^0.4.24;

contract TokenSettings {

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
    bool public feeInTokens;
    mapping (address => CustomerPreferencesStruct) public customersWithPreferences;

    event TokenAddressChanged(address indexed tokenAddress);
    event WalletChanged(address indexed walletAddress);
    event TokenFeeChanged(uint256 feeInEDUValue);
    event ETHFeeChanged(uint256 feeInETHValue);
    event CustomFeeSet(address indexed customerAddress, uint256 preferenceFeeEDU, uint256 preferenceFeeETH);
    event CustomFeeRemoved(address indexed customerAddress);

    function setCustomFee(address customer, uint256 customFeeEDU, uint256 customFeeETH) external {}
    function removeCustomFee(address customer) external {}
    function changeTokenContractAddress(address newTokenContractAddress) external returns(address) {}
    function changeWalletForFees(address newWallet) external returns(address) {}
    function setGeneralTokenFee(uint256 _tokenFee) external {}
    function setGeneralETHFee(uint256 _ethFee) external {}

}
