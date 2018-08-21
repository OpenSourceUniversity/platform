import store from '../../store';


export default function fetchVerification(url) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'FETCH_VERIFICATION_REQUEST',
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
            type: 'FETCH_VERIFICATION_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_VERIFICATION_SUCCESS',
            verification: body,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_VERIFICATION_FAILURE',
          error,
        });
      });
  };
}
