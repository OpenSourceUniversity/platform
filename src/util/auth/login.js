import store from '../../store';

const Wallet = require('ethereumjs-wallet');


export default function login(passphrase) {
  const { v3Wallet } = store.getState().auth;

  return function action(dispatch) {
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
        dispatch({
          type: 'LOGGED_IN',
          payload: {
            wallet,
          },
        });
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
