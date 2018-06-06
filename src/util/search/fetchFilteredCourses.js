import { fetchCourses } from 'containers/CoursesPage/actions';
import store from '../../store';


export default function fetchFilteredCourses() {
  return function action(dispatch) {
    const { filteredCategories } = store.getState().search;
    const categoryQueryParam = filteredCategories.reduce((a, b) => `${a}|${b}`, '');
    const url = `http://localhost:8000/api/v1/courses/?filter_category=${categoryQueryParam}&limit=20&offset=20`;

    dispatch({
      type: 'RESET_FETCHED_COURSES',
    });

    dispatch(fetchCourses(url));
  };
}
