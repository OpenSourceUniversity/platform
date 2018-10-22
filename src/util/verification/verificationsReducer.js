const INITIAL_STATE = {
  isFetching: false,
  error: null,
  verifications: [],
  nextUrl: null,
};

export default function verificationsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_VERIFICATIONS_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_VERIFICATIONS_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      verifications: state.verifications.concat(action.verifications),
      nextUrl: action.nextUrl,
    });
  case 'FETCH_VERIFICATIONS_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'FETCH_VERIFICATIONS_RESET':
    return Object.assign({}, state, {
      isFetching: false,
      verifications: [],
      error: null,
      nextUrl: null,
    });
  default:
    return state;
  }
}
