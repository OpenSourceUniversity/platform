import store from '../../store';
import setPendingVerification from './setPendingVerification';
import storeVerification from './storeVerification';
import fetchVerifications from './fetchVerifications';

export default function verify(verification) {
  return function action(dispatch) {
    // TODO: do not dispatch this event. Instead dispatch something more
    // related to the verification functionality, e.g. VERIFICATION_REQUEST
    dispatch({
      type: 'VERIFY_REQUEST',
    });
    const ipfs = store.getState().ipfs.IPFSinstance;
    const metaJson = verification;
    metaJson.previous_state = metaJson.state;
    const verificationID = verification.id;
    delete metaJson.state;
    delete metaJson.id;
    delete metaJson.certificate.id;
    metaJson.granted_to = verification.certificate.learner_eth_address;
    metaJson.verifier = verification.certificate.provider.eth_address;
    console.log(metaJson);
    const metaJsonBuffer = Buffer.from(JSON.stringify(metaJson));
    ipfs.add(metaJsonBuffer, (err, ipfsHashFull) => {
      const ipfsHash = ipfsHashFull[0].hash;
      dispatch({
        type: 'IPFS_GET_SUCCESS',
        payload: {
          ipfsHash,
        },
      });
      dispatch(storeVerification(ipfsHash, metaJson.granted_to, (error) => {
        if (error) {
          return;
        }
        // Store the updated data on BDN
        dispatch(setPendingVerification(verificationID, () => {
          dispatch(fetchVerifications());
        }));
      }));
    });
  };
}
