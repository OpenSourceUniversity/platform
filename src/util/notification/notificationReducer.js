const initialState = {
  IPFSinstance: null,
  isFailed: false,
};


const ipfsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'IPFS_INITIALIZED':
    return Object.assign({}, state, {
      IPFSinstance: action.payload.result,
      isFailed: false,
    });
  case 'IPFS_INITIALIZATION_FAILED':
    return Object.assign({}, state, {
      isFailed: true,
      error: action.payload.error,
    });
  default:
    return state;
  }
};


export default ipfsReducer;
