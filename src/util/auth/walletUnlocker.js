import store from '../../store';


const Wallet = require('ethereumjs-wallet');


export function initWalletUnlocker(callback, extensionComponent = null) {
  return function action(dispatch) {
    dispatch({
      type: 'WALLET_UNLOCKER_MODAL_CALLBACK',
      payload: {
        callback,
      },
    });

    dispatch({
      type: 'WALLET_UNLOCKER_MODAL_OPEN',
      payload: {
        open: true,
        walletUnlockerExtension: extensionComponent,
      },
    });
  };
}


export function closeUnlocker() {
  return function action(dispatch) {
    dispatch({
      type: 'WALLET_UNLOCKER_MODAL_OPEN',
      payload: {
        open: false,
        walletUnlockerExtension: null,
      },
    });
  };
}


export function unlockWallet(passphrase) {
  return function action(dispatch) {
    const callback = store.getState().auth.walletUnlockerCallback;
    const { v3Wallet } = store.getState().auth;

    try {
      const wallet = Wallet.fromV3(v3Wallet, passphrase);
      dispatch({
        type: 'WALLET_UNLOCKER_MODAL_OPEN',
        payload: {
          open: false,
        },
      });
      callback(wallet);
    } catch (e) {
      dispatch({
        type: 'WALLET_UNLOCKER_ERROR',
        payload: {
          error: 'Could not unlock wallet.',
        },
      });
    }
  };
}
