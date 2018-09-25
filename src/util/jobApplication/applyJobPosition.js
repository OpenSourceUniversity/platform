import axios from 'axios';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;


export default function applyJobPosition(id) {
  return function action(dispatch) {
    dispatch({
      type: 'APPLY_JOB_POSITION_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const data = {
      job: id,
    };
    const url = `${bdnUrl}api/v1/job-applications/`;
    axios.post(url, data, axiosConfig).then(() => {
      dispatch({
        type: 'APPLY_JOB_POSITION_SUCCESS',
      });
    }).catch(() => {
      dispatch({
        type: 'APPLY_JOB_POSITION_FAILURE',
        error: 'Fail',
      });
    });
  };
}
