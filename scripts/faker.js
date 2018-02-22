const CertificateStorage = artifacts.require('CertificateStorage');


function fakeCertificates() {
  CertificateStorage.deployed().then((instance) => {
    // Add certificates
    Array(50).fill().map((_, i) => {
      console.log(`Adding certificate ${i}`);
      return instance.addCertificate(
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002',
        '0x0000000000000000000000000000000000000003',
        ['Python', ' Programming'],
        ['Computer', ' Science'],
        10,
        1519302362,
      );
    });
  });
}


module.exports = function faker() {
  fakeCertificates();
};
