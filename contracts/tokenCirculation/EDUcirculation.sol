pragma solidity ^0.4.24;

import "../tokenParameters/TokenSettings.sol";
import "../abstracts/tokenStandards/ERC20.sol";

/**
 * @title Token Circulation
 * @dev Manage all circulation fees related to blockchain functionality
 */
contract EDUcirculation is TokenSettings {
    using SafeMath for uint256;

    function getFee(address _initiator) payable public returns (uint256, uint256) {
      /* if (customersWithPreferences[_initiator].allowance) {
          // Customers with preferential price
          return (customersWithPreferences[_initiator].customFeeInEDU, customersWithPreferences[_initiator].customFeeInETH);
      } else if (ERC20(tokenContractAddress).balanceOf(_initiator) >= feeInEDU) {
          // Without platform fee (customer has enough EDU tokens)
          return (feeInEDU, 0.0);
      } else {
          // With standart platform fee
          return (0.0, feeInETH);
      } */
      return (200, 3000);
    }

    function getWalletFees() public view returns (address) {
        return address(walletForFees);
    }



}
