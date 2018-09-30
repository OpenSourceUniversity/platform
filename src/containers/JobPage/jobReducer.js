const INITIAL_STATE = {
  isFetching: false,
  error: null,
  message: null,
  isFetchingModal: false,
  job: {
    external_link: 'https://os.university/',
    company: {
      name: null,
      eth_address: null,
    },
    industries: [
      {
        name: null,
      },
    ],
    skills: [
    ],
  },
  company: {
    company_logo: null,
  },
};

export default function jobReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_JOB_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_JOB_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      job: action.job,
      company: action.company,
    });
  case 'FETCH_JOB_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'MODAL_JOB_REQUEST':
    return Object.assign({}, state, {
      isFetchingDelete: true,
    });
  case 'DELETE_JOB_SUCCESS':
    return Object.assign({}, state, {
      isFetchingDelete: false,
      message: action.result,
    });
  case 'MARK_FEATURED_JOB_SUCCESS':
    return Object.assign({}, state, {
      isFetchingDelete: false,
      message: action.result,
    });
  case 'MARK_FEATURED_JOB_FAILURE':
    return Object.assign({}, state, {
      isFetchingDelete: false,
      error: action.error.message,
      message: null,
    });
  case 'DELETE_JOB_FAILURE':
    return Object.assign({}, state, {
      isFetchingDelete: false,
      error: action.error,
      message: null,
    });
  case 'RESET_FETCHED_JOB':
    return Object.assign({}, state, {
      isFetching: false,
      job: 'null',
      error: null,
    });
  case 'MODAL_JOB_MESSAGES_RESET':
    return Object.assign({}, state, {
      isFetchingDelete: false,
      message: null,
      error: null,
    });
  default:
    return state;
  }
}
