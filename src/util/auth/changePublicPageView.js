export function enablePublicPageView() {
  return function action(dispatch) {
    dispatch({
      type: 'PUBLIC_VIEW_ENABLE',
    });
  };
}

export function disablePublicPageView() {
  return function action(dispatch) {
    dispatch({
      type: 'PUBLIC_VIEW_DISABLE',
    });
  };
}
