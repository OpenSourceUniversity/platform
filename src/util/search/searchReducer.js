const initialState = {
  suggestions: [],
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'AUTOCOMPLETE_SUCCESS':
    return Object.assign({}, state, {
      suggestions: action.suggestions,
    });
  default:
    return state;
  }
};


export default authReducer;
