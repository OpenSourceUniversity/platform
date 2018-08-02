import { fetchCourses } from 'containers/CoursesPage/actions';
import Config from '../../config';


export default function search(query) {
  return function action(dispatch) {
    const { bdnUrl } = Config.network;
    const url = `${bdnUrl}api/v1/courses/search/?q=${query}`;

    dispatch({
      type: 'RESET_FETCHED_COURSES',
    });

    dispatch(fetchCourses(url));
  };
}
