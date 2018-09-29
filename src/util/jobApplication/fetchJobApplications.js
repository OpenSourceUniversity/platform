import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;
const START_URL = `${bdnUrl}api/v1/job-applications/`;
function arraysEqual(arr1, arr2) {
  if (!arr1 || !arr2) {
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  if (arr1.length === 0 && arr2.length === 0) {
    return false;
  }
  for (let i = arr1.length; i >= 0; i -= 1) {
    if (arr1[i].id !== arr2[i].id && arr1[i].state !== arr2[i].state && arr2[i].company_profile) {
      return false;
    }
  }
  return true;
}

export default function fetchJobApplications(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_JOB_APPLICATIONS_REQUEST',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    if (store.getState().activeAccount.activeAccount === 'Learner') {
      /* eslint-disable no-param-reassign */
      url = `${bdnUrl}api/v1/job-applications/get_by_user/`;
    }
    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_JOB_APPLICATIONS_FAILURE',
            error: body.error,
          });
        } else {
          if (arraysEqual(body.results, store.getState().jobApplication.jobApplications)) {
            dispatch({
              type: 'JOB_APPLICATIONS_DUPLICATE',
            });
            return;
          }
          dispatch({
            type: 'FETCH_JOB_APPLICATIONS_SUCCESS',
            jobApplications: body,
            nextUrl: body.nextUrl,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_JOB_APPLICATIONS_FAILURE',
          error,
        });
      });
  };
}
