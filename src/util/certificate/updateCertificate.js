import axios from 'axios';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;
const UPDATE_CERTIFICATE_URL = `${bdnUrl}api/v1/certificates/update_certificate_by_id/`;


export default function updateCertificate(certificateData, callback) {
  return function action(dispatch) {
    dispatch({
      type: 'UPDATE_CERTIFICATE_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };

    axios.post(UPDATE_CERTIFICATE_URL, certificateData, axiosConfig).then(() => {
      dispatch({
        type: 'UPDATE_CERTIFICATE_SUCCESS',
      });
      if (callback) {
        callback();
      }
    }).catch((error) => {
      dispatch({
        type: 'UPDATE_CERTIFICATE_FAILURE',
        error,
      });
      if (callback) {
        callback(error);
      }
    });
  };
}
