import { createHashHistory } from 'history';
import axios from 'axios';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;

export default function deleteCertificate(id) {
  return function action(dispatch) {
    dispatch({
      type: 'DELETE_CERTIFICATE_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };

    axios.post(`${bdnUrl}api/v1/certificates/${id}/delete_by_id/`, null, axiosConfig).then(() => {
      dispatch({
        type: 'DELETE_CERTIFICATE_SUCCESS',
      });
      const newPath = '/certificates';
      const history = createHashHistory();
      history.push(newPath);
    }).catch((error) => {
      dispatch({
        type: 'DELETE_CERTIFICATE_FAILURE',
        error,
      });
    });
  };
}
