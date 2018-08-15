import store from '../../store';
import Config from '../../config';
import { initWalletUnlocker } from '../../util/auth/walletUnlocker';

const Tx = require('ethereumjs-tx');

const contractJSON = require('../../../build/contracts/VerificationStorage.json');


export default function storeVerification(ipfsHash, grantedTo, callback) {
  return function dispatcher(dispatch) {
    const { storageAddress } = Config.blockchain;
    const { abi } = contractJSON;

    const web3 = store.getState().web3.web3Instance;
    const { address } = store.getState().auth;
    const storageContract = new web3.eth.Contract(abi, storageAddress);

    web3.eth.getTransactionCount(address).then((txCount) => {
      const ipfsHashBytes = web3.utils.asciiToHex(ipfsHash);
      const nonce = txCount.toString(16);
      const rawTransaction = {
        from: address,
        nonce: `0x${nonce}`,
        gasPrice: '0x003B9ACA00',
        gasLimit: '0x250CA',
        to: Config.blockchain.storageAddress,
        chainId: Config.network.chainId,
        value: '0x0',
        data: storageContract.methods.verify(ipfsHashBytes, grantedTo).encodeABI(),
      };

      const tx = new Tx(rawTransaction);

      dispatch(initWalletUnlocker((wallet) => {
        const privateKey = Buffer.from(wallet.getPrivateKey(), 'hex');
        tx.sign(privateKey);
        const serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
          .once('transactionHash', (txHash) => {
            dispatch({
              type: 'VERIFY_TX_STORED',
              payload: {
                txHash,
              },
            });
            callback(null, txHash);
          })
          .on('error', (error) => {
            dispatch({
              type: 'VERIFY_TX_FAILED',
              payload: {
                error: error.message,
              },
            });
            callback(error);
          });
      }));
    });
  };
}
