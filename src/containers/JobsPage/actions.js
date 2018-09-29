import store from '../../store';
import Config from '../../config';


const { bdnUrl } = Config.network;
const START_URL = `${bdnUrl}api/v1/jobs/?offset=0&limit=40`;


export function fetchJobs(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'RESET_FETCHED_JOBS',
    });
    dispatch({
      type: 'FETCH_JOBS_REQUEST',
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
            type: 'FETCH_JOBS_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_JOBS_SUCCESS',
            results: body.results,
            next: body.next,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_JOBS_FAILURE',
          error,
        });
      });
  };
}
