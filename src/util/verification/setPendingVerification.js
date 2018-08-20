import axios from 'axios';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;


export default function setPendingVerification(id, callback) {
  return function action(dispatch) {
    const url = `${bdnUrl}api/v1/verifications/${id}/set_pending_by_id/`;
    dispatch({
      type: 'UPDATE_CERTIFICATE_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    axios.post(url, null, axiosConfig).then(() => {
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
