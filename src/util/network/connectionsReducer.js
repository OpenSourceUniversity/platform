const INITIAL_STATE = {
  isArchiveAdding: false,
  isArchiveAdded: false,
  errorArchive: null,
};


export default function connectionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_CONNECTIONS_ARCHIVE_REQUEST':
    return Object.assign({}, state, {
      isArchiveAdding: true,
      errorArchive: null,
    });
  case 'ADD_CONNECTIONS_ARCHIVE_SUCCESS':
    return Object.assign({}, state, {
      isArchiveAdded: true,
      isArchiveAdding: false,
      errorArchive: null,
    });
  case 'ADD_CONNECTIONS_ARCHIVE_FAILURE':
    return Object.assign({}, state, {
      isArchiveAdding: false,
      errorArchive: action.error,
    });
  case 'ADD_CONNECTONS_ARCHIVE_RESET':
    return Object.assign({}, state, {
      isArchiveAdding: false,
      isArchiveAdded: false,
      errorArchive: null,
    });
  default:
    return state;
  }
}
