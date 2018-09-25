import { createHashHistory } from 'history';
import axios from 'axios';
import store from '../../store';
import Config from '../../config';
import fetchJobApplications from '../../util/jobApplication/fetchJobApplications';
import openThread from '../../util/messaging/openThread';

const { bdnUrl } = Config.network;


export default function changeApplicationState(id, state, ethAddress) {
  return function action(dispatch) {
    const url = `${bdnUrl}api/v1/job-applications/${id}/change_state_by_id/?state=${state}`;
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
      dispatch(fetchJobApplications());
      if (state === 'approve') {
        const threadData = {
          opponent_eth_address: ethAddress,
        };
        dispatch(openThread(threadData));
        const newPath = '/messaging/';
        const history = createHashHistory();
        history.push(newPath);
      }
    }).catch((error) => {
      dispatch({
        type: 'UPDATE_CERTIFICATE_FAILURE',
        error,
      });
    });
  };
}
