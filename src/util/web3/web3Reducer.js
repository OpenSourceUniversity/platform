const initialState = {
  web3Instance: null,
  coinbase: '0x0000000000000000000000000000000000000000',
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
  default:
    return state;
  }
};


export default web3Reducer;
