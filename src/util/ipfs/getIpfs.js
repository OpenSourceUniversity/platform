
const IPFS = require('ipfs-api');
import store from '../../store';
import Config from '../../config';

export const IPFS_INITIALIZED = 'IPFS_INITIALIZED';

function IPFSinitialized(results) {
  return function action(dispatch) {
    dispatch({
      type: 'IPFS_INITIALIZED',
      payload: {
        results,
      },
    });
  };
}

const getIpfs = new Promise(((resolve, reject) => {
  const { host, port, protocol } = Config.ipfs;
  const ipfs = new IPFS(host, port, protocol);

  const results = {
    IPFSinstance: ipfs,
  };

  resolve(store.dispatch(IPFSinitialized(results)));

}));


export default getIpfs;
