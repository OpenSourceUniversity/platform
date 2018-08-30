import axios from 'axios';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;


export default function sendMessage(messageData) {
  return function action(dispatch) {
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const url = `${bdnUrl}api/v1/messages/`;
    axios.post(url, messageData, axiosConfig).then((body) => {
      dispatch({
        type: 'MESSAGE_SENT',
        message: body.data,
      });
    });
  };
}
