import axios from 'axios';
import store from '../../store';
import Config from '../../config';
import setOnBoardingActiveElement from '../../util/auth/setOnBoardingActiveElement';

const { bdnUrl } = Config.network;


export default function signUpStep(data) {
  return function action(dispatch) {
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
    axios.post(SIGN_UP_URL, data, axiosConfig).then(() => {
      dispatch({
        type: 'SIGN_UP_ERROR',
        payload: {
          loginError: null,
        },
      });
    }).catch((error) => {
      dispatch({
        type: 'SIGN_UP_ERROR',
        payload: {
          loginError: error.response.data.error,
        },
      });
      dispatch(setOnBoardingActiveElement('presignup'));
    });
  };
}
