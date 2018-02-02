var CertificateStorage = artifacts.require("./certificates/CertificateStorage.sol");
var FactoryCertificate = artifacts.require("./certificates/FactoryCertificate.sol");
var MegaFactoryCertificate = artifacts.require("./certificates/MegaFactoryCertificate.sol");

var UsersStorage = artifacts.require("./users/UsersStorage.sol");
var User = artifacts.require("./users/User.sol");
var UsersProxy = artifacts.require("./users/UsersProxy.sol");
var FactoryUsers = artifacts.require("./users/FactoryUsers.sol");
var MegaFactoryUsers = artifacts.require("./users/MegaFactoryUsers.sol");

module.exports = function(deployer) {
    deployer.deploy(CertificateStorage,
        web3.eth.accounts[0],
        web3.eth.accounts[1]
    );
    deployer.deploy(FactoryCertificate,
        web3.eth.accounts[0]
    );
    deployer.deploy(MegaFactoryCertificate,
        web3.eth.accounts[0],
        web3.eth.accounts[1]
    );
};
