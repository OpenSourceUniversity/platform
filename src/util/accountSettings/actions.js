import axios from 'axios';
import store from '../../store';
import Config from '../../config';
import login from '../../util/auth/login';

const { bdnUrl } = Config.network;

export function getWallet(walletAccessData) {
  return function action(dispatch) {
    axios.post(`${bdnUrl}api/v1/user-settings/get_wallet/`, walletAccessData).then((body) => {
      const v3Wallet = JSON.parse(body.data.wallet);
      localStorage.setItem('v3Wallet', JSON.stringify(v3Wallet));
      dispatch({
        type: 'SET_V3WALLET',
        v3Wallet,
      });
      dispatch(login(walletAccessData.password));
    }).catch((error) => {
      if (error.response.data.error === 'Wallet not stored' || error.response.status === 404) {
        dispatch(login(walletAccessData.password));
      } else {
        dispatch({
          type: 'LOGIN_ERROR',
          payload: {
            loginError: error.response.data.error,
          },
        });
      }
    });
  };
}

export function setToRequest() {
  return function action(dispatch) {
    dispatch({
      type: 'SAVE_ACCOUNT_SETTINGS_REQUEST',
    });
  };
}

export function setToError() {
  return function action(dispatch) {
    dispatch({
      type: 'ACCOUNT_SETTINGS_ERROR',
      error: 'You can not set new wallet here.',
    });
  };
}

const Wallet = require('ethereumjs-wallet');

export function setWalletSettings(walletSettings) {
  return function action(dispatch) {
    const { v3Wallet } = store.getState().auth;
    dispatch({
      type: 'SAVE_ACCOUNT_SETTINGS_REQUEST',
    });
    if (!v3Wallet) {
      dispatch({
        type: 'ACCOUNT_SETTINGS_ERROR',
        error: 'No stored wallet found. Make sure to register or perform wallet recovery first.',
      });
    } else if (!walletSettings.password) {
      dispatch({
        type: 'ACCOUNT_SETTINGS_ERROR',
        error: 'Could not unlock wallet. Please check your passphrase.',
      });
    } else {
      setTimeout(() => {
        try {
          Wallet.fromV3(v3Wallet, walletSettings.password);
          const axiosConfig = {
            headers: {
              'Auth-Signature': store.getState().auth.signedAddress,
              'Auth-Eth-Address': store.getState().auth.address.slice(2),
            },
          };
          axios.post(`${bdnUrl}api/v1/user-settings/set_wallet/`, walletSettings, axiosConfig).then(() => {
            dispatch({
              type: 'SAVE_WALLET_ON_BDN',
            });
          }).catch((error) => {
            dispatch({
              type: 'ACCOUNT_SETTINGS_ERROR',
              error: error.response.data.error,
            });
          });
        } catch (e) {
          dispatch({
            type: 'ACCOUNT_SETTINGS_ERROR',
            error: 'Could not unlock wallet. Please check your passphrase.',
          });
        }
      }, 3000);
    }
  };
}

export function storeWallet(walletSettings) {
  return function action(dispatch) {
    dispatch({
      type: 'SAVE_ACCOUNT_SETTINGS_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    axios.post(`${bdnUrl}api/v1/user-settings/set_wallet/`, walletSettings, axiosConfig).then(() => {
      dispatch({
        type: 'SAVE_WALLET_ON_BDN',
      });
    }).catch((error) => {
      dispatch({
        type: 'ACCOUNT_SETTINGS_ERROR',
        error: error.response.data.error,
      });
    });
  };
}

export function getAccountSettings() {
  return function action(dispatch) {
    dispatch({
      type: 'SAVE_ACCOUNT_SETTINGS_REQUEST',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    return fetch(`${bdnUrl}api/v1/user-settings/`, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'ACCOUNT_SETTINGS_ERROR',
            error: 'Error while getting default values.',
          });
        } else {
          dispatch({
            type: 'GET_DEFAULT_SETTINGS',
            accountSettings: body,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: 'ACCOUNT_SETTINGS_ERROR',
          error: 'Error while getting default values.',
        });
      });
  };
}

export function setEmailSettings(emailSettings) {
  return function action(dispatch) {
    dispatch({
      type: 'SAVE_ACCOUNT_SETTINGS_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    axios.post(`${bdnUrl}api/v1/user-settings/`, emailSettings, axiosConfig).then(() => {
      dispatch({
        type: 'SAVE_EMAIL_SETTINGS',
      });
      dispatch(getAccountSettings());
    }).catch((error) => {
      dispatch({
        type: 'ACCOUNT_SETTINGS_ERROR',
        error: error.response.data.error,
      });
    });
  };
}
