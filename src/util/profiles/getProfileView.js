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
    const ethAddress = store.getState().auth.address;
    const { signedAddress } = store.getState().auth;
    let headers = null;
    if (ethAddress && signedAddress) {
      headers = new Headers({
        'Auth-Signature': signedAddress,
        'Auth-Eth-Address': ethAddress.slice(2),
      });
    }
    if (type === 'learner') {
      fetch(`${bdnUrl}api/v1/certificates/get_certificates_by_learner/?eth_address=${eth_address}`, headers ? { headers } : null)
        .then(response => response.json().then(body => ({ response, body })))
        .then(({ response, body }) => {
          if (!response.ok) {
            dispatch({
              type: 'PROFILE_GET_FAILURE',
              error: body.error,
            });
          } else {
            dispatch({
              type: 'VIEW_CERTIFICATES_GET_SUCCESS',
              certificates: body,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: 'PROFILE_GET_FAILURE',
            error,
          });
        });
    }
    return fetch(url, headers ? { headers } : null)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'PROFILE_GET_FAILURE',
            error: body.error.message,
          });
        } else {
          dispatch({
            type: 'PROFILE_GET_SUCCESS',
            result: body,
            isPublic: body.public_profile,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'PROFILE_GET_FAILURE',
          error: error.message,
        });
      });
  };
}
/* eslint-enable camelcase */
