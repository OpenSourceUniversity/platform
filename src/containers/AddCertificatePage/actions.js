import { Buffer } from 'buffer';
import store from '../../store';
// const contract = require('truffle-contract');


export function addCertificate(state) {
  return function action(dispatch) {
    if (!state.certificateName || !state.issuer || !state.recipient || !state.file) {
      dispatch({
        type: 'ADD_CERTIFICATE_FAILURE',
        error: { message: 'Fill in all fields.' },
      });
      return;
    }

    dispatch({
      type: 'ADD_CERTIFICATE_REQUEST',
    });

    const web3 = store.getState().web3.web3Instance;
    const ipfs = store.getState().ipfs.ipfsInstance;
    const reader = new FileReader();

    reader.onloadend = (event) => {
      const { result } = event.target;
      ipfs.files.add(Buffer.from(result), (err, hash) => {
        if (err) {
          console.log(err);
        }
        if (hash) {
          console.log('The hash is here: ', hash);
        }
      });
    };
    reader.onerror = (error) => {
      dispatch({
        type: 'ADD_CERTIFICATE_FAILURE',
        error,
      });
    };
    reader.readAsArrayBuffer(state.file);
  };
}
