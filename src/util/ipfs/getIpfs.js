
import Config from '../../config';

const IPFS = require('ipfs-api');

export const IPFS_INITIALIZED = 'IPFS_INITIALIZED';

export function getIpfs() {
  return function action(dispatch) {
    getIpfsPromise
      .then(
        (result) => {
          console.log(result);
          dispatch({
            type: 'IPFS_INITIALIZED',
            payload: {
              result,
            },
          });
        },
        (error) => {
          console.log(error);
        },
      );
  };
}

let getIpfsPromise = new Promise(((resolve, reject) => {
  const { host, port, protocol } = Config.ipfs;
  resolve(new IPFS(host, port, protocol));
}));
