const START_URL = 'http://localhost:8000/api/v1/certificates/1/';


export function fetchCertificate(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_CERTIFICATE_REQUEST',
    });
    return fetch(url)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_CERTIFICATE_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_CERTIFICATE_SUCCESS',
            result: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_CERTIFICATE_FAILURE',
          error,
        });
      });
  };
}
