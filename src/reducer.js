import { combineReducers } from 'redux';
import web3Reducer from './util/web3/web3Reducer';
import ipfsReducer from './util/ipfs/ipfsReducer';
import authReducer from './util/auth/authReducer';
import searchReducer from './util/search/searchReducer';
import certificatesReducer from './util/certificate/certificatesReducer';
import certificateReducer from './util/certificate/certificateReducer';
import addCertificateReducer from './util/certificate/addCertificateReducer';
import coursesReducer from './containers/CoursesPage/coursesReducer';
import courseReducer from './containers/CoursePage/courseReducer';
import verificationReducer from './util/verification/verificationReducer';
import activeAccountReducer from './util/activeAccount/activeAccountReducer';
import secondaryNavReducer from './util/secondaryNav/secondaryNavReducer';
import profilesReducer from './util/profiles/profilesReducer';
import withdrawReducer from './util/withdraw/withdrawReducer';
import departmentCoursesReducer from './components/ViewAcademyProfile/departmentCoursesReducer';
import academiesReducer from './containers/Academies/academiesReducer';
import learnersReducer from './containers/Learners/learnersReducer';
import jobsReducer from './containers/JobsPage/jobsReducer';
import jobReducer from './containers/JobPage/jobReducer';
import companyJobsReducer from './components/ViewBusinessProfile/companyJobsReducer';
import businessesReducer from './containers/Businesses/businessesReducer';
import addJobReducer from './containers/AddJobPosition/addJobReducer';
import addCourseReducer from './containers/AddCourse/addCourseReducer';
import verificationsReducer from './util/verification/verificationsReducer';
import verificationRequestReducer from './util/verification/verificationRequestReducer';


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
  verification: verificationReducer,
  withdraw: withdrawReducer,
  verifications: verificationsReducer,
  verificationRequest: verificationRequestReducer,
});

export default reducer;
