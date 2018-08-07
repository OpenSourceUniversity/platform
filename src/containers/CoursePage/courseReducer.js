const INITIAL_STATE = {
  isFetching: false,
  error: null,
  course: {
    external_link: 'https://os.university/',
    provider: {
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
  academy: {
    academy_logo: null,
  }
};

export default function courseReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_COURSE_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_COURSE_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      course: action.course,
      academy: action.academy,
    });
  case 'FETCH_COURSE_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FETCHED_COURSE':
    return Object.assign({}, state, {
      isFetching: false,
      course: 'null',
      error: null,
    });
  default:
    return state;
  }
}
