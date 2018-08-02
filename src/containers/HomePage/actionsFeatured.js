import store from '../../store';
import Config from '../../config';


const { bdnUrl } = Config.network;
const START_URL = `${bdnUrl}api/v1/courses/?is_featured=1&offset=0&limit=4`;


export function fetchFeaturedCourses(url = START_URL) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'RESET_FETCHED_COURSES',
    });
    dispatch({
      type: 'FETCH_COURSES_REQUEST',
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
            type: 'FETCH_COURSES_FAILURE',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_COURSES_SUCCESS',
            results: body.results,
            next: body.next,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_COURSES_FAILURE',
          error,
        });
      });
  };
}
