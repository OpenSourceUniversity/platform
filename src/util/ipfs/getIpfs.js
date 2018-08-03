
const IPFS = require('ipfs-api');
import Config from '../../config';

export const IPFS_INITIALIZED = 'IPFS_INITIALIZED';

export function getIpfs() {
  return function dispatcher(dispatch) {
    getIpfsPromise
    .then(
      result => {
        console.log(result)
        dispatch({
          type: 'IPFS_INITIALIZED',
          payload: {
            result,
          },
        });
      },
      error => {
        console.log(error)
      }
    )
  };
}

let getIpfsPromise = new Promise(function(resolve, reject) {
  const { host, port, protocol } = Config.ipfs;
  resolve(new IPFS(host, port, protocol));
});
