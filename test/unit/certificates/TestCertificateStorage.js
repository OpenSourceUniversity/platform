var TestCertificateStorage = artifacts.require("./certificates/CertificateStorage.sol");

contract('TestCertificateStorage', function(accounts) {
    var certificateStorage;

    var owner = web3.eth.accounts[0];
    var osu = web3.eth.accounts[1];

    var academy = web3.eth.accounts[2];
    var business = web3.eth.accounts[3];
    var learner = web3.eth.accounts[4];
    var course = web3.eth.accounts[5];

    it("Deploiment of the CertificatesStorage smart contarct", function() {
      return TestCertificateStorage.deployed(owner, osu, 0, 100000)
      .then(function(instance){
        certificateStorage = instance;
      })
    });

    it("Initial information about the ownership", function() {
      return certificateStorage.owner.call()
      .then(function (result) {
        assert.equal(result, web3.eth.accounts[0], "Owner address is as expected");
      })
      .then(function () {
        return certificateStorage.osu.call();
      })
      .then(function (result) {
        assert.equal(result, web3.eth.accounts[1], "OSUni address is as expected");
      });
    });


    it("Add first certificate into the CertificateStorage", function() {
        return certificateStorage.addCertificate(academy, course, learner, ['test', 'test2'], ['test', 'test2'], true, 2, 0)
        .then(function(result) {
            assert.equal(Boolean(result), true, "Test if the new contract is stored successfully");
        }).then(function () {
            return certificateStorage.certificateCounter.call();
        }).then(function (result) {
            assert.equal(result.toNumber(), 1, "Test that the counter of stored certificates is working properly ");
        })
    });

    it("Add second certificate into the CertificateStorage", function() {
        return certificateStorage.addCertificate(web3.eth.accounts[5], course, web3.eth.accounts[6], ['title[0]_second', 'title[1]_second'], ['subject[0]_second', 'subject[1]_second'], false, 2, 0, {from: web3.eth.accounts[5]})
        .then(function(result) {
            assert.equal(Boolean(result), true, "Test if the new contract is stored successfully");
        }).then(function () {
            return certificateStorage.certificateCounter.call();
        }).then(function (result) {
            assert.equal(result.toNumber(), 2, "Test that the counter of stored certificates is working properly ");
        })
    });


    it("Add third certificate into the CertificateStorage", function() {
        return certificateStorage.addCertificate(academy, course, learner, ['thierdtest_1', 'thierdtest_2'], ['thirdSubsject_1', 'thirdSubsject_2'], true, 3, 0, {from: academy})
        .then(function(result) {
            assert.equal(Boolean(result), true, "Test if the new contract is stored successfully");
        }).then(function () {
            return certificateStorage.certificateCounter.call();
        }).then(function (result) {
            assert.equal(result.toNumber(), 3, "Test that the counter of stored certificates is working properly ");
        })
    });


    it("Retrieve all information from first certificate", function() {
        return certificateStorage.getCertificateAddressesByIndex(0)
        .then(function(result) {
            assert.equal(result[0], academy);
            assert.equal(result[1], course);
            assert.equal(result[2], learner);
            assert.equal(result[3], web3.eth.accounts[0]);
        })
        .then(function() {
            return certificateStorage.getCertificateDataByIndex(0);
        })
        .then(function(result) {
            assert.equal(result[0].toNumber(), 0);
            assert.equal(web3.toUtf8(result[1][0]), 'test');
            assert.equal(web3.toUtf8(result[1][1]), 'test2');
            assert.equal(web3.toUtf8(result[2][0]), 'test');
            assert.equal(web3.toUtf8(result[2][1]), 'test2');
            assert.equal(Boolean(result[3]), false);
            assert.equal(result[4].toNumber(), 2);
            assert.equal(result[5].toNumber(), 0);
        })
    });

    it("Retrieve all information from second certificate", function() {
        return certificateStorage.getCertificateAddressesByIndex(1)
        .then(function(result) {
            assert.equal(result[0], web3.eth.accounts[5]);
            assert.equal(result[1], course);
            assert.equal(result[2], web3.eth.accounts[6]);
            assert.equal(result[3], web3.eth.accounts[5]);
        })
        .then(function() {
            return certificateStorage.getCertificateDataByIndex(1);
        })
        .then(function(result) {
            assert.equal(result[0].toNumber(), 1);
            assert.equal(web3.toUtf8(result[1][0]), 'title[0]_second');
            assert.equal(web3.toUtf8(result[1][1]), 'title[1]_second');
            assert.equal(web3.toUtf8(result[2][0]), 'subject[0]_second');
            assert.equal(web3.toUtf8(result[2][1]), 'subject[1]_second');
            assert.equal(Boolean(result[3]), false);
            assert.equal(result[4].toNumber(), 2);
            assert.equal(result[5].toNumber(), 0);
        })
    });


    it("Retrieve all information from third certificate", function() {
        return certificateStorage.getCertificateAddressesByIndex(2)
        .then(function(result) {
            assert.equal(result[0], academy);
            assert.equal(result[1], course);
            assert.equal(result[2], learner);
            assert.equal(result[3], academy);
        })
        .then(function() {
            return certificateStorage.getCertificateDataByIndex(2);
        })
        .then(function(result) {
            assert.equal(result[0].toNumber(), 2);
            assert.equal(web3.toUtf8(result[1][0]), 'thierdtest_1');
            assert.equal(web3.toUtf8(result[1][1]), 'thierdtest_2');
            assert.equal(web3.toUtf8(result[2][0]), 'thirdSubsject_1');
            assert.equal(web3.toUtf8(result[2][1]), 'thirdSubsject_2');
            assert.equal(Boolean(result[3]), true);
            assert.equal(result[4].toNumber(), 3);
            assert.equal(result[5].toNumber(), 0);
        })
    });


    it("Update first certificate as owner", function() {
        return certificateStorage.updateCertificateByIndex(
            0,
            web3.eth.accounts[7],
            web3.eth.accounts[8],
            web3.eth.accounts[9],
            ['edit_new', 'edit_new2'],
            ['edit_subjec', 'edit_ect2'],
            true,
            7,
            web3.eth.accounts[0],
            0
        )
        .then(function(result) {
            assert.equal(Boolean(result), true);
        })
        .then(function() {
            return certificateStorage.getCertificateAddressesByIndex(0);
        })
        .then(function(result) {
            assert.equal(result[0], web3.eth.accounts[7]);
            assert.equal(result[1], web3.eth.accounts[8]);
            assert.equal(result[2], web3.eth.accounts[9]);
            assert.equal(result[3], web3.eth.accounts[0]);
        })
        .then(function() {
            return certificateStorage.getCertificateDataByIndex(0);
        })
        .then(function(result) {
            assert.equal(result[0].toNumber(), 0);
            assert.equal(web3.toUtf8(result[1][0]), 'edit_new');
            assert.equal(web3.toUtf8(result[1][1]), 'edit_new2');
            assert.equal(web3.toUtf8(result[2][0]), 'edit_subjec');
            assert.equal(web3.toUtf8(result[2][1]), 'edit_ect2');
            assert.equal(Boolean(result[3]), true);
            assert.equal(result[4].toNumber(), 7);
            assert.equal(result[5].toNumber(), 0);
        })
    });

    it("Update first certificate as academy", function() {
        return certificateStorage.updateCertificateByIndex(
            0,
            web3.eth.accounts[4],
            web3.eth.accounts[5],
            web3.eth.accounts[6],
            ['edit_new', 'title_cert_academy'],
            ['edit_subjec', 'edit_ect2'],
            false,
            5,
            web3.eth.accounts[0],
            2,
            {from: web3.eth.accounts[7]}
        )
        .then(function(result) {
            assert.equal(Boolean(result), true);
        })
        .then(function() {
            return certificateStorage.getCertificateAddressesByIndex(0);
        })
        .then(function(result) {
            assert.equal(result[0], web3.eth.accounts[4]);
            assert.equal(result[1], web3.eth.accounts[5]);
            assert.equal(result[2], web3.eth.accounts[9]);
            assert.equal(result[3], web3.eth.accounts[0]);
        })
        .then(function() {
            return certificateStorage.getCertificateDataByIndex(0);
        })
        .then(function(result) {
            assert.equal(result[0].toNumber(), 0);
            assert.equal(web3.toUtf8(result[1][0]), 'edit_new');
            assert.equal(web3.toUtf8(result[1][1]), 'edit_new2');
            assert.equal(web3.toUtf8(result[2][0]), 'edit_subjec');
            assert.equal(web3.toUtf8(result[2][1]), 'edit_ect2');
            assert.equal(Boolean(result[3]), true);
            assert.equal(result[4].toNumber(), 5);
            assert.equal(result[5].toNumber(), 2);
        })
    });

    it("Update first certificate as learner", function() {
        return certificateStorage.updateCertificateByIndex(
            0,
            web3.eth.accounts[3],
            web3.eth.accounts[4],
            web3.eth.accounts[6],
            ['edit_new_learner', 'title_cert_learner'],
            ['edit_subjec', 'edit_ect2_learner'],
            false,
            6,
            web3.eth.accounts[0],
            4,
            {from: web3.eth.accounts[9]}
        )
        .then(function(result) {
            assert.equal(Boolean(result), true);
        })
        .then(function() {
            return certificateStorage.getCertificateAddressesByIndex(0);
        })
        .then(function(result) {
            assert.equal(result[0], web3.eth.accounts[4]);
            assert.equal(result[1], web3.eth.accounts[5]);
            assert.equal(result[2], web3.eth.accounts[6]);
            assert.equal(result[3], web3.eth.accounts[0]);
        })
        .then(function() {
            return certificateStorage.getCertificateDataByIndex(0);
        })
        .then(function(result) {
            assert.equal(result[0].toNumber(), 0);
            assert.equal(web3.toUtf8(result[1][0]), 'edit_new');
            assert.equal(web3.toUtf8(result[1][1]), 'edit_new2');
            assert.equal(web3.toUtf8(result[2][0]), 'edit_subjec');
            assert.equal(web3.toUtf8(result[2][1]), 'edit_ect2');
            assert.equal(Boolean(result[3]), true);
            assert.equal(result[4].toNumber(), 5);
            assert.equal(result[5].toNumber(), 2);
        })
    });


    it("Delete the third certificate", function() {
        return certificateStorage.deleteCertificateByIndex(1)
        .then(function(result) {
          assert.equal(Boolean(result), true, "Verify that second certificate is successfuly removed");
        })
        .then(function () {
          return certificateStorage.certificateCounter.call();
        })
        .then(function (result) {
          assert.equal(result.toNumber(), 3);
        })
        .then(function() {
          return certificateStorage.getCertificateAddressesByIndex(2);
        })
        .then(function(result) {
          assert.equal(result[0], academy);
          assert.equal(result[1], course);
          assert.equal(result[2], learner);
          assert.equal(result[3], academy);
        })
        .then(function() {
          return certificateStorage.getCertificateAddressesByIndex(1);
        })
        .then(function(result) {
          assert.equal(result[0], '0x0000000000000000000000000000000000000000');
        })
    });

    it("Update third certificate as owner", function() {
        return certificateStorage.updateCertificateByIndex(
            2,
            web3.eth.accounts[4],
            web3.eth.accounts[5],
            web3.eth.accounts[6],
            ['title1_owner', 'title2_owner'],
            ['subj1_owner', 'subj2_owner'],
            false,
            4,
            web3.eth.accounts[0],
            5,
            {from: web3.eth.accounts[0]}
        )
        .then(function(result) {
            assert.equal(Boolean(result), true);
        })
        .then(function() {
            return certificateStorage.getCertificateAddressesByIndex(2);
        })
        .then(function(result) {
            assert.equal(result[0], web3.eth.accounts[4]);
            assert.equal(result[1], web3.eth.accounts[5]);
            assert.equal(result[2], web3.eth.accounts[6]);
            assert.equal(result[3], web3.eth.accounts[0]);
        })
        .then(function() {
            return certificateStorage.getCertificateDataByIndex(2);
        })
        .then(function(result) {
            assert.equal(result[0].toNumber(), 2);
            assert.equal(web3.toUtf8(result[1][0]), 'title1_owner');
            assert.equal(web3.toUtf8(result[1][1]), 'title2_owner');
            assert.equal(web3.toUtf8(result[2][0]), 'subj1_owner');
            assert.equal(web3.toUtf8(result[2][1]), 'subj2_owner');
            assert.equal(Boolean(result[3]), false);
            assert.equal(result[4].toNumber(), 4);
            assert.equal(result[5].toNumber(), 5);
        })
    });


});
