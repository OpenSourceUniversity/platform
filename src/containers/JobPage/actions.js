import axios from 'axios';
import store from '../../store';
import Config from '../../config';


const { bdnUrl } = Config.network;
const START_URL = `${bdnUrl}api/v1/jobs/fc01f5ba-c59f-49a2-b75b-4cd9f0d86b02`;


export function fetchJob(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_JOB_REQUEST',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_JOB_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_JOB_SUCCESS',
            job: body.job,
            company: body.company,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_JOB_FAILURE',
          error,
        });
      });
  };
}

export function deleteJobPosition(id) {
  return function action(dispatch) {
    dispatch({
      type: 'FETCH_JOB_REQUEST',
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
    const url = `${bdnUrl}api/v1/jobs/${id}/delete_by_id/`;
    axios.post(url, postData, axiosConfig).then(() => {
      dispatch({
        type: 'FETCH_JOB_SUCCESS',
        result: 'ok',
      });
    }).catch(() => {
      dispatch({
        type: 'FETCH_JOB_FAILURE',
        error: 'Fail',
      });
    });
  };
}
