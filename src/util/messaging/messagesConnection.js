import store from '../../store';
import Config from '../../config';
import fetchUnreadMessagesCount from './fetchUnreadMessagesCount';
import messageRecivedInNewThread from './messageRecivedInNewThread';


export default function messagesConnection() {
  return function action(dispatch) {
    let ws;
    let wsClose;
    const { bdnWebsocket } = Config.network;

    const authEthAddress = store.getState().auth.address.slice(2);
    const authSignature = store.getState().auth.signedAddress;

    function wsOpen(event) {
      console.log('Messages open', event);
      dispatch(fetchUnreadMessagesCount());
    }

    function wsError(event) {
      console.log('Messages error', event);
    }

    function wsMessage(event) {
      const data = JSON.parse(event.data);
      const { threadsById } = store.getState().messaging;
      if (threadsById[data.thread]) {
        dispatch({
          type: 'MESSAGE_RECEIVED',
          payload: data,
        });
      } else {
        dispatch(messageRecivedInNewThread(data));
      }
    }

    function connect() {
      const queryString = `?auth_eth_address=${authEthAddress}&auth_signature=${authSignature}`;
      const endpoint = `${bdnWebsocket}messaging/${queryString}`;
      ws = new WebSocket(endpoint);
      ws.onmessage = wsMessage;
      ws.onopen = wsOpen;
      ws.onerror = wsError;
      ws.onclose = wsClose;
    }

    wsClose = function close(event) {
      console.log('Messages close', event);
      setTimeout(() => {
        connect();
      }, 3500);
    };

    connect();
  };
}
