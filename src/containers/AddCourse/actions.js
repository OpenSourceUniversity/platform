// import { Buffer } from 'buffer';
import axios from 'axios';
import store from '../../store';
import Config from '../../config';
// const contract = require('truffle-contract');


export function storeProofOfExistance(/* state , hash */) {
  return function action(dispatch) {
    // const web3 = store.getState().web3.web3Instance;
    setTimeout(() => {
      dispatch({
        type: 'ADD_COURSE_SUCCESS',
      });
    }, 1500);
  };
}

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
    const url = `${bdnUrl}api/v1/courses/methods/get_by_id/?id=${id}`;

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
    const postData = {
      title: courseData.title ? courseData.title : null,
      tutor: courseData.tutor ? courseData.tutor : null,
      skills: courseData.skills ? courseData.skills : null,
      description: courseData.description ? courseData.description : null,
      external_link: courseData.external_link ? courseData.external_link : null,
      categories: courseData.categories ? courseData.categories : null,
    };
    const { bdnUrl } = Config.network;
    axios.post(`${bdnUrl}api/v1/courses/`, postData, axiosConfig).then(() => {
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
      id,
      title: courseData.title ? courseData.title : null,
      tutor: courseData.tutor ? courseData.tutor : null,
      skills: courseData.skills ? courseData.skills : null,
      description: courseData.description ? courseData.description : null,
      external_link: courseData.external_link ? courseData.external_link : null,
      categories: courseData.categories ? courseData.categories : null,
    };
    const { bdnUrl } = Config.network;
    const url = `${bdnUrl}api/v1/courses/methods/edit_by_id/`;
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
