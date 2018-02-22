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
         return certificateStorage.addCertificate(academy, course, learner, ['test', 'test2'], ['test', 'test2'], 2, 0)
         .then(function(result) {
            assert.equal(Boolean(result), true, "Test if the new contract is stored successfully");
         }).then(function () {
           return certificateStorage.certificateCounter.call();
         }).then(function (result) {
           assert.equal(result.toNumber(), 1, "Test that the counter of stored certificates is working properly ");
         }).then(function () {
           return certificateStorage.addCertificate(web3.eth.accounts[5], course, web3.eth.accounts[6], ['title[0]_second', 'title[1]_second'], ['subject[0]_second', 'subject[1]_second'], 2, 0);
         }).then(function (result) {
           assert.equal(Boolean(result), true, "Test if the second contract is stored successfully");
         }).then(function () {
           return certificateStorage.certificateCounter.call();
         }).then(function (result) {
           assert.equal(result.toNumber(), 2, "Testing that number of certificates increment correctly");
         }).then(function () {
           return certificateStorage.certificateCounter.call();
         });
    });

    it("Retrieving information from smart contract", function() {
        return certificateStorage.getCertificateAddressesByIndex(0)
        .then(function(result) {
          assert.equal(result[0], academy, "Verify that retrieved address of the academy stored in first certificate is as expected");
          assert.equal(result[1], course, "Verify that retrieved address of the course stored in first certificate is as expected");
          assert.equal(result[2], learner, "Verify that retrieved address of the learner stored in first certificate is as expected");
          assert.equal(result[3], web3.eth.accounts[0], "Verify that retrieved address of the author stored in first certificate is as expected");
        });
    });

    // it("EDU token should return contribution states", function() {
    //   return certificateStorage.updateCertificateByIndex(0, academy, course, learner, ['test', 'test2'], web3.eth.accounts[7], web3.eth.accounts[8], web3.eth.accounts[9], ['test', 'test3'], ['sub', 'ject'], 2, true)
    //   .then(function(result){
    //     assert.equal(Boolean(result), true, "Result after changing the contribution flag to 'false' successful!");
    //     // assert.equal(Boolean(edu_token.getAllowContributionFlag()), false, "Result after comparing get and set methods of the additional contribution flag!");
    //   });
    // });




    //
    //


    // it("Verify already stored certificates into the blockchain", function() {
    //     return certificateStorage.updateCertificateByIndex(
    //       0,
    //       academy,
    //       course,
    //       learner,
    //       ['test', 'test2'],
    //       web3.eth.accounts[7],
    //       web3.eth.accounts[8],
    //       web3.eth.accounts[9],
    //       ['test', 'test3'],
    //       ['sub', 'ject'],
    //       2,
    //       true
    //     )
    //     .then(function(result) {
    //         assert.equal(Boolean(result), true);
    //     })
    //     .then(function(result) {
    //         assert.equal(Boolean(result), true);
    //     });
    // });


    //
    // it("Adding Certificates", function() {
    //     return certificateStorage.addCertificate.call(academy, course, learner, ['test', 'test2'], ['test', 'test2'], 2, true)
    //     .then(function(result) {
    //         assert.equal(result, true);
    //         return certificateStorage.updateCertificateByIndex.call(1, academy, course, learner, ['test', 'test2'], web3.eth.accounts[7], web3.eth.accounts[8], web3.eth.accounts[9], ['test', 'test3'], ['sub', 'ject'], 2, true)
    //         .then(function(result_data) {
    //           assert.equal(result_data, false);
    //         })
    //     })
    //
    // });



});
