export default function resetAddCertificateProps() {
  return function action(dispatch) {
    dispatch({
      type: 'ADD_CERTIFICATE_RESET',
    });
  };
}
