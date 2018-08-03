const initialState = {
  IPFSinstance: null,
  ipfsHash: null,
  isUploading: false,
  isUploaded: false,
  isFailed: false,
};


const ipfsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'IPFS_INITIALIZED':
    return Object.assign({}, state, {
      IPFSinstance: action.payload.result,
      ipfsHash: null,
      isUploading: false,
      isUploaded: false,
      isFailed: false,
    });
  case 'IPFS_GET_REQUEST':
    return Object.assign({}, state, {
      ipfsHash: null,
      isUploading: true,
      isUploaded: false,
      isFailed: false,
    });
  case 'IPFS_GET_SUCCESS':
    return Object.assign({}, state, {
      ipfsHash: action.payload.ipfsHash,
      isUploading: false,
      isUploaded: true,
      isFailed: false,
    });
  case 'IPFS_GET_FALUER':
    return Object.assign({}, state, {
      ipfsHash: null,
      isUploading: false,
      isUploaded: false,
      isFailed: true,
    });
  default:
    return state;
  }
};


export default ipfsReducer;
