const initialState = {
  checkJobApplication: null,
  jobApplications: [],
  isFetching: false,
  nextUrl: null,
  error: null,
};


const jobApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_JOB_APPLICATIONS_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  case 'JOB_APPLICATIONS_RESET':
    return Object.assign({}, state, {
      isFetching: false,
      jobApplications: [],
      error: null,
    });
  case 'JOB_APPLICATIONS_DUPLICATE':
    return Object.assign({}, state, {
      isFetching: false,
    });
  case 'FETCH_JOB_APPLICATIONS_SUCCESS':
    return Object.assign({}, state, {
      jobApplications: state.jobApplications.concat(action.jobApplications.results),
      nextUrl: action.nextUrl,
      isFetching: false,
      error: null,
    });
  case 'FETCH_JOB_APPLICATIONS_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error,
    });
  case 'CHECK_JOB_APPLICATION_SUCCESS':
    return Object.assign({}, state, {
      checkJobApplication: action.checkJobApplication,
      isFetching: false,
      error: null,
    });
  case 'CHECK_JOB_APPLICATION_FAILURE':
    return Object.assign({}, state, {
      checkJobApplication: null,
      isFetching: false,
      error: action.error,
    });
  case 'APPLY_JOB_POSITION_REQUEST':
    return Object.assign({}, state, {
      error: null,
    });
  case 'APPLY_JOB_POSITION_SUCCESS':
    return Object.assign({}, state, {
      error: null,
    });
  case 'APPLY_JOB_POSITION_FAILURE':
    return Object.assign({}, state, {
      error: action.error,
    });
  default:
    return state;
  }
};


export default jobApplicationReducer;
