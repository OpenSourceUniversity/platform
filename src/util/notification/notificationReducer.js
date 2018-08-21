const initialState = {
  unreadNotificationsCount: 0,
  notifications: [],
};


const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION_RECEIVED':
    return Object.assign({}, state, {
      unreadNotificationsCount: state.unreadNotificationsCount + 1,
      notifications: [action.payload].concat(state.notifications),
    });
  default:
    return state;
  }
};


export default notificationReducer;
