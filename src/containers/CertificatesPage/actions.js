export function fetchCertificates() {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_CERTIFICATES_REQUEST',
    });
    return fetch('http://localhost:8000/api/v1/certificates/')
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_CERTIFICATES_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_CERTIFICATES_SUCCESS',
            certificates: body,
          });
        }
      });
  };
}
