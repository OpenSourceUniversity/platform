import axios from 'axios';
import store from '../../store';


const START_URL = 'http://localhost:8000/api/v1/courses/fc01f5ba-c59f-49a2-b75b-4cd9f0d86b02';


export function fetchCourse(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_COURSE_REQUEST',
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
            type: 'FETCH_COURSE_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_COURSE_SUCCESS',
            result: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_COURSE_FAILURE',
          error,
        });
      });
  };
}

export function deleteCourse(id) {
  return function action(dispatch) {
    dispatch({
      type: 'FETCH_COURSE_REQUEST',
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
    const url = 'http://localhost:8000/api/v1/courses/methods/delete_by_id/';
    axios.post(url, postData, axiosConfig).then(() => {
      dispatch({
        type: 'FETCH_COURSE_SUCCESS',
        result: 'ok',
      });
    }).catch(() => {
      dispatch({
        type: 'FETCH_COURSE_FAILURE',
        error: 'Fail',
      });
    });
  };
}
