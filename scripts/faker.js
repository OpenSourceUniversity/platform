const CertificateStorage = artifacts.require('CertificateStorage');


function fakeCertificates() {
  CertificateStorage.deployed().then((instance) => {
    // Add certificates
    Array(200).fill().map((_, i) => {
      console.log(`Adding certificate ${i}`);
      return instance.addCertificate(
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002',
        '0x0000000000000000000000000000000000000003',
        [web3.fromUtf8('Баба '), web3.fromUtf8(' Дядо')],
        [web3.fromUtf8('Тест '), web3.fromUtf8(' Тест')],
        true,
        10,
        1519302362,
      );
    });
  });
}


module.exports = function faker() {
  fakeCertificates();
};
