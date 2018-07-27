import store from '../../store';


/* eslint-disable camelcase */
export function fetchDepartmentCourses(eth_address) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'RESET_DEPARTMENT_COURSES',
    });
    dispatch({
      type: 'FETCH_DEPARTMENT_COURSES_REQUEST',
    });
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    const url = `http://localhost:8000/api/v1/courses/get_by_provider/?eth_address=${eth_address}`;
    return fetch(url, { headers })
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
