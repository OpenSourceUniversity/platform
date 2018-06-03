import Web3 from 'web3';
import store from '../../store';
import Config from '../../config';

export default function getBalances() {
  return function action(dispatch) {
    const { address } = store.getState().auth;
    const ABI = [{
      constant: true, inputs: [], name: 'preSaleStartTime', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], payable: false, type: 'function',
    }, {
      constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_amount', type: 'uint256' }], name: 'approve', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'sigBountyProgramEDUSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'EDU_PER_ETH_SALE', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'certifier', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'presaleAddress', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'totalSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'PresaleEDUSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'maxPresaleEDUSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'saleStartTime', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'EDU_PER_ETH_PRE_SALE', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'EDU_PER_ETH_EARLY_PRE_SALE', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: false, inputs: [{ name: '_from', type: 'address' }, { name: '_to', type: 'address' }, { name: '_amount', type: 'uint256' }], name: 'transferFrom', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'earlyPresaleEDUSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'LockEDUTeam', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [{ name: '', type: 'address' }], name: 'WEIContributed', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'sigTeamAndAdvisersEDUSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'sigTeamAndAdvisersAddress', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'totalEDUSAllocated', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'version', outputs: [{ name: '', type: 'string' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'contributionsAddress', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function',
    }, {
      constant: false, inputs: [{ name: '_preSaleStartTime', type: 'uint256' }, { name: '_preSaleEndTime', type: 'uint256' }], name: 'setPresaleTime', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function',
    }, {
      constant: false, inputs: [{ name: '_address', type: 'address' }], name: 'updateCertifier', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function',
    }, {
      constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_subtractedValue', type: 'uint256' }], name: 'decreaseApproval', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [{ name: '_owner', type: 'address' }], name: 'balanceOf', outputs: [{ name: 'balance', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'maxEarlyPresaleEDUSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'SaleEDUSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'ownerAddress', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'totalEDUSLeft', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: false, inputs: [{ name: '_saleStartTime', type: 'uint256' }, { name: '_saleEndTime', type: 'uint256' }], name: 'setSaleTimes', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function',
    }, {
      constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_amount', type: 'uint256' }], name: 'transfer', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function',
    }, {
      constant: false, inputs: [{ name: '_valEarlyPresale', type: 'uint256' }, { name: '_valPresale', type: 'uint256' }, { name: '_valSale', type: 'uint256' }], name: 'setEDUPrice', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'allowContribution', outputs: [{ name: '', type: 'bool' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'totalWEIInvested', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'TotalEDUSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'preSaleEndTime', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_addedValue', type: 'uint256' }], name: 'increaseApproval', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }], name: 'allowance', outputs: [{ name: 'remaining', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'EDU_KYC_BONUS', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: false, inputs: [{ name: '_allowContribution', type: 'bool' }], name: 'setAllowContributionFlag', outputs: [{ name: 'success', type: 'bool' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'saleEndTime', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'sigBountyProgramAddress', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'OSUniEDUSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, type: 'function',
    }, {
      constant: true, inputs: [], name: 'saleAddress', outputs: [{ name: '', type: 'address' }], payable: false, type: 'function',
    }, { inputs: [{ name: '_presaleAddress', type: 'address' }, { name: '_saleAddress', type: 'address' }, { name: '_sigTeamAndAdvisersAddress', type: 'address' }, { name: '_sigBountyProgramAddress', type: 'address' }, { name: '_contributionsAddress', type: 'address' }], payable: false, type: 'constructor' }, { payable: true, type: 'fallback' }, {
      anonymous: false, inputs: [{ indexed: true, name: '_creator', type: 'address' }, { indexed: false, name: '_amountOfEDU', type: 'uint256' }], name: 'CreatedEDU', type: 'event',
    }, {
      anonymous: false, inputs: [{ indexed: true, name: '_from', type: 'address' }, { indexed: true, name: '_to', type: 'address' }, { indexed: false, name: '_value', type: 'uint256' }], name: 'Transfer', type: 'event',
    }, {
      anonymous: false, inputs: [{ indexed: true, name: '_owner', type: 'address' }, { indexed: true, name: '_spender', type: 'address' }, { indexed: false, name: '_value', type: 'uint256' }], name: 'Approval', type: 'event',
    }];
    const { nodeUrl } = Config.network;
    try {
      const web3 = new Web3();
      web3.setProvider(new web3.providers.HttpProvider(nodeUrl));
      const contract = web3.eth.contract(ABI);
      const contractInstance = contract.at(Config.token.contractAddress);
      const eduBalance = contractInstance.balanceOf.call(address) / (10 ** 18);
      const ethBalance = contract.eth.getBalance(address) / (10 ** 18);
      dispatch({
        type: 'GET_BALANCES',
        payload: {
          ethBalance,
          eduBalance,
        },
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
