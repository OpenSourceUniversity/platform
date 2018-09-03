import fetchUnreadMessagesCount from './fetchUnreadMessagesCount';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;

export default function fetchMessages(threadId, urlNext) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_MESSAGES_REQUEST',
    });
    let url = urlNext;
    if (!url) {
      url = `${bdnUrl}api/v1/messages/?thread_id=${threadId}`;
    }
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_MESSAGES_FAILURE',
            error: body.error,
          });
        } else {
          const { threadsById } = store.getState().messaging;
          const buffer = {};
          buffer[threadId] = threadsById[threadId];
          if (buffer[threadId]) {
            buffer[threadId].unread_count = 0;
          }
          dispatch({
            type: 'FETCH_MESSAGES_SUCCESS',
            messages: body.results,
            next: body.next,
            activeThread: threadId,
            threadToUpdate: buffer,
          });
          dispatch(fetchUnreadMessagesCount());
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_MESSAGES_FAILURE',
          error,
        });
      });
  };
}
