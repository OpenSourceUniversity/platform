import { Buffer } from 'buffer';
import store from '../../store';
// const contract = require('truffle-contract');


export function storeProofOfExistance(state, hash) {
  return function action(dispatch) {
    const web3 = store.getState().web3.web3Instance;
    setTimeout(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_SUCCESS',
      });
    }, 1500);
  };
}


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

    const ipfs = store.getState().ipfs.ipfsInstance;
    const reader = new FileReader();

    reader.onloadend = (event) => {
      const { result } = event.target;
      ipfs.files.add(Buffer.from(result), (error, hash) => {
        if (error) {
          dispatch({
            type: 'ADD_CERTIFICATE_FAILURE',
            error,
          });
        }
        if (hash) {
          dispatch(storeProofOfExistance(state, hash));
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
