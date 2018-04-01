const INITIAL_STATE = {
  isFetching: false,
  error: null,
  certificates: [],
};

export default function certificatesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_CERTIFICATES_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_CERTIFICATES_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      certificates: action.certificates,
    });
  case 'FETCH_CERTIFICATES_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  default:
    return state;
  }
}
