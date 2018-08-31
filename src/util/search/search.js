import { createHashHistory } from 'history';
import { fetchCourses } from 'containers/CoursesPage/actions';
import { fetchJobs } from 'containers/JobsPage/actions';
import { fetchLearners } from 'containers/Learners/actions';
import { fetchBusinesses } from 'containers/Businesses/actions';
import Config from '../../config';


export default function search(query) {
  return function action(dispatch) {
    const history = createHashHistory();
    const searchType = localStorage.getItem('searchType');
    history.push(`/${searchType}/?q=${query}`);

    const { bdnUrl } = Config.network;
    const url = `${bdnUrl}api/v1/${searchType}/?limit=20&offset=0&q=${query}`;

    switch (searchType) {
    case 'courses':
      dispatch({
        type: 'RESET_FETCHED_COURSES',
      });
      dispatch(fetchCourses(url));
    case 'jobs':
      dispatch({
        type: 'RESET_FETCHED_JOBS',
      });
      dispatch(fetchJobs(url));
      break;
    case 'learners':
      dispatch({
        type: 'RESET_FETCHED_LEARNERS',
      });
      dispatch(fetchLearners(url));
      break;
    case 'businesses':
      dispatch({
        type: 'RESET_FETCHED_BUSINESSES',
      });
      dispatch(fetchBusinesses(url));
      break;
    }
    return null;
  };
}
