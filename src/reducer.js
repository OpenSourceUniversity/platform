import { combineReducers } from 'redux';
import web3Reducer from './util/web3/web3Reducer';
import ipfsReducer from './util/ipfs/ipfsReducer';
import certificatesReducer from './containers/CertificatesPage/certificatesReducer';
import addCertificateReducer from './containers/AddCertificatePage/addCertificateReducer';

const reducer = combineReducers({
  web3: web3Reducer,
  ipfs: ipfsReducer,
  certificates: certificatesReducer,
  addCertificate: addCertificateReducer,
});

export default reducer;
