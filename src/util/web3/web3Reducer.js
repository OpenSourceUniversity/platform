const initialState = {
  web3Instance: null,
  coinbase: '0x0000000000000000000000000000000000000000',
  ethBalance: 0.0,
  balancesError: null,
  eduBalance: 0.0,
};


const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'WEB3_INITIALIZED':
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance,
    });
  case 'GET_COINBASE_SUCCESS':
    return Object.assign({}, state, {
      coinbase: action.payload.coinbase,
    });
  case 'GET_BALANCES':
    return Object.assign({}, state, {
      ethBalance: action.payload.ethBalance,
      eduBalance: action.payload.eduBalance,
    });
  case 'BALANCES_ERROR':
    return Object.assign({}, state, {
      balancesError: action.payload.balancesError,
    });
  default:
    return state;
  }
};


export default web3Reducer;
