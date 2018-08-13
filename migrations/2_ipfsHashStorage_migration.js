const VerificationStorage = artifacts.require('./contracts/VerificationStorage.sol');

module.exports = function(deployer) {
   deployer.deploy(VerificationStorage);
};
