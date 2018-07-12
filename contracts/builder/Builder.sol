pragma solidity ^0.4.23;

import "../math/SafeMath.sol";
import "../ownership/Ownable.sol";
import "../tokenParameters/TokenSettings.sol";

contract Builder is Ownable {
    using SafeMath for uint256;

    address beneficiary;
    uint256 buildingCostWei;

    event ContractCreated(address contractAddress, address beneficiaryAddress);

    constructor() {
        beneficiary = msg.sender;
        buildingCostWei = 1 * 10**17;
    }

    function processPayment() internal {
        beneficiary.transfer(buildingCostWei);
        if (msg.value > buildingCostWei)
            msg.sender.transfer(msg.value.sub(buildingCostWei));
    }

    function setBeneficiary(address _beneficiary) external onlyOwner {
        beneficiary = _beneficiary;
    }

    function setBuildingCost(uint256 _buildingCostWei) external onlyOwner {
        buildingCostWei = _buildingCostWei;
    }

    function () payable public {
        beneficiary.transfer(msg.value);
    }

    function () {

    }
}
