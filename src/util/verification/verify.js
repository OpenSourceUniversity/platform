import store from '../../store';
import setPendingVerification from './setPendingVerification';
import storeVerification from './storeVerification';
import fetchVerifications from './fetchVerifications';

export default function verify(verification) {
  return function action(dispatch) {
    dispatch({
      type: 'VERIFY_REQUEST',
    });
    const ipfs = store.getState().ipfs.IPFSinstance;
    const metaJson = verification;
    metaJson.previous_state = metaJson.state;
    const verificationId = verification.id;
    delete metaJson.state;

    const metaJsonBuffer = Buffer.from(JSON.stringify(metaJson));
    ipfs.add(metaJsonBuffer, (err, ipfsHashFull) => {
      const ipfsHash = ipfsHashFull[0].hash;
      dispatch({
        type: 'IPFS_GET_SUCCESS',
        payload: {
          ipfsHash,
        },
      });
      dispatch(storeVerification(ipfsHash, metaJson.granted_to_eth_address, (error) => {
        if (error) {
          return;
        }
        // Store the updated data on BDN
        dispatch(setPendingVerification(verificationId, () => {
          dispatch(fetchVerifications());
        }));
      }));
    });
  };
}
