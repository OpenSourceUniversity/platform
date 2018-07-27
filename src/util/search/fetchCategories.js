export default function fetchCategories(filterType) {
  return function action(dispatch) {
    dispatch({
      type: 'FETCH_CATEGORIES_REQUEST',
    });
    const url = 'http://localhost:8000/api/v1/categories/';
    return fetch(url)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_CATEGORIES_FAILED',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_CATEGORIES_SUCCESS',
            categories: body,
            filterType: filterType,
          });
        }
      });
  };
}
