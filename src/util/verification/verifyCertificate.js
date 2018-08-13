import updateCertificate from '../certificate/updateCertificate';
import store from '../../store';
import Config from '../../config';
import fetchCertificates from '../../util/certificate/fetchCertificates';
import { initWalletUnlocker } from '../../util/auth/walletUnlocker';

const { bdnUrl } = Config.network;

export default function verifyCertificate(certificateData) {
  return function action(dispatch) {
    dispatch({
      type: 'UPDATE_CERTIFICATE_REQUEST',
    });
    const ipfs = store.getState().ipfs.IPFSinstance;
    const metaJson = JSON.stringify(certificateData);
    const metaJsonBuffer = Buffer.from(metaJson);
    ipfs.add(metaJsonBuffer, (err, ipfsHash) => {
      dispatch({
        type: 'IPFS_GET_SUCCESS',
        payload: {
          ipfsHash: ipfsHash[0].hash,
        },
      });
      dispatch(initWalletUnlocker((wallet) => {
        dispatch(updateCertificate(certificateData, () => {
          const url = `${bdnUrl}api/v1/certificates/get_certificates_by_academy/`;
          dispatch(fetchCertificates(url));
        }));
      }));
    });
  };
}
