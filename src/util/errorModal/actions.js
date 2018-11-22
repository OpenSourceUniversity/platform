export function initErrorModal(errorMessage) {
  return function action(dispatch) {
    dispatch({
      type: 'OPEN_ERROR_MODAL',
      payload: {
        errorMessage,
      },
    });
  };
}


export function closeErrorModal() {
  return function action(dispatch) {
    dispatch({
      type: 'CLOSE_ERROR_MODAL',
    });
  };
}
