// import { Buffer } from 'buffer';
import axios from 'axios';
import store from '../../store';
import Config from '../../config';
// const contract = require('truffle-contract');
const { bdnUrl } = Config.network;


export function getDefaultValues(id) {
  return function action(dispatch) {
    dispatch({
      type: 'RESET_JOB_VALUES',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    const url = `${bdnUrl}api/v1/jobs/${id}/get_by_id/`;

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
      industries: jobData.industries ? jobData.industries : null,
      closes: jobData.closes ? jobData.closes : null,
      experience: jobData.experience ? jobData.experience : null,
      hours: jobData.hours ? jobData.hours : null,
      job_type: jobData.job_type ? jobData.job_type : null,
      languages: jobData.languages ? jobData.languages : null,
    };
    axios.post(`${bdnUrl}api/v1/jobs/`, postData, axiosConfig).then(() => {
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
      title: jobData.title ? jobData.title : null,
      location: jobData.location ? jobData.location : null,
      salary: jobData.salary ? jobData.salary : null,
      overview: jobData.overview ? jobData.overview : null,
      skills: jobData.skills ? jobData.skills : null,
      description: jobData.description ? jobData.description : null,
      external_link: jobData.external_link ? jobData.external_link : null,
      industries: jobData.industries ? jobData.industries : null,
      closes: jobData.closes ? jobData.closes : null,
      experience: jobData.experience ? jobData.experience : null,
      hours: jobData.hours ? jobData.hours : null,
      job_type: jobData.job_type ? jobData.job_type : null,
      languages: jobData.languages ? jobData.languages : null,
    };
    const url = `${bdnUrl}api/v1/jobs/${id}/edit_by_id/`;
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

export function resetAddJobProps() {
  return function action(dispatch) {
    dispatch({
      type: 'RESET_JOB_VALUES',
    });
  };
}
