const initialState = {
  v3Wallet: JSON.parse(localStorage.getItem('v3Wallet')),
  address: localStorage.getItem('address'),
  signedAddress: localStorage.getItem('signedAddress'),
  publicKey: localStorage.getItem('publicKey'),
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
  loginError: null,
  isLoggingIn: false,
  onBoardingActiveElement: 'signin',
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'V3_WALLET_STORED':
    return Object.assign({}, state, {
      v3Wallet: action.payload.v3Wallet,
      loginError: null,
      isLoggedIn: true,
    });
  case 'SIGNED_ADDRESS_STORED':
    return Object.assign({}, state, {
      signedAddress: action.payload.signedAddress,
    });
  case 'LOGGING_IN':
    return Object.assign({}, state, {
      isLoggingIn: true,
    });
  case 'LOGGED_OUT':
    return Object.assign({}, state, {
      isLoggedIn: false,
      onBoardingActiveElement: 'signin',
    });
  case 'LOGIN_ERROR':
    return Object.assign({}, state, {
      loginError: action.payload.loginError,
      isLoggedIn: false,
      isLoggingIn: false,
    });
  case 'LOGGED_IN':
    return Object.assign({}, state, {
      loginError: null,
      isLoggedIn: true,
      isLoggingIn: false,
      address: action.payload.wallet.getChecksumAddressString(),
      publicKey: action.payload.wallet.getPublicKey(),
    });
  case 'ACTIVE_ELEMENT_CHANGED':
    return Object.assign({}, state, {
      onBoardingActiveElement: action.payload.onBoardingActiveElement,
    });
  default:
    return state;
  }
};


export default authReducer;
