import Web3 from 'web3';
import store from '../../store';
import Config from '../../config';

// Import blockchain storage contract
const contractJSON = require('../../../build/contracts/ipfsHashStorage.json');

export default function storeCertificateHash(certificateData) {
  return function dispatcher(dispatch) {
    const { nodeUrl } = Config.network;
    const { storageAddress } = Config.blockchain;
    const abi = contractJSON.abi;

    try {
      const web3 = new Web3();
      web3.setProvider(new web3.providers.HttpProvider(nodeUrl));
      const storageContract = new web3.eth.Contract(abi, address);
      // Store the IPFS hash
      storageContract.methods.sendHash(certificateData.ipfs_hash, certificateData.learner_eth_address).send({
        from: store.getState().auth.address,
      }, (error, transactionHash) => {
        dispatch({
          type: 'CERTIFICATE_HASH_STORED',
          payload: {
            transactionHash,
          },
        });
      });
    } catch (error) {
      dispatch({
        type: 'CERTIFICATE_HASH_FAILED',
        payload: {
          transactionError: error,
        },
      });
    }
  };
}
