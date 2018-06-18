export default function setSecondaryNav(secondaryNav) {
  return function action(dispatch) {
    dispatch({
      type: 'LOCATION_CHANGED',
      payload: {
        secondaryNav,
      },
    });
  };
}
