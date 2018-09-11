import axios from 'axios';
import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;
const ADD_CONNECTIONS_ARCHIVE_URL = `${bdnUrl}api/v1/archive/`;


export default function addFileWithConnections(connectionsDataFile) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_CONNECTIONS_ARCHIVE_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const postData = {
      datafile: connectionsDataFile || null,
    };
    axios.post(ADD_CONNECTIONS_ARCHIVE_URL, postData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_CONNECTIONS_ARCHIVE_SUCCESS',
      });
    }).catch((error) => {
      dispatch({
        type: 'ADD_CONNECTIONS_ARCHIVE_FAILURE',
        errorArchive: error,
      });
    });
  };
}
