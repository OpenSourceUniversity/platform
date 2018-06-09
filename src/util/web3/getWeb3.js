import Web3 from 'web3';
import store from '../../store';
import Config from '../../config';

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED';
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results,
  };
}

const getWeb3 = new Promise(((resolve, reject) => { // eslint-disable-line no-unused-vars
  const { nodeUrl } = Config.network;
  const provider = new Web3.providers.HttpProvider(nodeUrl);
  const web3 = new Web3(provider);

  const results = {
    web3Instance: web3,
  };

  resolve(store.dispatch(web3Initialized(results)));
}));

export default getWeb3;
