export default function resetVerificationRequestMessages() {
  return function action(dispatch) {
    dispatch({
      type: 'RESET_VERIFICATION_MESSAGES',
    });
  };
}
