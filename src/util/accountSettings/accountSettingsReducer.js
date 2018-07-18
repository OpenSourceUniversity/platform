const INITIAL_STATE = {
  isFetching: false,
  error: null,
  accounts: {
    first_name: null,
    last_name: null,
    learner_position: null,
    learner_specialisation: null,
    learner_about: null,
    learner_email: null,
    learner_site: null,
    phone_number: null,
    learner_country: null,
    lerner_avatar: null,
    academy_name: null,
    academy_website: null,
    academy_email: null,
    academy_country: null,
    academy_about: null,
    academy_logo: null,
    company_name: null,
    company_website: null,
    company_email: null,
    company_country: null,
    company_about: null,
    company_logo: null,
  },
  isSaved: false,
  lernerIsCreated: JSON.parse(localStorage.getItem('lernerIsCreated')),
  academyIsCreated: JSON.parse(localStorage.getItem('academyIsCreated')),
  businessIsCreated: JSON.parse(localStorage.getItem('businessIsCreated')),
};

export default function accountSettingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SETTINGS_GET_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'SETTINGS_GET_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      accounts: action.result,
      error: null,
    });
  case 'SETTINGS_GET_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      isSaved: false,
      error: action.error.message,
    });
  case 'SETTINGS_SAVE_SUCCESS':
    return Object.assign({}, state, {
      isSaved: true,
      error: null,
    });
  case 'RESET_STATES':
    return Object.assign({}, state, {
      isFetching: false,
      isSaved: false,
      error: null,
    });
  case 'ACCOUNTS_VALIDATED':
    return Object.assign({}, state, {
      lernerIsCreated: action.lernerAccount,
      academyIsCreated: action.academyAccount,
      businessIsCreated: action.businessAccount,
    });
  default:
    return state;
  }
}
