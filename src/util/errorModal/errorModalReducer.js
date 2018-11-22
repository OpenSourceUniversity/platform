const initialState = {
  open: false,
  errorMessage: null,
};


const errorModalReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'OPEN_ERROR_MODAL':
    return Object.assign({}, state, {
      open: true,
      errorMessage: action.payload.errorMessage,
    });
  case 'CLOSE_ERROR_MODAL':
    return Object.assign({}, state, {
      open: false,
      errorMessage: null,
    });
  default:
    return state;
  }
};


export default errorModalReducer;
