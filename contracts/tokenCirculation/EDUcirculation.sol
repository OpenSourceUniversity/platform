pragma solidity ^0.4.24;

import "../tokenParameters/TokenSettings.sol";
import "../abstracts/tokenStandards/ERC20.sol";

/**
 * @title Token Circulation
 * @dev Manage all circulation fees related to blockchain functionality
 */
contract EDUcirculation is TokenSettings, ERC20 {
    using SafeMath for uint256;

    function getFee(address _initiator) public returns (uint256 inEDU, uint256 inETH) {
      if (customersWithPreferences[_initiator].allowance) {
          // Customers with preferential price
          return (customersWithPreferences[_initiator].customFeeInEDU, customersWithPreferences[_initiator].customFeeInETH);
      } else if (ERC20(tokenContractAddress).balanceOf(_initiator) >= feeInEDU) {
          // Without platform fee (customer has enough EDU tokens)
          return (feeInEDU, 0.0);
      } else {
          // With standart platform fee
          return (0.0, feeInETH);
      }
    }

    function getWalletFees() public returns (address) {
        return walletForFees;
    }


    /* function doPlatformFee(address _initiator) {
        if (customersWithPreferences[_initiator].allowance) {
            // Customers with preferential price
            require(ERC20(tokenContractAddress).balanceOf(_initiator) >= customersWithPreferences[_initiator].customFeeInEDU);
            require(msg.value >= customersWithPreferences[_initiator].customFeeInETH);
            walletForFees.transfer(customersWithPreferences[_initiator].customFeeInETH);
            ERC20(tokenContractAddress).transfer(walletForFees, customersWithPreferences[_initiator].customFeeInEDU);
        } else if (ERC20(tokenContractAddress).balanceOf(_initiator) >= feeInEDU) {
            // Without platform fee (customer has enough EDU tokens)
            ERC20(tokenContractAddress).transfer(walletForFees, feeInEDU);
        } else {
            // With standart platform fee
            require(msg.value >= feeInETH);
            walletForFees.transfer(feeInETH);
        }
    } */


}
