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
  case 'FETCH_NOTIFICATIONS_SUCCESS':
    return Object.assign({}, state, {
      unreadNotificationsCount: action.notifications.unread_count,
      notifications: state.notifications.concat(action.notifications.results),
    });
  default:
    return state;
  }
};


export default notificationReducer;
