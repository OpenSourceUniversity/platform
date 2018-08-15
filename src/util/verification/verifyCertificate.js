import updateCertificate from '../certificate/updateCertificate';
import store from '../../store';
import Config from '../../config';
import fetchCertificates from '../../util/certificate/fetchCertificates';
import storeVerification from './storeVerification';

const { bdnUrl } = Config.network;

export default function verifyCertificate(certificateData) {
  return function action(dispatch) {
    // TODO: do not dispatch this event. Instead dispatch something more
    // related to the verification functionality, e.g. VERIFICATION_REQUEST
    dispatch({
      type: 'VERIFY_REQUEST',
    });
    const ipfs = store.getState().ipfs.IPFSinstance;
    const metaJson = certificateData;
    const grantedTo = certificateData.learner_eth_address;
    const metaJsonBuffer = Buffer.from(JSON.stringify(metaJson));
    ipfs.add(metaJsonBuffer, (err, ipfsHashFull) => {
      const ipfsHash = ipfsHashFull[0].hash;
      dispatch({
        type: 'IPFS_GET_SUCCESS',
        payload: {
          ipfsHash,
        },
      });
      dispatch(storeVerification(ipfsHash, grantedTo, (error) => {
        if (error) {
          return;
        }
        // Store the updated data on BDN
        dispatch(updateCertificate(certificateData, () => {
          const url = `${bdnUrl}api/v1/certificates/get_certificates_by_academy/`;
          dispatch(fetchCertificates(url));
        }));
      }));
    });
  };
}
