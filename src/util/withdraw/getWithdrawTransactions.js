import store from '../../store';
import Config from '../../config';

const { bdnUrl } = Config.network;
const START_URL = `${bdnUrl}api/v1/transactions/`;

export default function getWithdrawTransactions(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'WITHDRAW_GET_REQUEST',
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
            type: 'WITHDRAW_GET_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'WITHDRAW_GET_SUCCESS',
            result: body.results,
            next: body.next,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'WITHDRAW_GET_FAILURE',
          error,
        });
      });
  };
}

