import { Buffer } from 'buffer';
import axios from 'axios';
import store from '../../store';
// import web3 from '../../util/web3/getWeb3';
// import ipfs from '../../util/ipfs/getIpfs';
// import storeHash from '../../util/ipfs/storeHash';
const contract = require('truffle-contract');


export function storeProofOfExistance(state) {
  return function action(dispatch) {
    const web3 = store.getState().web3.web3Instance;
    const ipfs = store.getState().ipfs.IPFSinitialized;
    dispatch({
      type: 'IPFS_GET_REQUEST',
      payload:{
        IPFSinstance: ipfs,
      },
    });
    // setTimeout(() => {
    //   dispatch({
    //     type: 'IPFS_GET_REQUEST',
    //   });
    // }, 1500);

    console.log(ipfs);

    // ipfs.add(this.state.buffer, (err, ipfsHash) => {
    //         // console.log(err,ipfsHash);
    //         //setState by setting ipfsHash to ipfsHash[0].hash
    //
    //         // this.setState({ ipfsHash:ipfsHash[0].hash });
    //
    //         // storeHash.methods.sendHash(this.state.ipfsHash).send({
    //         //   from: accounts[0]
    //         // }, (error, transactionHash) => {
    //         //   console.log(transactionHash);
    //         //   this.setState({transactionHash});
    //         // });
    //         console.log(ipfsHash);
    //       });

  };
}


export function addCertificate(certificateData) {
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
      score: certificateData.score ? certificateData.score : null,
      duration: certificateData.duration ? certificateData.duration : null,
      expiration_date: certificateData.expiration_date ? certificateData.expiration_date : null,
    };

    axios.post('http://localhost:8000/api/v1/certificates/', postData, axiosConfig).then(() => {
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



// await ipfs.add(this.state.buffer, (err, ipfsHash) => {
//         console.log(err,ipfsHash);
//         //setState by setting ipfsHash to ipfsHash[0].hash
//         this.setState({ ipfsHash:ipfsHash[0].hash });
//
//         storehash.methods.sendHash(this.state.ipfsHash).send({
//           from: accounts[0]
//         }, (error, transactionHash) => {
//           console.log(transactionHash);
//           this.setState({transactionHash});
//         });
//       })
