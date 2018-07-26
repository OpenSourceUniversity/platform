
let BasicCertificate = artifacts.require("./contracts/certificates/BasicCertificate.sol");

module.exports = function(deployer) {
  deployer.deploy(BasicCertificate, '0x45f3918f17ae528c6722168a53ea7584784cb946', '0x942cab05d4cfd643ab1f9b31b4fab95efb13e93e');
};
