const INITIAL_STATE = {
  isFetching: false,
  isUpdating: false,
  error: null,
  certificate: {
    verifications: [],
  },
  isDeleting: false,
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
  case 'UPDATE_CERTIFICATE_REQUEST':
    return Object.assign({}, state, {
      isUpdating: true,
      error: null,
    });
  case 'UPDATE_CERTIFICATE_SUCCESS':
    return Object.assign({}, state, {
      isUpdating: false,
      error: null,
    });
  case 'UPDATE_CERTIFICATE_FAILURE':
    return Object.assign({}, state, {
      isUpdating: false,
      error: action.error.message,
    });
  case 'DELETE_CERTIFICATE_REQUEST':
    return Object.assign({}, state, {
      isDeleting: true,
      error: null,
    });
  case 'DELETE_CERTIFICATE_SUCCESS':
    return Object.assign({}, state, {
      isDeleting: false,
      error: null,
    });
  case 'DELETE_CERTIFICATE_FAILURE':
    return Object.assign({}, state, {
      isDeleting: false,
      error: action.error.message,
    });
  default:
    return state;
  }
}
