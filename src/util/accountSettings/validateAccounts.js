import store from '../../store';

export default function validateAccounts() {
  const {
    /* eslint-disable camelcase */
    first_name,
    last_name,
    learner_email,
    academy_name,
    academy_website,
    academy_email,
    company_name,
    company_website,
    company_email,
  } = store.getState().accounts.accounts;

  return function dispatcher(dispatch) {
    const learnerAccountCreated = !!first_name && !!last_name && !!learner_email;
    const academyAccountCreated = !!academy_name && !!academy_website && !!academy_email;
    const businessAccountCreated = !!company_name && !!company_website && !!company_email;
    localStorage.setItem('learnerIsCreated', learnerAccountCreated);
    localStorage.setItem('academyIsCreated', academyAccountCreated);
    localStorage.setItem('businessIsCreated', businessAccountCreated);
    dispatch({
      type: 'ACCOUNTS_VALIDATED',
      learnerAccount: learnerAccountCreated,
      academyAccount: academyAccountCreated,
      businessAccount: businessAccountCreated,
    });
  };
}
/* eslint-enable camelcase */
