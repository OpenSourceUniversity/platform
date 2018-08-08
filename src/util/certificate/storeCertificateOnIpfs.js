import store from '../../store';
import addCertificate from './addCertificate';


export default function storeCertificateOnIpfs(buffer, certificateData) {
  return function dispatcher(dispatch) {
    const ipfs = store.getState().ipfs.IPFSinstance;
    dispatch({
      type: 'IPFS_GET_REQUEST',
    });
    dispatch({
      type: 'ADD_CERTIFICATE_REQUEST',
    });
    ipfs.add(buffer, (err, ipfsHash) => {
      dispatch({
        type: 'IPFS_GET_SUCCESS',
        payload: {
          ipfsHash: ipfsHash[0].hash,
        },
      });
      dispatch(addCertificate(certificateData, ipfsHash[0].hash));
    });
  };
}
