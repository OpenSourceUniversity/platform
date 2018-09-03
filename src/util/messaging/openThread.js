import { createHashHistory } from 'history';
import axios from 'axios';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;


export default function openThread(threadData) {
  return function action() {
    console.log('openThread');
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const url = `${bdnUrl}api/v1/messaging/threads/`;
    axios.post(url, threadData, axiosConfig).then((body) => {
      const history = createHashHistory();
      history.push(`/messaging/${body.data.id}`);
    });
  };
}
