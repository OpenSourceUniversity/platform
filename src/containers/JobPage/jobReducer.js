const INITIAL_STATE = {
  isFetching: false,
  error: null,
  job: {
    external_link: 'https://os.university/',
    company: {
      name: null,
      eth_address: null,
    },
    categories: [
      {
        name: null,
      },
    ],
    skills: [
    ],
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
      job: action.result,
    });
  case 'FETCH_JOB_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FETCHED_JOB':
    return Object.assign({}, state, {
      isFetching: false,
      job: 'null',
      error: null,
    });
  default:
    return state;
  }
}
