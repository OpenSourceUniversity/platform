import store from '../../store';
import Config from '../../config';


const { bdnUrl } = Config.network;
const LIMIT_PAGINATION = 20;
const START_URL = `${bdnUrl}api/v1/profile/get_learners/?offset=0&limit=${LIMIT_PAGINATION}`;


export function fetchLearners(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_LEARNERS_REQUEST',
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
            type: 'FETCH_LEARNERS_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_LEARNERS_SUCCESS',
            results: body.results,
            next: body.next,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_LEARNERS_FAILURE',
          error,
        });
      });
  };
}

export function resetLearners() {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'RESET_FETCHED_LEARNERS',
    });
  };
}
