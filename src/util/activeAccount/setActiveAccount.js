import axios from 'axios';
import store from '../../store';
import Config from '../../config';
import validateAccounts from '../profiles/validateAccounts';


const { bdnUrl } = Config.network;

const LEARNER = 1;
const ACADEMY = 2;
const BUSINESS = 3;
const STATES = { Learner: LEARNER, Academy: ACADEMY, Business: BUSINESS };
const GETSTATES = { 1: 'Learner', 2: 'Academy', 3: 'Business' };

export function setActiveAccount(activeAccount) {
  return function action(dispatch) {
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
        'Profile-Type': STATES[activeAccount],
      },
    };
    axios.post(`${bdnUrl}api/v1/profile/set_active_profile/`, null, axiosConfig).then(() => {
      localStorage.setItem('activeAccount', activeAccount);
      dispatch({
        type: 'ACCOUNT_CHANGED',
        activeAccount,
      });
    }).catch(() => {
      localStorage.setItem('activeAccount', 'Learner');
    });
  };
}

export function getActiveAccount() {
  return function action(dispatch) {
    const headers = new Headers({
      'Auth-Signature': store.getState().auth.signedAddress,
      'Auth-Eth-Address': store.getState().auth.address.slice(2),
    });
    return fetch(`${bdnUrl}api/v1/profile/get_active_profile/`, { headers })
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'ACCOUNT_CHANGED',
            activeAccount: 'Learner',
          });
        } else {
          dispatch({
            type: 'ACCOUNT_CHANGED',
            activeAccount: GETSTATES[body.active_profile_type],
          });
          localStorage.setItem('activeAccount', GETSTATES[body.active_profile_type]);
          dispatch(validateAccounts());
        }
      })
      .catch(() => {
        dispatch({
          type: 'ACCOUNT_CHANGED',
          activeAccount: 'Learner',
        });
      });
  };
}
