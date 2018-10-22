export default function resetCertificateVerificationsProps() {
  return function action(dispatch) {
    dispatch({
      type: 'FETCH_VERIFICATIONS_RESET',
    });
  };
}
