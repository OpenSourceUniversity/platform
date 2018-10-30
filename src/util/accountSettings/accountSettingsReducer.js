const initialState = {
  accountSettings: {},
  error: null,
  isFetching: false,
  isSaved: false,
};


const accountSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_ACCOUNT_SETTINGS_REQUEST':
    return Object.assign({}, state, {
      error: null,
      isFetching: true,
      isSaved: false,
    });
  case 'SAVE_WALLET_ON_BDN':
    return Object.assign({}, state, {
      error: null,
      isFetching: false,
      isSaved: true,
    });
  case 'SAVE_EMAIL_SETTINGS':
    return Object.assign({}, state, {
      error: null,
      isFetching: false,
      isSaved: true,
    });
  case 'GET_DEFAULT_SETTINGS':
    return Object.assign({}, state, {
      accountSettings: action.accountSettings,
      error: null,
      isFetching: false,
      isSaved: false,
    });
  case 'ACCOUNT_SETTINGS_ERROR':
    return Object.assign({}, state, {
      error: action.error,
      isFetching: false,
      isSaved: false,
    });
  default:
    return state;
  }
};


export default accountSettingsReducer;
