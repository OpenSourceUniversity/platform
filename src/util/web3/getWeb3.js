import Web3 from 'web3';
import store from '../../store';

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
    let web3 = { window };

    // Fallback to localhost if no web3 injection. We've configured this to
    // use the development console's port by default.
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');

    web3 = new Web3(provider);

    const results = {
      web3Instance: web3,
    };

    console.log('No web3 instance injected, using Local web3.');

    resolve(store.dispatch(web3Initialized(results)));
  });
}));

export default getWeb3;
