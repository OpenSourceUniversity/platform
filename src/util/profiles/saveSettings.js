import axios from 'axios';
import store from '../../store';
import Config from '../../config';
import getDefaultValues from './getDefaultValues';

const { bdnUrl } = Config.network;

const LEARNER = 1;
const ACADEMY = 2;
const BUSINESS = 3;
const STATES = { learner: LEARNER, academy: ACADEMY, business: BUSINESS };

export default function saveSettings(profileData, account, buffer) {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'SETTINGS_SAVE_REQUEST',
    });
    const web3 = store.getState().web3.web3Instance;
    const ipfs = store.getState().ipfs.IPFSinstance;
    const axiosConfig = {
      headers: {
        'Auth-Signature': store.getState().auth.signedAddress,
        'Auth-Eth-Address': store.getState().auth.address.slice(2),
        'Profile-Type': STATES[account],
      },
    };
    let learner_ipfs_hash = null;
    let academy_ipfs_hash = null;
    let company_ipfs_hash = null;
    if(buffer) {
      ipfs.add(buffer, (err, ipfsHash) => {
        switch(STATES[account]) {
          case 1:
            learner_ipfs_hash = ipfsHash[0].hash;
          case 2:
            academy_ipfs_hash = ipfsHash[0].hash;
          case 3:
            company_ipfs_hash = ipfsHash[0].hash;
          default:
            null;
        }
        const postData = {
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          learner_position: profileData.learner_position,
          learner_specialisation: profileData.learner_specialisation,
          learner_about: profileData.learner_about,
          public_profile: profileData.public_profile,
          learner_email: profileData.learner_email,
          learner_site: profileData.learner_site,
          phone_number: profileData.phone_number,
          learner_country: profileData.learner_country,
          learner_avatar: learner_ipfs_hash,
          academy_name: profileData.academy_name,
          academy_website: profileData.academy_website,
          academy_email: profileData.academy_email,
          academy_country: profileData.academy_country,
          academy_about: profileData.academy_about,
          academy_logo: academy_ipfs_hash,
          company_name: profileData.company_name,
          company_website: profileData.company_website,
          company_email: profileData.company_email,
          company_country: profileData.company_country,
          company_about: profileData.company_about,
          company_logo: company_ipfs_hash,
        };
        axios.post(`${bdnUrl}api/v1/profile/`, postData, axiosConfig).then(() => {
          dispatch(getDefaultValues());
          dispatch({
            type: 'SETTINGS_SAVE_SUCCESS',
          });
          setTimeout(() => {
            dispatch({
              type: 'RESET_STATES',
            });
          }, 2000);
        }).catch(() => {
          dispatch({
            type: 'SETTINGS_GET_FAILURE',
            error: 'Fail',
          });
        });
      });
    }
    else {
      const postData = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        learner_position: profileData.learner_position,
        learner_specialisation: profileData.learner_specialisation,
        learner_about: profileData.learner_about,
        public_profile: profileData.public_profile,
        learner_email: profileData.learner_email,
        learner_site: profileData.learner_site,
        phone_number: profileData.phone_number,
        learner_country: profileData.learner_country,
        learner_avatar: learner_ipfs_hash,
        academy_name: profileData.academy_name,
        academy_website: profileData.academy_website,
        academy_email: profileData.academy_email,
        academy_country: profileData.academy_country,
        academy_about: profileData.academy_about,
        academy_logo: academy_ipfs_hash,
        company_name: profileData.company_name,
        company_website: profileData.company_website,
        company_email: profileData.company_email,
        company_country: profileData.company_country,
        company_about: profileData.company_about,
        company_logo: company_ipfs_hash,
      };
      axios.post(`${bdnUrl}api/v1/profile/`, postData, axiosConfig).then(() => {
        dispatch(getDefaultValues());
        dispatch({
          type: 'SETTINGS_SAVE_SUCCESS',
        });
        setTimeout(() => {
          dispatch({
            type: 'RESET_STATES',
          });
        }, 2000);
      }).catch(() => {
        dispatch({
          type: 'SETTINGS_GET_FAILURE',
          error: 'Fail',
        });
      });
    }
  };
}
