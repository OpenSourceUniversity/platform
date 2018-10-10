import axios from 'axios';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;
const ADD_CERTIFICATE_URL = `${bdnUrl}api/v1/certificates/`;


export default function addCertificate(certificateData) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_CERTIFICATE_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };

    axios.post(ADD_CERTIFICATE_URL, certificateData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_SUCCESS',
      });
    }).catch((error) => {
      dispatch({
        type: 'ADD_CERTIFICATE_FAILURE',
        error: error.response.data.error,
      });
    });
  };
}
