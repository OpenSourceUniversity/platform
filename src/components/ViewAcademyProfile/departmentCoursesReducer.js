const INITIAL_STATE = {
  isFetching: false,
  error: null,
  courses: [],
  next: null,
};

export default function departmentCoursesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_DEPARTMENT_COURSES_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_DEPARTMENT_COURSES_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      courses: action.results,
      next: action.next,
    });
  case 'FETCH_DEPARTMENT_COURSES_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_DEPARTMENT_COURSES':
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
