const INITIAL_STATE = {
  isFetching: false,
  error: null,
  jobs: [],
  featuredJobs: [],
  next: null,
};

export default function jobsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_JOBS_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_JOBS_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      jobs: action.results,
      next: action.next,
    });
  case 'FETCH_JOBS_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FETCHED_JOBS':
    return Object.assign({}, state, {
      isFetching: false,
      jobs: [],
      next: null,
      error: null,
    });
  case 'FETCH_FEATURED_JOBS_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_FEATURED_JOBS_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      featuredJobs: action.results,
      next: action.next,
    });
  case 'FETCH_FEATURED_JOBS_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FEATURED_FETCHED_JOBS':
    return Object.assign({}, state, {
      isFetching: false,
      featuredJobs: [],
      next: null,
      error: null,
    });
  default:
    return state;
  }
}
