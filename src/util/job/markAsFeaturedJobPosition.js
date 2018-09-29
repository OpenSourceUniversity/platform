import axios from 'axios';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;


export default function markAsFeaturedJobPosition(id) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_JOB_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    axios.post(`${bdnUrl}api/v1/jobs/${id}/mark_featured_by_id/`, null, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_JOB_SUCCESS',
      });
    }).catch((error) => {
      dispatch({
        type: 'ADD_JOB_FAILURE',
        error: {
          message: error.response.data.error,
        },
      });
    });
  };
}
