// import { Buffer } from 'buffer';
import axios from 'axios';
import store from '../../store';
import Config from '../../config';


export function getDefaultValues(id) {
  return function action(dispatch) {
    dispatch({
      type: 'RESET_COURSE_VALUES',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    const { bdnUrl } = Config.network;
    const url = `${bdnUrl}api/v1/courses/${id}/get_by_id/`;

    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'COURSE_GET_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'COURSE_GET_SUCCESS',
            result: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'COURSE_GET_FAILURE',
          error,
        });
      });
  };
}


export function addCourse(courseData) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_COURSE_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const { bdnUrl } = Config.network;
    axios.post(`${bdnUrl}api/v1/courses/`, courseData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_COURSE_SUCCESS',
      });
    }).catch(() => {
      dispatch({
        type: 'ADD_COURSE_FAILURE',
        error: 'Fail',
      });
    });
  };
}

export function editCourse(id, courseData) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_COURSE_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const postData = {
      title: courseData.title ? courseData.title : null,
      tutor: courseData.tutor ? courseData.tutor : null,
      skills: courseData.skills ? courseData.skills : null,
      description: courseData.description ? courseData.description : null,
      external_link: courseData.external_link ? courseData.external_link : null,
      industries: courseData.industries ? courseData.industries : null,
    };
    const { bdnUrl } = Config.network;
    const url = `${bdnUrl}api/v1/courses/${id}/edit_by_id/`;
    axios.post(url, postData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_COURSE_SUCCESS',
      });
    }).catch(() => {
      dispatch({
        type: 'ADD_COURSE_FAILURE',
        error: 'Fail',
      });
    });
  };
}

export function resetAddCourseProps() {
  return function action(dispatch) {
    dispatch({
      type: 'RESET_COURSE_VALUES',
    });
  };
}
