export default function setActiveAccount(activeAccount) {
  return function action(dispatch) {
    localStorage.setItem('activeAccount', activeAccount);
    dispatch({
      type: 'ACCOUNT_CHANGED',
      payload: {
        activeAccount,
      },
    });
  };
}
