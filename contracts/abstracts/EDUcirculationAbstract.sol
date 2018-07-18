pragma solidity ^0.4.24;

contract EDUcirculation {
  function getFee(address _initiator) public returns (uint256 inEDU, uint256 inETH);
  function getWalletFees() public returns (address);
}
