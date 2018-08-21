import store from '../../store';


export default function notificationsConnection() {
  return function action(dispatch) {
    let ws;
    let wsClose;

    const authEthAddress = store.getState().auth.address.slice(2);
    const authSignature = store.getState().auth.signedAddress;

    function wsOpen(event) {
      console.log('open', event);
    }

    function wsError(event) {
      console.log('error', event);
    }

    function wsMessage(event) {
      const data = JSON.parse(event.data);
      console.log('message', data);
    }

    function connect() {
      const queryString = `?auth_eth_address=${authEthAddress}&auth_signature=${authSignature}`;
      const endpoint = `ws://localhost:8000/notifications/${queryString}`;
      ws = new WebSocket(endpoint);
      ws.onmessage = wsMessage;
      ws.onopen = wsOpen;
      ws.onerror = wsError;
      ws.onclose = wsClose;
    }

    wsClose = function close(event) {
      console.log('close', event);
      setTimeout(() => {
        connect();
      }, 3500);
    };

    connect();
  };
}
