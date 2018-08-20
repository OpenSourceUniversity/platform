import axios from 'axios';
import store from '../../store';
import Config from '../../config';
import fetchVerifications from './fetchVerifications';

const { bdnUrl } = Config.network;


export default function rejectVerification(id) {
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
    const postData = {
      id,
    };
    axios.post(`${bdnUrl}api/v1/verifications/reject_by_id/`, postData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_SUCCESS',
      });
      dispatch(fetchVerifications());
    }).catch(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_FAILURE',
        error: 'Fail',
      });
    });
  };
}
