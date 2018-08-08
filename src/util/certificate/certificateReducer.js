const INITIAL_STATE = {
  isFetching: false,
  error: null,
  certificate: 'null',
};

export default function certificateReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_CERTIFICATE_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_CERTIFICATE_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      certificate: action.result,
    });
  case 'FETCH_CERTIFICATE_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FETCHED_CERTIFICATE':
    return Object.assign({}, state, {
      isFetching: false,
      certificate: 'null',
      error: null,
    });
  default:
    return state;
  }
}
