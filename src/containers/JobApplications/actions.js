export default function resetJobApplications() {
  return function dispatcher(dispatch) {
    dispatch({
      type: 'JOB_APPLICATIONS_RESET',
    });
  };
}
