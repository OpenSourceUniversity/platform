import axios from 'axios';
import store from '../../store';
import Config from '../../config';
import fetchCertificates from '../../util/certificate/fetchCertificates';

const { bdnUrl } = Config.network;
const UPDATE_CERTIFICATE_URL = `${bdnUrl}api/v1/certificates/update_certificate_by_id/`;


export default function verifyCertificate(certificateData) {
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
    const postData = Object.assign({}, certificateData, {
      verified: true,
    });
    axios.post(UPDATE_CERTIFICATE_URL, postData, axiosConfig).then(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_SUCCESS',
      });
      dispatch(fetchCertificates(`${bdnUrl}api/v1/certificates/get_certificates_by_academy/`));
    }).catch(() => {
      dispatch({
        type: 'ADD_CERTIFICATE_FAILURE',
        error: 'Fail',
      });
    });
  };
}
