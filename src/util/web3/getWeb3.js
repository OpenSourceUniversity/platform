import Web3 from 'web3';
import store from '../../store';
import getCoinbase from './getCoinbase';

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED';
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results,
  };
}

const getWeb3 = new Promise(((resolve, reject) => { // eslint-disable-line no-unused-vars
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', (dispatch) => { // eslint-disable-line no-unused-vars
    let { web3 } = window;

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);

      const results = {
        web3Instance: web3,
      };

      resolve(store.dispatch(getCoinbase(web3)));

      resolve(store.dispatch(web3Initialized(results)));
    }
  });
}));

export default getWeb3;
