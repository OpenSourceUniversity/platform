

export default function storeSearchType(searchType) {
  return function action(dispatch) {
    localStorage.setItem('searchType', searchType);
    dispatch({
      type: 'SEARCH_TYPE_STORED',
      payload: {
        searchType,
      },
    });
  };
}
