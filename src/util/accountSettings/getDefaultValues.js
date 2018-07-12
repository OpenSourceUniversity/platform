import store from '../../store';

const START_URL = '';

export default function getDefaultValues(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'SETTINGS_GET_REQUEST',
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
            type: 'SETTINGS_GET_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'SETTINGS_GET_SUCCESS',
            result: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'SETTINGS_GET_FAILURE',
          error,
        });
      });
  };
}