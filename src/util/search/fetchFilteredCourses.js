import { fetchCourses } from 'containers/CoursesPage/actions';
import { fetchJobs } from 'containers/JobsPage/actions';
import store from '../../store';
import Config from '../../config';


export default function fetchFilteredCourses() {
  return function action(dispatch) {
    const { bdnUrl } = Config.network;
    const { filteredIndustries } = store.getState().search;
    const { filterType } = store.getState().search;
    const industryQueryParam = filteredIndustries.reduce((a, b) => `${a}|${b}`, '');
    const url = `${bdnUrl}api/v1/${filterType}/?filter_industry=${industryQueryParam}&limit=20&offset=0`;

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
