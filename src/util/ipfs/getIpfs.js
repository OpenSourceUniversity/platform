import store from '../../store';


export const IPFS_INITIALIZED = 'IPFS_INITIALIZED';
function ipfsInitialized(node) {
  return {
    type: IPFS_INITIALIZED,
    payload: {
      ipfsInstance: node,
    },
  };
}

const getIpfs = new Promise(((resolve) => {
  const ipfsInstance = new Ipfs();
  resolve(store.dispatch(ipfsInitialized(ipfsInstance)));
}));

export default getIpfs;
