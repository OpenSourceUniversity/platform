export default function setOnBoardingActiveElement(activeElement) {
  return function action(dispatch) {
    dispatch({
      type: 'ACTIVE_ELEMENT_CHANGED',
      payload: {
        onBoardingActiveElement: activeElement,
      },
    });
  };
}
