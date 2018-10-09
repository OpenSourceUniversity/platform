export default function logout() {
  return function action(dispatch) {
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('address', null);
    localStorage.setItem('publicKey', null);
    localStorage.setItem('signedAddress', null);
    dispatch({
      type: 'LOGGED_OUT',
    });
  };
}
