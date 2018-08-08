import updateCertificate from '../certificate/updateCertificate';
import Config from '../../config';
import fetchCertificates from '../../util/certificate/fetchCertificates';

const { bdnUrl } = Config.network;


export default function verifyCertificate(certificateData) {
  return function action(dispatch) {
    dispatch(updateCertificate(certificateData, () => {
      const url = `${bdnUrl}api/v1/certificates/get_certificates_by_academy/`;
      dispatch(fetchCertificates(url));
    }));
  };
}
