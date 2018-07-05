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
import profileReducer from './util/profile/profileReducer';

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
  profile: profileReducer,
});

export default reducer;
