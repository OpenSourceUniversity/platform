import store from '../../store';
import Config from '../../config';


export default function notificationsConnection() {
  return function action(dispatch) {
    let ws;
    let wsClose;
    const { bdnWebsocket } = Config.network;

    const authEthAddress = store.getState().auth.address.slice(2);
    const authSignature = store.getState().auth.signedAddress;
    /* eslint-disable global-require */
    const notificationSound = require('../../sounds/osu_notification.mp3');
    /* eslint-enable global-require */
    const audio = new Audio(notificationSound);

    function wsOpen() {
    }

    function wsError() {
    }

    function wsMessage(event) {
      const data = JSON.parse(event.data);
      audio.play();
      dispatch({
        type: 'NOTIFICATION_RECEIVED',
        payload: data,
      });
    }

    function connect() {
      const queryString = `?auth_eth_address=${authEthAddress}&auth_signature=${authSignature}`;
      const endpoint = `${bdnWebsocket}notifications/${queryString}`;
      ws = new WebSocket(endpoint);
      ws.onmessage = wsMessage;
      ws.onopen = wsOpen;
      ws.onerror = wsError;
      ws.onclose = wsClose;
    }

    wsClose = function close() {
      setTimeout(() => {
        connect();
      }, 3500);
    };

    connect();
  };
}
