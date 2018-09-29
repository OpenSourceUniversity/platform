const INITIAL_STATE = {
  isFetching: false,
  error: null,
  courses: [],
  featuredCourses: [],
  next: null,
};

export default function coursesReducer(state = INITIAL_STATE, action) {
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
  case 'FETCH_FEATURED_COURSES_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_FEATURED_COURSES_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      featuredCourses: state.featuredCourses.concat(action.results),
      next: action.next,
    });
  case 'FETCH_FEATURED_COURSES_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FEATURED_FETCHED_COURSES':
    return Object.assign({}, state, {
      isFetching: false,
      featuredCourses: [],
      next: null,
      error: null,
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
