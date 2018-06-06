export default function autocomplete(query) {
  return function action(dispatch) {
    dispatch({
      type: 'AUTOCOMPLETE_REQUEST',
    });
    const url = `http://localhost:8000/api/v1/courses/autocomplete/?q=${query}`;
    return fetch(url)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'AUTOCOMPLETE_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'AUTOCOMPLETE_SUCCESS',
            suggestions: body,
          });
        }
      });
  };
}
