
let ipfsHashStorage = artifacts.require("./contracts/ipfsHashStorage.sol");

module.exports = function(deployer) {
   deployer.deploy(ipfsHashStorage);
};
