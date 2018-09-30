const INITIAL_STATE = {
  isFetching: false,
  error: null,
  message: null,
  isFetchingModal: false,
  course: {
    external_link: 'https://os.university/',
    provider: {
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
  academy: {
    academy_logo: null,
  },
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
      message: null,
      course: action.course,
      academy: action.academy,
      error: null,
    });
  case 'FETCH_COURSE_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'MODAL_COURSE_REQUEST':
    return Object.assign({}, state, {
      isFetchingDelete: true,
    });
  case 'DELETE_COURSE_SUCCESS':
    return Object.assign({}, state, {
      isFetchingDelete: false,
      message: action.result,
    });
  case 'MARK_FEATURED_COURSE_SUCCESS':
    return Object.assign({}, state, {
      isFetchingDelete: false,
      message: action.result,
    });
  case 'MARK_FEATURED_COURSE_FAILURE':
    return Object.assign({}, state, {
      isFetchingDelete: false,
      error: action.error.message,
      message: null,
    });
  case 'DELETE_COURSE_FAILURE':
    return Object.assign({}, state, {
      isFetchingDelete: false,
      error: action.error,
      message: null,
    });
  case 'RESET_FETCHED_COURSE':
    return Object.assign({}, state, {
      isFetching: false,
      course: 'null',
      error: null,
    });
  case 'MODAL_COURSE_MESSAGES_RESET':
    return Object.assign({}, state, {
      isFetchingDelete: false,
      message: null,
      error: null,
    });
  default:
    return state;
  }
}
