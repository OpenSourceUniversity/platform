import axios from 'axios';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;


export default function signUpStep(data) {
  return function action() {
    const SIGN_UP_URL = `${bdnUrl}api/v1/signup/`;
    let axiosConfig = null;
    const signature = store.getState().auth.signedAddress;
    const ethAddress = store.getState().auth.address;
    if (signature && ethAddress) {
      axiosConfig = {
        headers: {
          'Auth-Signature': signature,
          'Auth-Eth-Address': ethAddress.slice(2),
        },
      };
    }
    axios.post(SIGN_UP_URL, data, axiosConfig);
  };
}
