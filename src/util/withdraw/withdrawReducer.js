const initialState = {
  isSuccess: false,
  error: null,
  isError: false,
  txHash: null,
  gasPrice: 1,
  recomendedGasPrice: 1,
};


const withdrawReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'WITHDRAW_SUCCESS':
    return Object.assign({}, state, {
      isSuccess: true,
      isError: false,
      txHash: action.payload.txHash,
    });
  case 'WITHDRAW_ERROR':
    return Object.assign({}, state, {
      isSuccess: false,
      isError: true,
      error: action.payload.error,
      txHash: null,
    });
  case 'WITHDRAW_RESET':
    return Object.assign({}, state, {
      isSuccess: false,
      isError: false,
      error: null,
      txHash: null,
    });
  case 'GAS_PRICE_CHANGE':
    return Object.assign({}, state, {
      gasPrice: action.payload.gasPrice,
    });
  case 'GAS_PRICE_GET':
    return Object.assign({}, state, {
      gasPrice: action.gasPrice.toString(16),
      recomendedGasPrice: action.gasPrice,
      error: action.error,
    });
  default:
    return state;
  }
};


export default withdrawReducer;
