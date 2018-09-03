import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;

export default function messageRecivedInNewThread(messageData) {
  return function dispatcher(dispatch) {
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    const url = `${bdnUrl}api/v1/messaging/threads/${messageData.thread}`;
    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          console.log(body.error);
        } else {
          const threadById = {};
          threadById[body.id] = body;
          threadById[body.id].unread_count -= 1;
          dispatch({
            type: 'NEW_THREAD_RECEIVED',
            thread: body,
            threadById,
          });
          dispatch({
            type: 'MESSAGE_RECEIVED',
            payload: messageData,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
