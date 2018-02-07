import CertificateStorage from '../../../build/contracts/CertificateStorage.json';
import store from '../../store';

const contract = require('truffle-contract');


function addCertificate() {
  const web3 = store.getState().web3.web3Instance;
  const certificateStorage = contract(CertificateStorage);
  certificateStorage.setProvider(web3.currentProvider);

  web3.eth.getCoinbase((error, coinbase) => {
    if (error) {
      return;
    }

    certificateStorage.deployed().then((instance) => {
      const certificateStorageInstance = instance;

      certificateStorageInstance.addCertificate('', '', '', '', '', '', '', { from: coinbase })
        .then((result) => {
          console.log(result);
        })
        .catch((addCertificateError) => {
          console.error(addCertificateError);
        });
    });
  });
}


export { addCertificate };
