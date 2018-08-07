const INITIAL_STATE = {
  isAdding: false,
  isAdded: false,
  jobDefault: {
    skills: [],
    industries: [],
    languages: [],
  },
};


export default function addJobReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_JOB_REQUEST':
    return Object.assign({}, state, {
      isAdding: true,
      error: null,
    });
  case 'ADD_JOB_SUCCESS':
    return Object.assign({}, state, {
      isAdded: true,
      isAdding: false,
      error: null,
    });
  case 'ADD_JOB_FAILURE':
    return Object.assign({}, state, {
      isAdding: false,
      error: action.error.message,
    });
  case 'RESET_JOB_VALUES':
    return Object.assign({}, state, {
      isAdding: false,
      error: null,
      jobDefault: {},
    });
  case 'JOB_GET_FAILURE':
    return Object.assign({}, state, {
      isAdding: false,
      error: action.error.message,
      jobDefault: {},
    });
  case 'JOB_GET_SUCCESS':
    return Object.assign({}, state, {
      isAdding: false,
      error: null,
      jobDefault: action.result,
    });
  default:
    return state;
  }
}
