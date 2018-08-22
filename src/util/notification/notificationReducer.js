const initialState = {
  unreadNotificationsCount: 0,
  notifications: [],
  isFetching: false,
};


const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION_RECEIVED':
    return Object.assign({}, state, {
      unreadNotificationsCount: state.unreadNotificationsCount + 1,
      notifications: [action.payload].concat(state.notifications),
    });
  case 'FETCH_NOTIFICATIONS_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_NOTIFICATIONS_SUCCESS':
    return Object.assign({}, state, {
      unreadNotificationsCount: action.notifications.unread_count,
      notifications: state.notifications.concat(action.notifications.results),
      isFetching: false,
    });
  case 'FETCH_NOTIFICATIONS_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
    });
  default:
    return state;
  }
};


export default notificationReducer;
