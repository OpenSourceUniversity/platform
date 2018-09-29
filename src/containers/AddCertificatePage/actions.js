export function resetAddCertificateProps() {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_CERTIFICATE_RESET',
    });
  };
}

export function resetCertificateAutocomplete() {
  return function action(dispatch) {
    dispatch({
      type: 'RESET_CERTIFICATE_AUTOCOMPLETE',
    });
  };
}
