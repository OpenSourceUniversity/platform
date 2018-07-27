

let AuthorizedAccess = artifacts.require("./contracts/authorities/AuthorizedAccess.sol");

module.exports = function(deployer) {
  deployer.deploy(AuthorizedAccess);
};
