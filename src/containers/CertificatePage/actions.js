// import { Buffer } from 'buffer';
import axios from 'axios';
import store from '../../store';
import Config from '../../config';


export function requireVerification(certificateData) {
  return function action() {
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const { bdnUrl } = Config.network;
    axios.post(`${bdnUrl}api/v1/verification/`, certificateData, axiosConfig).then(() => {
    }).catch(() => {
      console.log('error');
    });
  };
}
