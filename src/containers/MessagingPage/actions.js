export default function resetMessages() {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'RESET_MESSAGES',
    });
  };
}
