const INITIAL_STATE = {
  txHash: null,
  txError: null,
  isVerifying: false,
};


export default function certificateReducer(state = INITIAL_STATE, action) {
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
  default:
    return state;
  }
}
