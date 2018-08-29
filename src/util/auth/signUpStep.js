import axios from 'axios';
import Config from '../../config';

const { bdnUrl } = Config.network;


export default function signUpStep(data) {
  return function action() {
    const SIGN_UP_URL = `${bdnUrl}api/v1/signup/`;
    axios.post(SIGN_UP_URL, data);
  };
}
