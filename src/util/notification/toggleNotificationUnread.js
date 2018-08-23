import axios from 'axios';
import Config from '../../config';
import store from '../../store';


export default function toggleNotificationUnread(notificationId, callback) {
  return function action(dispatch) {
    const { bdnUrl } = Config.network;
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const url = `${bdnUrl}api/v1/notifications/${notificationId}/toggle_unread/`;
    axios.post(url, {}, axiosConfig).then((response) => {
      if (response.status === 200) {
        callback(null, response);
        if (response.data.new_unread) {
          dispatch({
            type: 'NOTIFICATION_UNREAD',
          });
        } else {
          dispatch({
            type: 'NOTIFICATION_READ',
          });
        }
      } else {
        callback(true, response);
      }
    });
  };
}
