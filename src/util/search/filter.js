import fetchFilteredCourses from './fetchFilteredCourses';

export function addIndustryToFilter(id) {
  return function action(dispatch) {
    dispatch({
      type: 'FILTER_INDUSTRY_ADDED',
      id,
    });
    dispatch(fetchFilteredCourses());
  };
}


export function removeIndustryFromFilter(id) {
  return function action(dispatch) {
    dispatch({
      type: 'FILTER_INDUSTRY_REMOVED',
      id,
    });
    dispatch(fetchFilteredCourses());
  };
}
