const initialState = {
  activeAccount: localStorage.getItem('activeAccount'),
};


const activeAccountReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ACCOUNT_CHANGED':
    return Object.assign({}, state, {
      activeAccount: action.payload.activeAccount,
    });
  default:
    return state;
  }
};


export default activeAccountReducer;
