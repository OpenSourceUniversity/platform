import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;

export default function checkJobApplication(id) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'CHECK_JOB_APPLICATION_REQUEST',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    const url = `${bdnUrl}api/v1/job-applications/${id}/get_by_user_and_job/`;
    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'CHECK_JOB_APPLICATION_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'CHECK_JOB_APPLICATION_SUCCESS',
            checkJobApplication: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'CHECK_JOB_APPLICATION_FAILURE',
          error,
        });
      });
  };
}
