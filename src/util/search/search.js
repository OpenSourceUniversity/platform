import { createHashHistory } from 'history';
import { fetchCourses } from 'containers/CoursesPage/actions';
import Config from '../../config';


export default function search(query) {
  return function action(dispatch) {
    const history = createHashHistory();
    history.push(`/courses/?q=${query}`);

    const { bdnUrl } = Config.network;
    const url = `${bdnUrl}api/v1/courses/?limit=20&offset=0&q=${query}`;

    dispatch({
      type: 'RESET_FETCHED_COURSES',
    });

    dispatch(fetchCourses(url));
  };
}
