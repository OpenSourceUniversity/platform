const initialState = {
  suggestions: [],
  industries: [],
  filteredIndustries: [],
  filterType: null,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'AUTOCOMPLETE_SUCCESS':
    return Object.assign({}, state, {
      suggestions: action.suggestions,
    });
  case 'FETCH_INDUSTRIES_SUCCESS':
    return Object.assign({}, state, {
      industries: action.industries,
      filterType: action.filterType,
    });
  case 'FILTER_INDUSTRY_ADDED':
    return Object.assign({}, state, {
      filteredIndustries: [...state.filteredIndustries, action.id],
    });
  case 'FILTER_INDUSTRY_REMOVED':
    return Object.assign({}, state, {
      filteredIndustries: state.filteredIndustries.filter(item => item !== action.id),
    });
  default:
    return state;
  }
};


export default authReducer;
