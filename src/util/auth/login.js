import { createHashHistory } from 'history';
import store from '../../store';
import storeSignedAddress from './storeSignedAddress';

const Wallet = require('ethereumjs-wallet');


export default function login(passphrase) {
  const { v3Wallet } = store.getState().auth;

  return function action(dispatch) {
    dispatch({
      type: 'LOGGING_IN',
    });
    if (!v3Wallet) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: {
          loginError: 'No stored wallet found. Make sure to register or perform wallet recovery first.',
        },
      });
    } else {
      try {
        const wallet = Wallet.fromV3(v3Wallet, passphrase);
        const address = wallet.getChecksumAddressString();
        const privateKey = wallet.getPrivateKey();
        storeSignedAddress(address.slice(2), privateKey);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('address', address);
        localStorage.setItem('publicKey', wallet.getPublicKey());
        dispatch({
          type: 'LOGGED_IN',
          payload: {
            wallet,
          },
        });
        const newPath = '/';
        const history = createHashHistory();
        history.push(newPath);
      } catch (e) {
        dispatch({
          type: 'LOGIN_ERROR',
          payload: {
            loginError: 'Could not unlock wallet.',
          },
        });
      }
    }
  };
}
