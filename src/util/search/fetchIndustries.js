import Config from '../../config';

const default_filter = 'industries';

export default function fetchIndustries(filterType) {
  return function action(dispatch) {
    dispatch({
      type: 'FETCH_INDUSTRIES_REQUEST',
    });
    const { bdnUrl } = Config.network;
    const url = `${bdnUrl}api/v1/industries/`;
    return fetch(url)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_INDUSTRIES_FAILED',
            error: body.error,
          });
        } else {
          dispatch({
            type: 'FETCH_INDUSTRIES_SUCCESS',
            industries: body,
            filterType,
          });
        }
      });
  };
}
