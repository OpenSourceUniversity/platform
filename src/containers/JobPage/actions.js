import store from '../../store';


const START_URL = 'http://localhost:8000/api/v1/jobs/fc01f5ba-c59f-49a2-b75b-4cd9f0d86b02';


export function fetchJob(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_JOB_REQUEST',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_JOB_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_JOB_SUCCESS',
            result: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_JOB_FAILURE',
          error,
        });
      });
  };
}
