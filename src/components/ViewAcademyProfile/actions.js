import store from '../../store';
import Config from '../../config';


/* eslint-disable camelcase */
export function fetchDepartmentCourses(eth_address) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'RESET_DEPARTMENT_COURSES',
    });
    dispatch({
      type: 'FETCH_DEPARTMENT_COURSES_REQUEST',
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
    const { bdnUrl } = Config.network;
    const url = `${bdnUrl}api/v1/courses/get_by_provider/?eth_address=${eth_address}`;
    return fetch(url, headers ? { headers } : null)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_DEPARTMENT_COURSES_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_DEPARTMENT_COURSES_SUCCESS',
            results: body,
            next: body.next,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_DEPARTMENT_COURSES_FAILURE',
          error,
        });
      });
  };
}
/* eslint-enable camelcase */
