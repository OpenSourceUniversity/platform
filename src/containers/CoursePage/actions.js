import { createHashHistory } from 'history';
import axios from 'axios';
import store from '../../store';
import Config from '../../config';


const { bdnUrl } = Config.network;
const START_URL = `${bdnUrl}api/v1/courses/fc01f5ba-c59f-49a2-b75b-4cd9f0d86b02`;


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
            course: body.course,
            academy: body.academy,
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
    const url = `${bdnUrl}api/v1/courses/${id}/delete_by_id/`;
    axios.post(url, postData, axiosConfig).then(() => {
      dispatch({
        type: 'FETCH_COURSE_SUCCESS',
        result: 'ok',
      });
      const newPath = '/profile';
      const history = createHashHistory();
      history.push(newPath);
    }).catch(() => {
      dispatch({
        type: 'FETCH_COURSE_FAILURE',
        error: 'Fail',
      });
    });
  };
}
