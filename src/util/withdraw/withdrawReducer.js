const initialState = {
  isSuccess: false,
  error: null,
  isError: false,
  txHash: null,
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
  default:
    return state;
  }
};


export default withdrawReducer;
