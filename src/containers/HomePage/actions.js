const START_URL = 'http://localhost:8000/api/v1/courses/?offset=0&limit=4';


export function fetchCourses(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_COURSES_REQUEST',
    });
    return fetch(url)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_COURSES_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_COURSES_SUCCESS',
            results: body.results,
            next: body.next,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_COURSES_FAILURE',
          error,
        });
      });
  };
}
