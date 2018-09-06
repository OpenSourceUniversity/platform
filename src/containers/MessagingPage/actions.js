import axios from 'axios';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;


export function resetMessages() {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'RESET_MESSAGES',
    });
  };
}

export function markAsRead(id) {
  const axiosConfig = {
    headers: {
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    },
  };
  const url = `${bdnUrl}api/v1/messages/${id}/mark_as_read_by_id/`;
  axios.post(url, null, axiosConfig);
}

export function resetActiveThread() {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'RESET_ACTIVE_THREAD',
    });
  };
}
