import fetchFilteredCourses from './fetchFilteredCourses';

export function addCategoryToFilter(id) {
  return function action(dispatch) {
    dispatch({
      type: 'FILTER_CATEGORY_ADDED',
      id,
    });
    dispatch(fetchFilteredCourses());
  };
}


export function removeCategoryFromFilter(id) {
  return function action(dispatch) {
    dispatch({
      type: 'FILTER_CATEGORY_REMOVED',
      id,
    });
    dispatch(fetchFilteredCourses());
  };
}
