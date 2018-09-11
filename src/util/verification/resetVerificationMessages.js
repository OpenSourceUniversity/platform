export default function resetVerificationMessages() {
  return function action(dispatch) {
    dispatch({
      type: 'RESET_VERIFICATION_MESSAGES',
    });
  };
}
