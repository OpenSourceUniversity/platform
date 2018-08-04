import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;
const START_URL = `${bdnUrl}api/v1/certificates/`;

export function fetchCertificates(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_CERTIFICATES_REQUEST',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_CERTIFICATES_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_CERTIFICATES_SUCCESS',
            certificates: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_CERTIFICATES_FAILURE',
          error,
        });
      });
  };
}
