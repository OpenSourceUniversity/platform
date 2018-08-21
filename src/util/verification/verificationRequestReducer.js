const INITIAL_STATE = {
  requestSuccess: false,
  requestSending: false,
  requestError: null,
};


export default function verificationRequestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'VERIFICATION_REQUEST':
    return Object.assign({}, state, {
      requestSending: true,
      requestSuccess: false,
      requestError: null,
    });
  case 'VERIFICATION_REQUEST_SUCCESS':
    return Object.assign({}, state, {
      requestSuccess: true,
      requestSending: false,
      requestError: null,
    });
  case 'VERIFICATION_REQUEST_FAILURE':
    return Object.assign({}, state, {
      requestError: action.error.response.data.error,
      requestSending: false,
      requestSuccess: false,
    });
  default:
    return state;
  }
}
