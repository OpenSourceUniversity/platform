import CertificateStorage from '../../../build/contracts/CertificateStorage.json';
import store from '../../store';

const contract = require('truffle-contract');


export function addCertificate(state) {
  let web3 = store.getState().web3.web3Instance;
  const certificateStorage = contract(CertificateStorage);
  certificateStorage.setProvider(web3.currentProvider);

  var certificateStorageInstance;

  web3.eth.getCoinbase((error, coinbase) => {
    if (error) {
      console.error(error);
      return;
    }

    certificateStorage.deployed().then(function(instance) {
      certificateStorageInstance = instance;

      certificateStorageInstance.addCertificate(ala, bala, {from: coinbase})
      .then(function(result) {
        console.log(result); 
      })
      .catch(function(error) {
        console.error(error);
      });
    });

  });
}
