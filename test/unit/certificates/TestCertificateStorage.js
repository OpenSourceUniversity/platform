var TestCertificateStorage = artifacts.require("./certificates/CertificateStorage.sol");

contract('TestCertificateStorage', function(accounts) {
    var certificateStorage;

    var owner = web3.eth.accounts[0];
    var osu = web3.eth.accounts[1];

    var academy = web3.eth.accounts[2];
    var business = web3.eth.accounts[3];
    var learner = web3.eth.accounts[4];
    var course = web3.eth.accounts[5];

    it("Deploiment and initial information", function() {
        return TestCertificateStorage.new(owner, osu).then(function(instance) {
            certificateStorage = instance;
        })
    });

    it("Ownership", function() {
        return certificateStorage.owner.call()
        .then(function(result) {
            assert.equal(result, owner);
        })
        .then(function() {
            return certificateStorage.osu.call()
        })
        .then(function(result) {
            assert.equal(result, osu);
        })
    });

    // it("Adding Certificates", function() {
    //
    //     return certificateStorage.addCertificate.call(academy, course, learner, 'test', 'test', 2, true)
    //     .then(function(result) {
    //         assert.equal(result, true);
    //     })
    // });

});
