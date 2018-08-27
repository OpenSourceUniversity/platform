import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;


export function getDefaultValues(id) {
  return function action(dispatch) {
    dispatch({
      type: 'RESET_JOB_VALUES',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    const url = `${bdnUrl}api/v1/jobs/${id}/get_by_id/`;

    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'JOB_GET_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'JOB_GET_SUCCESS',
            result: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'JOB_GET_FAILURE',
          error,
        });
      });
  };
}


export function resetAddJobProps() {
  return function action(dispatch) {
    dispatch({
      type: 'RESET_JOB_VALUES',
    });
  };
}
