import Web3 from 'web3';
import store from '../../store';
import Config from '../../config';
import ERC20_ABI from '../../abi/erc20';

export default function getBalances() {
  return function action(dispatch) {
    const { address } = store.getState().auth;
    const { nodeUrl } = Config.network;
    try {
      const web3 = new Web3();
      web3.setProvider(new web3.providers.HttpProvider(nodeUrl));
      const contractInstance = new web3.eth.Contract(ERC20_ABI, Config.token.contractAddress);
      web3.eth.getBalance(address, (_, weiBalance) => {
        const ethBalance = Number(weiBalance) / (10 ** 18);
        contractInstance.methods.balanceOf(address).call((error, eduBalanceLong) => {
          const eduBalance = Number(eduBalanceLong) / (10 ** 18);
          dispatch({
            type: 'GET_BALANCES',
            payload: {
              ethBalance,
              eduBalance,
            },
          });
        });
      });
    } catch (e) {
      dispatch({
        type: 'BALANCES_ERROR',
        payload: {
          balancesError: 'Could not update balances.',
        },
      });
    }
  };
}
