export default function setIsLoggingIn() {
  return function action(dispatch) {
    dispatch({
      type: 'LOGGING_IN',
    });
  };
}
