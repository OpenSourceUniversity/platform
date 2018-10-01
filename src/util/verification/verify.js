import store from '../../store';
import setPendingVerification from './setPendingVerification';
import storeVerification from './storeVerification';
import fetchVerifications from './fetchVerifications';

export default function verify(verifications) {
  return function action(dispatch) {
    dispatch({
      type: 'VERIFY_REQUEST',
    });
    const ipfs = store.getState().ipfs.IPFSinstance;
    const metaJsons = [];
    let metaJson = null;
    for (let i = 0; i < verifications.length; i += 1) {
      metaJson = verifications[i];
      metaJson.previous_state = metaJson.state;
      delete metaJson.state;
      metaJsons.push(metaJson);
    }

    const metaJsonBuffer = Buffer.from(JSON.stringify(metaJsons));
    ipfs.add(metaJsonBuffer, (err, ipfsHashFull) => {
      const ipfsHash = ipfsHashFull[0].hash;
      dispatch({
        type: 'IPFS_GET_SUCCESS',
        payload: {
          ipfsHash,
        },
      });
      dispatch(storeVerification(ipfsHash, (error) => {
        if (error) {
          console.log(error);
          return;
        }
        // Store the updated data on BDN
        for (let i = 0; i < verifications.length; i += 1) {
          console.log(verifications[i]);
          dispatch(setPendingVerification(verifications[i].id, () => {
            dispatch(fetchVerifications());
          }));
        }
      }));
    });
  };
}
