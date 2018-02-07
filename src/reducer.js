import { combineReducers } from 'redux';
import web3Reducer from './util/web3/web3Reducer';

const reducer = combineReducers({
  web3: web3Reducer,
});

export default reducer;
