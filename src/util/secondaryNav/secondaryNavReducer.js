const initialState = {
  secondaryNav: null,
};


const secondaryNavReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOCATION_CHANGED':
    return Object.assign({}, state, {
      secondaryNav: action.payload.secondaryNav,
    });
  default:
    return state;
  }
};


export default secondaryNavReducer;
