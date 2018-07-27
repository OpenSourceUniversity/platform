const initialState = {
  v3Wallet: JSON.parse(localStorage.getItem('v3Wallet')),
  address: localStorage.getItem('address'),
  signedAddress: localStorage.getItem('signedAddress'),
  publicKey: localStorage.getItem('publicKey'),
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
  loginError: null,
  isLoggingIn: false,
  onBoardingActiveElement: 'signin',
  walletUnlockerModalOpen: false,
  walletUnlockerError: null,
  walletUnlockerCallback: () => {},
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'V3_WALLET_STORED':
    return Object.assign({}, state, {
      v3Wallet: action.payload.v3Wallet,
      loginError: null,
      isLoggedIn: true,
      address: localStorage.getItem('address'),
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
  case 'WALLET_UNLOCKER_MODAL_OPEN':
    return Object.assign({}, state, {
      walletUnlockerModalOpen: action.payload.open,
      walletUnlockerError: null,
    });
  case 'WALLET_UNLOCKER_MODAL_CALLBACK':
    return Object.assign({}, state, {
      walletUnlockerCallback: action.payload.callback,
    });
  case 'WALLET_UNLOCKER_ERROR':
    return Object.assign({}, state, {
      walletUnlockerError: action.payload.error,
    });
  default:
    return state;
  }
};


export default authReducer;
