const INITIAL_STATE = {
  txHash: null,
  txError: null,
  isVerifying: false,
  verification: {
    certificate: {
      verified: null,
    },
  },
  fetchError: null,
};


export default function verificationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'VERIFY_REQUEST':
    return Object.assign({}, state, {
      isVerifying: true,
    });
  case 'VERIFY_TX_STORED':
    return Object.assign({}, state, {
      txHash: action.payload.txHash,
      isVerifying: false,
    });
  case 'VERIFY_TX_FAILED':
    return Object.assign({}, state, {
      txError: action.payload.error,
      isVerifying: false,
    });
  case 'FETCH_VERIFICATION_SUCCESS':
    return Object.assign({}, state, {
      verification: action.verification,
    });
  case 'FETCH_VERIFICATION_FAILURE':
    return Object.assign({}, state, {
      fetchError: action.error,
    });
  case 'RESET_VERIFICATION_ERROR_MESSAGE':
    return Object.assign({}, state, {
      txError: null,
    });
  default:
    return state;
  }
}
