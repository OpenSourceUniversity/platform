const initialState = {
  v3Wallet: JSON.parse(localStorage.getItem('v3Wallet')),
  address: localStorage.getItem('address'),
  publicKey: localStorage.getItem('publicKey'),
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
  loginError: null,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'V3_WALLET_STORED':
    return Object.assign({}, state, {
      v3Wallet: action.payload.v3Wallet,
      loginError: null,
      isLoggedIn: true,
    });
  case 'LOGGED_OUT':
    return Object.assign({}, state, {
      isLoggedIn: false,
    });
  case 'LOGIN_ERROR':
    return Object.assign({}, state, {
      loginError: action.payload.loginError,
      isLoggedIn: false,
    });
  case 'LOGGED_IN':
    return Object.assign({}, state, {
      loginError: null,
      isLoggedIn: true,
      address: action.payload.wallet.getChecksumAddressString(),
      publicKey: action.payload.wallet.getPublicKey(),
    });
  default:
    return state;
  }
};


export default authReducer;
