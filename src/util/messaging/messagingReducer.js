import { markAsRead } from '../../containers/MessagingPage/actions';

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

const moveToFirst = (threadsInit, threadID) => {
  const threads = threadsInit;
  const threadToMove = threads.find((element) => {
    const equal = element.id === threadID;
    return equal;
  });
  const index = threads.indexOf(threadToMove);
  threads.splice(index, 1);
  threads.unshift(threadToMove);
  return threads;
};


const messagingReducer = (state = initialState, action) => {
  let isActiveState = false;
  const buffer = {};
  switch (action.type) {
  case 'FETCH_THREADS_REQUEST':
    return Object.assign({}, state, {
      isFetchingThreads: true,
      threads: [],
      threadsById: {},
    });
  case 'FETCH_UNREAD_COUNT_SUCCESS':
    return Object.assign({}, state, {
      unreadAllMessagesCount: action.unread_count,
    });
  case 'FETCH_THREADS_SUCCESS':
    return Object.assign({}, state, {
      threads: state.threads.concat(action.threads),
      threadsById: Object.assign({}, state.threadsById, action.threadsById),
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
      messages: action.messages.concat(state.messages),
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
    buffer[action.message.thread] = state.threadsById[action.message.thread];
    if (buffer[action.message.thread]) {
      buffer[action.message.thread].last_message = action.message;
    }
    return Object.assign({}, state, {
      messages: state.messages.concat([action.message]),
      threadsById: Object.assign({}, state.threadsById, buffer),
      threads: moveToFirst(state.threads, action.message.thread),
    });
  case 'MESSAGE_RECEIVED':
    isActiveState = state.activeThread === action.payload.thread;
    buffer[action.payload.thread] = state.threadsById[action.payload.thread];
    if (buffer[action.payload.thread]) {
      if (state.activeThread !== action.payload.thread) {
        buffer[action.payload.thread].unread_count += 1;
      } else {
        markAsRead(action.payload.id);
      }
      buffer[action.payload.thread].last_message = action.payload;
    }
    return Object.assign({}, state, {
      messages: isActiveState ? state.messages.concat([action.payload]) : state.messages,
      unreadAllMessagesCount: state.activeThread !== action.payload.thread ?
        state.unreadAllMessagesCount + 1 :
        state.unreadAllMessagesCount,
      threadsById: Object.assign({}, state.threadsById, buffer),
      threads: moveToFirst(state.threads, action.payload.thread),
    });
  case 'NEW_THREAD_RECEIVED':
    return Object.assign({}, state, {
      threadsById: Object.assign({}, state.threadsById, action.threadById),
      threads: [action.thread].concat(state.threads),
    });
  default:
    return state;
  }
};


export default messagingReducer;
