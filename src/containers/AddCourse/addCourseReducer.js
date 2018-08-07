const INITIAL_STATE = {
  isAdding: false,
  isAdded: false,
  courseDefault: {
    skills: [],
    industries: [],
    languages: [],
  },
};


export default function addCourseReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_COURSE_REQUEST':
    return Object.assign({}, state, {
      isAdding: true,
      error: null,
    });
  case 'ADD_COURSE_SUCCESS':
    return Object.assign({}, state, {
      isAdded: true,
      isAdding: false,
      error: null,
    });
  case 'ADD_COURSE_FAILURE':
    return Object.assign({}, state, {
      isAdding: false,
      error: action.error.message,
    });
  case 'RESET_COURSE_VALUES':
    return Object.assign({}, state, {
      isAdding: false,
      error: null,
      courseDefault: {},
    });
  case 'COURSE_GET_FAILURE':
    return Object.assign({}, state, {
      isAdding: false,
      error: action.error.message,
      courseDefault: {},
    });
  case 'COURSE_GET_SUCCESS':
    return Object.assign({}, state, {
      isAdding: false,
      error: null,
      courseDefault: action.result,
    });
  default:
    return state;
  }
}
