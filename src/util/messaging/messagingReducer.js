const initialState = {
  messages: [],
  activeThread: null,
  threads: [],
  unreadAllMessagesCount: 0,
  unreadThreadMessagesCount: 0,
  isFetchingThreads: false,
  isFetchingMessages: false,
  nextUrl: null,
};


const messagingReducer = (state = initialState, action) => {
  let isActiveState = false;
  switch (action.type) {
  case 'FETCH_THREADS_REQUEST':
    return Object.assign({}, state, {
      isFetchingThreads: true,
    });
  case 'FETCH_THREADS_SUCCESS':
    return Object.assign({}, state, {
      unreadAllMessagesCount: action.threads.unread_count,
      threads: state.threads.concat(action.threads),
      nextUrl: action.threads.next,
      isFetchingThreads: false,
    });
  case 'FETCH_THREADS_FAILURE':
    return Object.assign({}, state, {
      isFetchingThreads: false,
    });
  case 'FETCH_MESSAGES_REQUEST':
    return Object.assign({}, state, {
      isFetchingMessages: true,
      messages: [],
    });
  case 'FETCH_MESSAGES_SUCCESS':
    return Object.assign({}, state, {
      unreadThreadMessagesCount: action.messages.unread_count,
      messages: state.messages.concat(action.messages),
      activeThread: action.activeThread,
      nextUrl: action.messages.next,
      isFetchingMessages: false,
    });
  case 'FETCH_MESSAGES_FAILURE':
    return Object.assign({}, state, {
      isFetchingMessages: false,
    });
  case 'MESSAGE_SENT':
    return Object.assign({}, state, {
      messages: state.messages.concat([action.message]),
    });
  case 'MESSAGE_RECEIVED':
    isActiveState = state.activeThread === action.payload.thread;
    return Object.assign({}, state, {
      messages: isActiveState ? state.messages.concat([action.payload]) : state.messages,
    });
  default:
    return state;
  }
};


export default messagingReducer;
