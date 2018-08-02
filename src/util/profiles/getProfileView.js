import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;


/* eslint-disable camelcase */
export default function getProfileView(type, eth_address) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'PROFILE_GET_REQUEST',
    });
    const url = `${bdnUrl}api/v1/profile/${eth_address}/get_${type}/`;
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    let certificates_count = null;
    if (type === 'learner') {
      fetch(`${bdnUrl}api/v1/certificates/${eth_address}/get_certificates_count/`, { headers })
        .then(response => response.json().then(body => ({ response, body })))
        .then(({ response, body }) => {
          if (!response.ok) {
            dispatch({
              type: 'PROFILE_GET_FAILURE',
              error: body.error,
            });
          } else {
            /* eslint-disable prefer-destructuring */
            certificates_count = body.certificates_count;
            /* eslint-enable prefer-destructuring */
          }
        })
        .catch((error) => {
          dispatch({
            type: 'PROFILE_GET_FAILURE',
            error,
          });
        });
    }

    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'PROFILE_GET_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'PROFILE_GET_SUCCESS',
            result: body,
            isPublic: body.is_public,
            certificates_count,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'PROFILE_GET_FAILURE',
          error,
        });
      });
  };
}
/* eslint-enable camelcase */
