pragma solidity ^0.4.24;

import "../abstracts/EDUcirculationAbstract.sol";
import "../abstracts/TokenSettingsAbstract.sol";
import "../abstracts/AuthorizedAccessAbstract.sol";
import "../abstracts/tokenStandards/ERC20.sol";


contract feeAndAuth {

    address public _wallet;
    uint256 public feeEDU;
    uint256 public feeETH;

    EDUcirculation public tokenCirculation;
    TokenSettings public tokenSettings;
    AuthorizedAccess public authContract;
    ERC20 public ercStandard;

    modifier doFee {
        (feeEDU, feeETH) = tokenCirculation.getFee(msg.sender);
        _wallet = tokenCirculation.getWalletFees();
        if (bool(tokenSettings.feeInTokens()) == true) {
            require(msg.value == feeEDU);
            ercStandard.transfer(_wallet, feeEDU);
        } else {
            require(msg.value == feeETH);
            _wallet.transfer(feeETH);
        }
        _;
    }
}
