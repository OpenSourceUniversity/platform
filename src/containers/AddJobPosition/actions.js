// import { Buffer } from 'buffer';
import axios from 'axios';
import store from '../../store';
// const contract = require('truffle-contract');


export function storeProofOfExistance(/* state , hash */) {
  return function action(dispatch) {
    // const web3 = store.getState().web3.web3Instance;
    setTimeout(() => {
      dispatch({
        type: 'ADD_JOB_SUCCESS',
      });
    }, 1500);
  };
}

export function getDefaultValues(id) {
  return function action(dispatch) {
    dispatch({
      type: 'RESET_JOB_VALUES',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    const url = `http://localhost:8000/api/v1/jobs/methods/get_by_id/?id=${id}`;

    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'JOB_GET_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'JOB_GET_SUCCESS',
            result: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'JOB_GET_FAILURE',
          error,
        });
      });
  };
}


export function addJobPosition(jobData) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_JOB_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const postData = {
      title: jobData.title ? jobData.title : null,
      location: jobData.location ? jobData.location : null,
      salary: jobData.salary ? jobData.salary : null,
      overview: jobData.overview ? jobData.overview : null,
      skills: jobData.skills ? jobData.skills : null,
      description: jobData.description ? jobData.description : null,
      external_link: jobData.external_link ? jobData.external_link : null,
      categories: jobData.categories ? jobData.categories : null,
      closes: jobData.closes ? jobData.closes : null,
      experience: jobData.experience ? jobData.experience : null,
      hours: jobData.hours ? jobData.hours : null,
      job_type: jobData.job_type ? jobData.job_type : null,
      languages: jobData.languages ? jobData.languages : null,
    };
    axios.post('http://localhost:8000/api/v1/jobs/', postData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_JOB_SUCCESS',
      });
    }).catch(() => {
      dispatch({
        type: 'ADD_JOB_FAILURE',
        error: 'Fail',
      });
    });
  };
}

export function editJobPosition(id, jobData) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_JOB_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const postData = {
      id,
      title: jobData.title ? jobData.title : null,
      location: jobData.location ? jobData.location : null,
      salary: jobData.salary ? jobData.salary : null,
      overview: jobData.overview ? jobData.overview : null,
      skills: jobData.skills ? jobData.skills : null,
      description: jobData.description ? jobData.description : null,
      external_link: jobData.external_link ? jobData.external_link : null,
      categories: jobData.categories ? jobData.categories : null,
      closes: jobData.closes ? jobData.closes : null,
      experience: jobData.experience ? jobData.experience : null,
      hours: jobData.hours ? jobData.hours : null,
      job_type: jobData.job_type ? jobData.job_type : null,
      languages: jobData.languages ? jobData.languages : null,
    };
    const url = 'http://localhost:8000/api/v1/jobs/methods/edit_by_id/';
    axios.post(url, postData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_JOB_SUCCESS',
      });
    }).catch(() => {
      dispatch({
        type: 'ADD_JOB_FAILURE',
        error: 'Fail',
      });
    });
  };
}
