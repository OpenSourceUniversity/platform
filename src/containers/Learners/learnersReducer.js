const INITIAL_STATE = {
  isFetching: false,
  error: null,
  learners: [
    {
      user:
      {
        username: null,
      },
      full_name: null,
      learner_position: null,
      learner_specialisation: null,
      learner_about: null,
      learner_country: null,
      learner_avatar: null,
      certificates_count: null,
    },
  ],
  next: null,
};

export default function learnersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_LEARNERS_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_LEARNERS_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      learners: action.results,
      next: action.next,
    });
  case 'FETCH_LEARNERS_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FETCHED_LEARNERS':
    return Object.assign({}, state, {
      isFetching: false,
      learners: [],
      next: null,
      error: null,
    });
  default:
    return state;
  }
}
