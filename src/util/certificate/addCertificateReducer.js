const INITIAL_STATE = {
  isAdding: false,
  isAdded: false,
  ipfsAdding: false,
  error: null,
};


export default function addCertificateReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_CERTIFICATE_REQUEST':
    return Object.assign({}, state, {
      isAdding: true,
      error: null,
    });
  case 'ADD_CERTIFICATE_SUCCESS':
    return Object.assign({}, state, {
      isAdded: true,
      isAdding: false,
      certificate: action.certificate,
      error: null,
    });
  case 'ADD_CERTIFICATE_FAILURE':
    return Object.assign({}, state, {
      isAdding: false,
      error: action.error.message,
    });
  case 'ADD_CERTIFICATE_RESET':
    return Object.assign({}, state, {
      isAdding: false,
      isAdded: false,
      ipfsAdding: false,
      error: null,
    });
  case 'IPFS_GET_REQUEST':
    return Object.assign({}, state, {
      ipfsAdding: true,
    });
  case 'IPFS_GET_SUCCESS':
    return Object.assign({}, state, {
      ipfsAdding: false,
    });
  default:
    return state;
  }
}
