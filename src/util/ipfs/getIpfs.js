
import Config from '../../config';

const IPFS = require('ipfs-api');

export const IPFS_INITIALIZED = 'IPFS_INITIALIZED';

const getIpfsPromise = new Promise(((resolve, reject) => {
  const { host, port, protocol } = Config.ipfs;
  resolve(new IPFS(host, port, protocol));
  reject(new Error('something bad happened'));
}));

export default function getIpfs() {
  return function action(dispatch) {
    getIpfsPromise
      .then(
        (result) => {
          dispatch({
            type: 'IPFS_INITIALIZED',
            payload: {
              result,
            },
          });
        },
        (error) => {
          dispatch({
            type: 'IPFS_INITIALIZATION_FAILED',
            payload: {
              error,
            },
          });
        },
      );
  };
}
