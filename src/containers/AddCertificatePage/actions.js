import CertificateStorage from '../../../build/contracts/CertificateStorage.json';
import store from '../../store';

const contract = require('truffle-contract');


export function addCertificate(state) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_CERTIFICATE_REQUEST',
    });

    const web3 = store.getState().web3.web3Instance;
    const certificateStorage = contract(CertificateStorage);
    certificateStorage.setProvider(web3.currentProvider);

    web3.eth.getCoinbase((error, coinbase) => {
      if (error) {
        return;
      }

      certificateStorage.deployed().then((instance) => {
        const certificateStorageInstance = instance;

        certificateStorageInstance.addCertificate(
          '0x0000000000000000000000000000000000000001',
          '0x0000000000000000000000000000000000000002',
          '0x0000000000000000000000000000000000000003',
          [web3.fromUtf8('Баба '), web3.fromUtf8(' Дядо')],
          [web3.fromUtf8('Тест '), web3.fromUtf8(' Тест')],
          true,
          10,
          1519302362,
          { from: coinbase },
        )
          .then((result) => {
            console.log(result);
          })
          .catch((addError) => {
            dispatch({
              type: 'ADD_CERTIFICATE_FAILURE',
              error: addError,
            });
          });
      });
    });
  };
}
