import { fetchCourses } from 'containers/CoursesPage/actions';
import { fetchJobs } from 'containers/JobsPage/actions';
import store from '../../store';


export default function fetchFilteredCourses() {
  return function action(dispatch) {
    const { filteredCategories } = store.getState().search;
    const { filterType } = store.getState().search;
    const categoryQueryParam = filteredCategories.reduce((a, b) => `${a}|${b}`, '');
    const url = `http://localhost:8000/api/v1/${filterType}/?filter_category=${categoryQueryParam}&limit=20&offset=0`;

    dispatch({
      type: 'RESET_FETCHED_COURSES',
    });
    if (filterType === 'jobs') {
      dispatch(fetchJobs(url));
    } else {
      dispatch(fetchCourses(url));
    }
  };
}
