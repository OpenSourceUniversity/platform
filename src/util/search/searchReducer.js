const initialState = {
  suggestions: [],
  categories: [],
  filteredCategories: [],
  filterType: null,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'AUTOCOMPLETE_SUCCESS':
    return Object.assign({}, state, {
      suggestions: action.suggestions,
    });
  case 'FETCH_CATEGORIES_SUCCESS':
    return Object.assign({}, state, {
      categories: action.categories,
      filterType: action.filterType,
    });
  case 'FILTER_CATEGORY_ADDED':
    return Object.assign({}, state, {
      filteredCategories: [...state.filteredCategories, action.id],
    });
  case 'FILTER_CATEGORY_REMOVED':
    return Object.assign({}, state, {
      filteredCategories: state.filteredCategories.filter(item => item !== action.id),
    });
  default:
    return state;
  }
};


export default authReducer;
