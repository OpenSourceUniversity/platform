// import { Buffer } from 'buffer';
import axios from 'axios';
import {fetchCertificates} from '../CertificatesPage/actions';
import store from '../../store';
// const contract = require('truffle-contract');


export function storeProofOfExistance(/* state , hash */) {
  return function action(dispatch) {
    // const web3 = store.getState().web3.web3Instance;
    setTimeout(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_SUCCESS',
      });
    }, 1500);
  };
}

const START_URL = 'http://localhost:8000/api/v1/certificates/'


export function addCertificate(certificateData, url=START_URL) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_CERTIFICATE_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const postData = {
      id: certificateData.id ? certificateData.id : null,
      academy_title: certificateData.academy_title ? certificateData.academy_title : null,
      academy_address: certificateData.academy_address ? certificateData.academy_address : null,
      academy_link: certificateData.academy_link ? certificateData.academy_link : null,
      program_title: certificateData.program_title ?
        certificateData.program_title : null,
      course_title: certificateData.course_title ? certificateData.course_title : null,
      course_link: certificateData.course_link ? certificateData.course_link : null,
      subject: certificateData.subject ? certificateData.subject : null,
      skills: certificateData.skills ? certificateData.skills : null,
      learner_eth_address: certificateData.learner_eth_address ?
        certificateData.learner_eth_address : null,
      score: certificateData.score ? certificateData.score : 0,
      duration: certificateData.duration ? certificateData.duration * 3600 : null,
      expiration_date: certificateData.expiration_date ? certificateData.expiration_date : null,
    };
    axios.post(url, postData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_SUCCESS',
      });
    }).catch(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_FAILURE',
        error: 'Fail',
      });
    });
  };
}

export function verifyCertificate(certificateData, url=START_URL) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_CERTIFICATE_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const postData = {
      id: certificateData.id ? certificateData.id : null,
      academy_title: certificateData.academy_title ? certificateData.academy_title : null,
      academy_address: certificateData.academy_address ? certificateData.academy_address : null,
      academy_link: certificateData.academy_link ? certificateData.academy_link : null,
      program_title: certificateData.program_title ?
        certificateData.program_title : null,
      course_title: certificateData.course_title ? certificateData.course_title : null,
      course_link: certificateData.course_link ? certificateData.course_link : null,
      subject: certificateData.subject ? certificateData.subject : null,
      skills: certificateData.skills ? certificateData.skills : null,
      learner_eth_address: certificateData.learner_eth_address ?
        certificateData.learner_eth_address : null,
      score: certificateData.score ? certificateData.score : 0,
      duration: certificateData.duration ? certificateData.duration * 3600 : null,
      expiration_date: certificateData.expiration_date ? certificateData.expiration_date : null,
      verified: true,
    };
    axios.post(url, postData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_SUCCESS',
      });
      dispatch(fetchCertificates('http://localhost:8000/api/v1/certificates/get_certificates_by_academy'));
    }).catch(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_FAILURE',
        error: 'Fail',
      });
    });
  };
}

export function massVerification(ids) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_CERTIFICATE_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const postData = {
      ids: ids.reduce((a, b) => `${a}|${b}`, ''),
    };
    axios.post('http://localhost:8000/api/v1/certificates/mass_verification/', postData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_SUCCESS',
      });
      dispatch(fetchCertificates('http://localhost:8000/api/v1/certificates/get_certificates_by_academy'));
    }).catch(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_FAILURE',
        error: 'Fail',
      });
    });
  };
}

export function rejectCertificate(id) {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_CERTIFICATE_REQUEST',
    });
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
      },
    };
    const postData = {
      id: id,
    };
    axios.post('http://localhost:8000/api/v1/certificates/delete_by_id/', postData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_SUCCESS',
      });
      dispatch(fetchCertificates('http://localhost:8000/api/v1/certificates/get_certificates_by_academy'));
    }).catch(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_FAILURE',
        error: 'Fail',
      });
    });
  };
}