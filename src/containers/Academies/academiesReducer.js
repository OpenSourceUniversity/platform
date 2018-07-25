const INITIAL_STATE = {
  isFetching: false,
  error: null,
  academies: [
    {
      user:
      {
        username: null,
      },
      academy_name: null,
      academy_website: null,
      academy_email: null,
      academy_country: null,
      academy_about: null,
    },
  ],
  next: null,
};

export default function academiesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_ACADEMIES_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_ACADEMIES_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      academies: action.results,
      next: action.next,
    });
  case 'FETCH_ACADEMIES_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FETCHED_ACADEMIES':
    return Object.assign({}, state, {
      isFetching: false,
      academies: [],
      next: null,
      error: null,
    });
  default:
    return state;
  }
}
