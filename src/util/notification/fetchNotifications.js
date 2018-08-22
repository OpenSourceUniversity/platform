import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;
const START_URL = `${bdnUrl}api/v1/notifications/`;

export default function fetchNotifications(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_NOTIFICATIONS_REQUEST',
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
            type: 'FETCH_NOTIFICATIONS_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_NOTIFICATIONS_SUCCESS',
            notifications: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_NOTIFICATIONS_FAILURE',
          error,
        });
      });
  };
}
