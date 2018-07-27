
let EDUcirculation = artifacts.require("./contracts/tokenCirculation/EDUcirculation.sol");

module.exports = function(deployer) {
  deployer.deploy(EDUcirculation);
};
