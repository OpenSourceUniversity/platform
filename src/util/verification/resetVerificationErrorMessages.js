export default function resetVerificationErrorMessages() {
  return function action(dispatch) {
    dispatch({
      type: 'RESET_VERIFICATION_ERROR_MESSAGE',
    });
  };
}
