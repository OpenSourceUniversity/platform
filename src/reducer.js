import { combineReducers } from 'redux';
import web3Reducer from './util/web3/web3Reducer';
import ipfsReducer from './util/ipfs/ipfsReducer';
import authReducer from './util/auth/authReducer';
import searchReducer from './util/search/searchReducer';
import certificatesReducer from './containers/CertificatesPage/certificatesReducer';
import coursesReducer from './containers/CoursesPage/coursesReducer';
import courseReducer from './containers/CoursePage/courseReducer';
import certificateReducer from './containers/CertificatePage/certificateReducer';
import addCertificateReducer from './containers/AddCertificatePage/addCertificateReducer';
import activeAccountReducer from './util/activeAccount/activeAccountReducer';
import secondaryNavReducer from './util/secondaryNav/secondaryNavReducer';
import profilesReducer from './util/profiles/profilesReducer';
import departmentCoursesReducer from './components/ViewAcademyProfile/departmentCoursesReducer';
import academiesReducer from './containers/Academies/academiesReducer';
import learnersReducer from './containers/Learners/learnersReducer';
import jobsReducer from './containers/JobsPage/jobsReducer';
import jobReducer from './containers/JobPage/jobReducer';
import companyJobsReducer from './components/ViewBusinessProfile/companyJobsReducer';
import businessesReducer from './containers/Businesses/businessesReducer';
import addJobReducer from './containers/AddJobPosition/addJobReducer';
import addCourseReducer from './containers/AddCourse/addCourseReducer';


const reducer = combineReducers({
  web3: web3Reducer,
  ipfs: ipfsReducer,
  auth: authReducer,
  certificates: certificatesReducer,
  addCertificate: addCertificateReducer,
  courses: coursesReducer,
  course: courseReducer,
  certificate: certificateReducer,
  search: searchReducer,
  activeAccount: activeAccountReducer,
  secondaryNav: secondaryNavReducer,
  profiles: profilesReducer,
  departmentCourses: departmentCoursesReducer,
  academies: academiesReducer,
  jobs: jobsReducer,
  job: jobReducer,
  companyJobs: companyJobsReducer,
  businesses: businessesReducer,
  addJob: addJobReducer,
  addCourse: addCourseReducer,
  learners: learnersReducer,
});

export default reducer;
