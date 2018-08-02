import store from '../../store';
import Config from '../../config';


/* eslint-disable camelcase */
export function fetchCompanyJobs(eth_address) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'RESET_COMPANY_JOBS',
    });
    dispatch({
      type: 'FETCH_COMPANY_JOBS_REQUEST',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    const { bdnUrl } = Config.network;
    const url = `${bdnUrl}api/v1/jobs/get_by_company/?eth_address=${eth_address}`;
    return fetch(url, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_COMPANY_JOBS_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_COMPANY_JOBS_SUCCESS',
            results: body,
            next: body.next,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_COMPANY_JOBS_FAILURE',
          error,
        });
      });
  };
}
/* eslint-enable camelcase */
