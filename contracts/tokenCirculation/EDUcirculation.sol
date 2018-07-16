pragma solidity ^0.4.24;

import "../math/SafeMath.sol";
import "../tokenParameters/TokenSettings.sol";
import "../tokenStandard/ERC20.sol";

/**
 * @title Token Circulation
 * @dev Manage all circulation fees related to blockchain functionality
 */
contract EDUcirculation is TokenSettings, ERC20 {
    using SafeMath for uint256;

    modifier doPlatformFee(address _initiator, uint256 _valueEDU = feeInEDU, uint256 _valueETH = feeInETH) {
        if (customersWithPreferences[_initiator].allowance) {
            // Customers with preferential price
            require(ERC20(tokenContractAddress).balanceOf(_initiator) >= customersWithPreferences[_initiator].customFeeInEDU);
            require(msg.value >= customersWithPreferences[_initiator].customFeeInETH);
            walletForFees.transfer(customersWithPreferences[_initiator].customFeeInETH);
            ERC20(tokenContractAddress).transfer(walletForFees, customersWithPreferences[_initiator].customFeeInEDU);
        } else if (ERC20(tokenContractAddress).balanceOf(_initiator) >= _valueEDU) {
            // Without platform fee (customer has enough EDU tokens)
            ERC20(tokenContractAddress).transfer(walletForFees, customersWithPreferences[_initiator].customFeeInEDU);
        } else {
            // With standart platform fee
            require(msg.value >= _valueETH);
            walletForFees.transfer(_valueETH);
        }
        _;
    }


}
