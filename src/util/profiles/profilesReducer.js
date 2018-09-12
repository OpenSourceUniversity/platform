const INITIAL_STATE = {
  isFetching: false,
  error: null,
  profiles: {
    first_name: null,
    last_name: null,
    learner_position: null,
    learner_specialisation: null,
    learner_about: null,
    public_profile: null,
    learner_email: null,
    learner_site: null,
    phone_number: null,
    learner_country: null,
    learner_avatar: null,
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
  profileView: {
    first_name: null,
    last_name: null,
    learner_position: null,
    learner_specialisation: null,
    learner_about: null,
    public_profile: null,
    learner_site: null,
    phone_number: null,
    learner_country: null,
    learner_avatar: null,
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
  isPublic: false,
  certificates: [],
  profileViewIsFetching: false,
  profileViewError: null,
  isSaved: false,
  learnerIsCreated: JSON.parse(localStorage.getItem('learnerIsCreated')),
  academyIsCreated: JSON.parse(localStorage.getItem('academyIsCreated')),
  businessIsCreated: JSON.parse(localStorage.getItem('businessIsCreated')),
};

export default function profilesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SETTINGS_GET_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'SETTINGS_GET_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      profiles: action.result,
      error: null,
    });
  case 'SETTINGS_GET_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      isSaved: false,
      error: action.error.message,
    });
  case 'SETTINGS_SAVE_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'SETTINGS_SAVE_SUCCESS':
    return Object.assign({}, state, {
      isSaved: true,
      isFetching: false,
      error: null,
    });
  case 'SETTINGS_SAVE_RESET_STATES':
    return Object.assign({}, state, {
      isFetching: false,
      isSaved: false,
      error: null,
    });
  case 'ACCOUNTS_VALIDATED':
    return Object.assign({}, state, {
      learnerIsCreated: action.learnerAccount,
      academyIsCreated: action.academyAccount,
      businessIsCreated: action.businessAccount,
    });
  case 'PROFILE_GET_REQUEST':
    return Object.assign({}, state, {
      profileViewIsFetching: true,
      profileViewError: null,
      isPublic: true,
    });
  case 'PROFILE_GET_FAILURE':
    return Object.assign({}, state, {
      profileViewIsFetching: false,
      profileViewError: action.error,
      isPublic: true,
    });
  case 'PROFILE_GET_SUCCESS':
    return Object.assign({}, state, {
      profileViewIsFetching: false,
      profileView: action.result,
      profileViewError: null,
      isPublic: action.isPublic,
    });
  case 'VIEW_CERTIFICATES_GET_SUCCESS':
    return Object.assign({}, state, {
      certificates: action.certificates,
    });
  default:
    return state;
  }
}
