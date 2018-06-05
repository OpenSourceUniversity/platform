const INITIAL_STATE = {
  isFetching: false,
  error: null,
  courses: [],
  next: null,
};

export default function certificatesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_COURSES_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_COURSES_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      courses: state.courses.concat(action.results),
      next: action.next,
    });
  case 'FETCH_COURSES_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FETCHED_COURSES':
    return Object.assign({}, state, {
      isFetching: false,
      courses: [],
      next: null,
      error: null,
    });
  default:
    return state;
  }
}
