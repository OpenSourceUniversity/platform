import store from '../../store';
import Config from '../../config';


const { bdnUrl } = Config.network;
const START_URL = `${bdnUrl}api/v1/certificates/1/`;


export default function fetchCertificate(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_CERTIFICATE_REQUEST',
    });
    const ethAddress = store.getState().auth.address;
    const { signedAddress } = store.getState().auth;
    let headers = null;
    if (ethAddress && signedAddress) {
      headers = new Headers({
        'Auth-Signature': signedAddress,
        'Auth-Eth-Address': ethAddress.slice(2),
      });
    }
    return fetch(url, headers ? { headers } : null)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_CERTIFICATE_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_CERTIFICATE_SUCCESS',
            result: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_CERTIFICATE_FAILURE',
          error,
        });
      });
  };
}
