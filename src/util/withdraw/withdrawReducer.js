const initialState = {
  isSuccess: false,
  ethError: null,
  isError: false,
  eduError: null,
};


const withdrawReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'WITHDRAW_SUCCESS':
    return Object.assign({}, state, {
      isSuccess: true,
      isError: false,
    });
  case 'WITHDRAW_EDU_ERROR':
    return Object.assign({}, state, {
      isSuccess: false,
      isError: true,
      eduError: action.error,
    });
  case 'WITHDRAW_ETH_ERROR':
    return Object.assign({}, state, {
      isSuccess: false,
      isError: true,
      ethError: action.error,
    });
  default:
    return state;
  }
};


export default withdrawReducer;
