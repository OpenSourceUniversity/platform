var TestCertificateStorage = artifacts.require("./certificates/CertificateStorage.sol");

contract('TestCertificateStorage', function(accounts) {
    var certificateStorage;

    var owner = web3.eth.accounts[0];
    var osu = web3.eth.accounts[1];

    var academy = web3.eth.accounts[2];
    var business = web3.eth.accounts[3];
    var learner = web3.eth.accounts[4];
    var course = web3.eth.accounts[5];

    it("Deploiment and initial information about the ownership", function() {
      return TestCertificateStorage.deployed(owner, osu).then(function(instance){
        certificateStorage = instance;
        return certificateStorage.owner.call();
        // assert.equal(Boolean(edu_token.getAllowContributionFlag()), false, "Result after comparing get and set methods of the additional contribution flag!");
      }).then(function (result) {
        assert.equal(result, web3.eth.accounts[0], "Owner address is as expected");
      }).then(function () {
        return certificateStorage.osu.call();
      }).then(function (result) {
        assert.equal(result, web3.eth.accounts[1], "OSUni address is as expected");
      });
    });


    it("Adding new Certificates into the smart contract", function() {
         return certificateStorage.addCertificate(academy, course, learner, ['test', 'test2'], ['test', 'test2'], true, 2, 0)
         .then(function(result) {
            assert.equal(Boolean(result), true, "Test if the new contract is stored successfully");
         }).then(function () {
           return certificateStorage.certificateCounter.call();
         }).then(function (result) {
           assert.equal(result.toNumber(), 1, "Test that the counter of stored certificates is working properly ");
         }).then(function () {
           return certificateStorage.addCertificate(web3.eth.accounts[5], course, web3.eth.accounts[6], ['title[0]_second', 'title[1]_second'], ['subject[0]_second', 'subject[1]_second'], false, 2, 0);
         }).then(function (result) {
           assert.equal(Boolean(result), true, "Test if the second contract is stored successfully");
         }).then(function () {
           return certificateStorage.certificateCounter.call();
         }).then(function (result) {
           assert.equal(result.toNumber(), 2, "Testing that number of certificates increment correctly");
         })
         .then(function () {
           return certificateStorage.addCertificate(academy, course, learner, ['thierdtest_1', 'thierdtest_2'], ['thirdSubsject_1', 'thirdSubsject_2'], true, 2, 0, {from: academy});
         })
         .then(function (result) {
           assert.equal(Boolean(result), true, "Test if the third contract is stored successfully");
         })
         .then(function () {
           return certificateStorage.certificateCounter.call();
         })
         .then(function (result) {
           assert.equal(result.toNumber(), 3, "Testing that number of certificates increment correctly");
         });
    });

    it("Retrieving information from smart contract", function() {
        return certificateStorage.getCertificateAddressesByIndex(0)
        .then(function(result) {
          assert.equal(result[0], academy, "Verify that retrieved address of the academy stored in first certificate is as expected");
          assert.equal(result[1], course, "Verify that retrieved address of the course stored in first certificate is as expected");
          assert.equal(result[2], learner, "Verify that retrieved address of the learner stored in first certificate is as expected");
          assert.equal(result[3], web3.eth.accounts[0], "Verify that retrieved address of the author stored in first certificate is as expected");
        })
        .then(function() {
          return certificateStorage.getCertificateAddressesByIndex(1);
        })
        .then(function(result) {
          assert.equal(result[0], web3.eth.accounts[5], "Verify that retrieved address of the academy stored in second certificate is as expected");
          assert.equal(result[1], course, "Verify that retrieved address of the course stored in second certificate is as expected");
          assert.equal(result[2], web3.eth.accounts[6], "Verify that retrieved address of the learner stored in second certificate is as expected");
          assert.equal(result[3], web3.eth.accounts[0], "Verify that retrieved address of the author stored in second certificate is as expected");
        })
        .then(function() {
          return certificateStorage.getCertificateDataByIndex(0);
        })
        .then(function(result) {
          assert.equal(web3.toUtf8(result[0][0]), 'test', "Verify the first part of the name related to the first recorded certificate");
          assert.equal(web3.toUtf8(result[0][1]), 'test2', "Verify the second part of the name related to the first recorded certificate");
          assert.equal(web3.toUtf8(result[1][0]), 'test', "Verify the first part of the subject related to the first recorded certificate");
          assert.equal(web3.toUtf8(result[1][1]), 'test2', "Verify the second part of the subject related to the first recorded certificate");
          assert.equal(Boolean(result[2]), false, "Verification check of the first certificate");
          assert.equal(result[3].toNumber(), 2, "Score verification");
          assert.equal(result[4].toNumber(), 0, "Expiration date verification");
        })
        .then(function() {
          return certificateStorage.getCertificateDataByIndex(1);
        })
        .then(function(result) {
          assert.equal(web3.toUtf8(result[0][0]), 'title[0]_second', "Verify the first part of the name related to the second recorded certificate");
          assert.equal(web3.toUtf8(result[0][1]), 'title[1]_second', "Verify the second part of the name related to the second recorded certificate");
          assert.equal(web3.toUtf8(result[1][0]), 'subject[0]_second', "Verify the first part of the subject related to the second recorded certificate");
          assert.equal(web3.toUtf8(result[1][1]), 'subject[1]_second', "Verify the second part of the subject related to the second recorded certificate");
          assert.equal(Boolean(result[2]), false, "Verification check of the second certificate");
          assert.equal(result[3].toNumber(), 2, "Score verification");
          assert.equal(result[4].toNumber(), 0, "Expiration date verification");
        }).then(function() {
          return certificateStorage.getCertificateDataByIndex(2);
        })
        .then(function(result) {
          assert.equal(web3.toUtf8(result[0][0]), 'thierdtest_1', "Verify the first part of the name related to the second recorded certificate");
          assert.equal(web3.toUtf8(result[0][1]), 'thierdtest_2', "Verify the second part of the name related to the second recorded certificate");
          assert.equal(web3.toUtf8(result[1][0]), 'thirdSubsject_1', "Verify the first part of the subject related to the second recorded certificate");
          assert.equal(web3.toUtf8(result[1][1]), 'thirdSubsject_2', "Verify the second part of the subject related to the second recorded certificate");
          assert.equal(Boolean(result[2]), true, "Automatically verified certificate if it's issued by verified accademy");
          assert.equal(result[3].toNumber(), 2, "Score verification");
          assert.equal(result[4].toNumber(), 0, "Expiration date verification");
        });
    });


    it("Update certificates", function() {
        return certificateStorage.getCertificateAddressesByIndex(0)
        .then(function(result) {
          assert.equal(result[0], academy, "Verify that retrieved address of the academy stored in first certificate is as expected");
          assert.equal(result[1], course, "Verify that retrieved address of the course stored in first certificate is as expected");
          assert.equal(result[2], learner, "Verify that retrieved address of the learner stored in first certificate is as expected");
          assert.equal(result[3], web3.eth.accounts[0], "Verify that retrieved address of the author stored in first certificate is as expected");
        })
        .then(function() {
          return certificateStorage.getCertificateAddressesByIndex(1);
        })
        .then(function(result) {
          assert.equal(result[0], web3.eth.accounts[5], "Verify that retrieved address of the academy stored in second certificate is as expected");
          assert.equal(result[1], course, "Verify that retrieved address of the course stored in second certificate is as expected");
          assert.equal(result[2], web3.eth.accounts[6], "Verify that retrieved address of the learner stored in second certificate is as expected");
          assert.equal(result[3], web3.eth.accounts[0], "Verify that retrieved address of the author stored in second certificate is as expected");
        });

    });





});
