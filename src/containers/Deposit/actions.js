import ERC20_ABI from '../../abi/erc20';
import store from '../../store';
import Config from '../../config';

const Tx = require('ethereumjs-tx');


export function withdraw(wallet, recipient, amountLong, coin) {
  return function dispatcher() {
    const web3 = store.getState().web3.web3Instance;
    const { address } = store.getState().auth;
    const amount = Number(amountLong) * (10 ** 18);
    web3.eth.getTransactionCount(address).then((txCount) => {
      const nonce = txCount.toString(16);
      if (coin === 'edu') {
        const contract = new web3.eth.Contract(ERC20_ABI, Config.token.contractAddress);
        const rawTransaction = {
          from: address,
          nonce: `0x${nonce}`,
          gasPrice: '0x003B9ACA00',
          gasLimit: '0x250CA',
          to: Config.token.contractAddress,
          chainId: Config.network.chainId,
          value: '0x0',
          data: contract.methods.transfer(recipient, amount).encodeABI(),
        };
        const tx = new Tx(rawTransaction);
        const privateKey = Buffer.from(wallet.getPrivateKey(), 'hex');
        tx.sign(privateKey);

        const serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`, (error, txHash) => {
          console.log(error, txHash);
        });
      } else if (coin === 'eth') {
        const rawTransaction = {
          from: address,
          nonce: `0x${nonce}`,
          gasPrice: '0x003B9ACA00',
          gasLimit: 21000,
          to: recipient,
          value: amount,
        };
        const tx = new Tx(rawTransaction);
        const privateKey = Buffer.from(wallet.getPrivateKey(), 'hex');
        tx.sign(privateKey);

        const serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`, (error, txHash) => {
          console.log(error, txHash);
        });
      }
    });
  };
}
