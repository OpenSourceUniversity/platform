// Package certificates
let CertificateStorage = artifacts.require("./certificates/CertificateStorage.sol");
let FactoryCertificate = artifacts.require("./certificates/FactoryCertificate.sol");
let MegaFactoryCertificate = artifacts.require("./certificates/MegaFactoryCertificate.sol");

// Package users
let UsersStorage = artifacts.require("./users/UsersStorage.sol");
let User = artifacts.require("./users/User.sol");
let UsersProxy = artifacts.require("./users/UsersProxy.sol");
let FactoryUsers = artifacts.require("./users/FactoryUsers.sol");
let MegaFactoryUsers = artifacts.require("./users/MegaFactoryUsers.sol");


// Package Courses&Degrees
let Course = artifacts.require("./courses/Course.sol");
let CourseLearners = artifacts.require("./courses/CourseLearners.sol");
let CoursesProxy = artifacts.require("./courses/CoursesProxy.sol");
let CoursesStorage = artifacts.require("./courses/CoursesStorage.sol");
let FactoryCourses = artifacts.require("./courses/FactoryCourses.sol");
let MegaFactoryCourses = artifacts.require("./courses/MegaFactoryCourses.sol");

// Package Authorities
let AuthorityStorage = artifacts.require("./authorities/AuthorityStorage.sol");


module.exports = function(deployer) {
  /* Certificates */
  deployer.deploy(CertificateStorage,
      web3.eth.accounts[0],
      web3.eth.accounts[1],
      0,
      100000
  );
  deployer.deploy(FactoryCertificate,
      web3.eth.accounts[0],
      web3.eth.accounts[1]
  );
  deployer.deploy(MegaFactoryCertificate,
      web3.eth.accounts[0],
      web3.eth.accounts[1]
  );

  /* Courses */
  deployer.deploy(Course,
      web3.eth.accounts[0],
      web3.eth.accounts[1]
  );

  /* Courses Storage */
  deployer.deploy(CoursesStorage,
    web3.eth.accounts[0],
    web3.eth.accounts[1]
  );

  /* Authorities */
  deployer.deploy(AuthorityStorage,
      web3.eth.accounts[0],
      web3.eth.accounts[1]
  );

};
