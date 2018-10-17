import { createHashHistory } from 'history';
import { fetchCourses } from 'containers/CoursesPage/actions';
import { fetchJobs } from 'containers/JobsPage/actions';
import { fetchLearners } from 'containers/Learners/actions';
import { fetchBusinesses } from 'containers/Businesses/actions';
import { fetchAcademies } from 'containers/Academies/actions';
import Config from '../../config';


export default function search(query) {
  return function action(dispatch) {
    const history = createHashHistory();
    const searchType = localStorage.getItem('searchType');
    history.push(`/${searchType}/?q=${query}`);

    const { bdnUrl } = Config.network;
    const apiService = ({
      jobs: 'jobs',
      learners: 'profile/get_learners',
      businesses: 'profile/get_businesses',
      academies: 'profile/get_academies',
      courses: 'courses',
    })[searchType];
    const url = `${bdnUrl}api/v1/${apiService}/?limit=20&offset=0&q=${query}`;

    switch (searchType) {
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
    case 'academies':
      dispatch({
        type: 'RESET_FETCHED_ACADEMIES',
      });
      dispatch(fetchAcademies(url));
      break;
    default:
      dispatch({
        type: 'RESET_FETCHED_COURSES',
      });
      dispatch(fetchCourses(url));
    }
    return null;
  };
}
