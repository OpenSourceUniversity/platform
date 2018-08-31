import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;

export default function fetchUnreadMessagesCount() {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_UNREAD_COUNT_REQUEST',
    });
    const url = `${bdnUrl}api/v1/messaging/threads/get_unread_count/`;
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_UNREAD_COUNT_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_UNREAD_COUNT_SUCCESS',
            unread_count: body.unread_messages_count,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_UNREAD_COUNT_FAILURE',
          error,
        });
      });
  };
}
