const initialState = {
  messages: [],
  activeThread: null,
  threads: [],
  threadsById: {},
  unreadAllMessagesCount: 0,
  isFetchingThreads: false,
  isFetchingMessages: false,
  nextUrl: null,
};


const messagingReducer = (state = initialState, action) => {
  let isActiveState = false;
  const buffer = {};
  switch (action.type) {
  case 'FETCH_THREADS_REQUEST':
    return Object.assign({}, state, {
      isFetchingThreads: true,
    });
  case 'FETCH_UNREAD_COUNT_SUCCESS':
    return Object.assign({}, state, {
      unreadAllMessagesCount: action.unread_count,
    });
  case 'FETCH_THREADS_SUCCESS':
    return Object.assign({}, state, {
      threads: state.threads.concat(action.threads),
      threadsById: Object.assign({}, state.threadsById, action.threadsById),
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
    });
  case 'RESET_MESSAGES':
    return Object.assign({}, state, {
      messages: [],
    });
  case 'FETCH_MESSAGES_SUCCESS':
    return Object.assign({}, state, {
      messages: state.messages.concat(action.messages).reverse(),
      activeThread: action.activeThread,
      nextUrl: action.next,
      isFetchingMessages: false,
      threadsById: Object.assign({}, state.threadsById, action.threadToUpdate),
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
    buffer[action.payload.thread] = state.threadsById[action.payload.thread];
    if (state.activeThread !== action.payload.thread) {
      buffer[action.payload.thread].unread_count += 1;
    }
    return Object.assign({}, state, {
      messages: isActiveState ? state.messages.concat([action.payload]) : state.messages,
      unreadAllMessagesCount: state.activeThread !== action.payload.thread ?
        state.unreadAllMessagesCount + 1 :
        state.unreadAllMessagesCount,
      threadsById: Object.assign({}, state.threadsById, buffer),
    });
  default:
    return state;
  }
};


export default messagingReducer;
