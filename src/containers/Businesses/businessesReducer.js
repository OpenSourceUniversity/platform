const INITIAL_STATE = {
  isFetching: false,
  error: null,
  businesses: [],
  next: null,
};

export default function businessesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_BUSINESSES_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_BUSINESSES_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      businesses: state.businesses.concat(action.results),
      next: action.next,
    });
  case 'FETCH_BUSINESSES_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FETCHED_BUSINESSES':
    return Object.assign({}, state, {
      isFetching: false,
      businesses: [],
      next: null,
      error: null,
    });
  default:
    return state;
  }
}
