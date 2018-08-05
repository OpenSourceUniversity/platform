const INITIAL_STATE = {
  isFetching: false,
  error: null,
  businesses: [
    {
      user:
      {
        username: null,
      },
      company_name: null,
      company_website: null,
      company_email: null,
      company_country: null,
      company_about: null,
      company_logo: null,
      jobs_count: null,
    },
  ],
  next: null,
};

export default function businessesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_BUSINESSES_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_BUSINESSES_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      businesses: action.results,
      next: action.next,
    });
  case 'FETCH_BUSINESSES_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FETCHED_BUSINESSES':
    return Object.assign({}, state, {
      isFetching: false,
      businesses: [],
      next: null,
      error: null,
    });
  default:
    return state;
  }
}
