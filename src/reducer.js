import { combineReducers } from 'redux';
import web3Reducer from './util/web3/web3Reducer';
import certificatesReducer from './containers/CertificatesPage/certificatesReducer';

const reducer = combineReducers({
  web3: web3Reducer,
  certificates: certificatesReducer,
});

export default reducer;
