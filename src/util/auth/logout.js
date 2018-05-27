export default function logout() {
  return function action(dispatch) {
    dispatch({
      type: 'LOGGED_OUT',
    });
  };
}
