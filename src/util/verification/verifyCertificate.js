import store from '../../store';
import setPendingVerification from './setPendingVerification';
import storeVerification from './storeVerification';
import fetchVerifications from './fetchVerifications';

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
        dispatch(setPendingVerification(certificateData, () => {
          dispatch(fetchVerifications());
        }));
      }));
    });
  };
}
