import React from 'react';
import store from '../../store';
import Config from '../../config';
import { initWalletUnlocker } from '../../util/auth/walletUnlocker';
import GasPriceExtension from '../../components/GasPriceExtension';

const Tx = require('ethereumjs-tx');

const contractJSON = require('../../../build/contracts/VerificationStorage.json');


export default function storeVerification(ipfsHash, callback) {
  return function dispatcher(dispatch) {
    const { storageAddress } = Config.blockchain;
    const { abi } = contractJSON;

    const web3 = store.getState().web3.web3Instance;
    const { address } = store.getState().auth;
    const storageContract = new web3.eth.Contract(abi, storageAddress);
    web3.eth.getTransactionCount(address).then((txCount) => {
      const ipfsHashBytes = web3.utils.asciiToHex(ipfsHash);
      const nonce = txCount.toString(16);

      dispatch(initWalletUnlocker((wallet) => {
        const { gasPrice } = store.getState().withdraw;
        const rawTransaction = {
          from: address,
          nonce: `0x${nonce}`,
          gasPrice: `0x${gasPrice}`,
          gasLimit: '0x250CA',
          to: Config.blockchain.storageAddress,
          chainId: Config.network.chainId,
          value: '0x0',
          data: storageContract.methods.verify(ipfsHashBytes).encodeABI(),
        };
        const tx = new Tx(rawTransaction);
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
      }, <GasPriceExtension activityText="Unlock wallet to complete verification transaction" />));
    });
  };
}
