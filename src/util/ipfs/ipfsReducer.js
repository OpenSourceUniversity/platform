const initialState = {
  IPFSinstance: null,
};


const ipfsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'IPFS_INITIALIZED':
    return Object.assign({}, state, {
      IPFSinstance: action.payload.IPFSinstance,
    });
  default:
    return state;
  }
};


export default ipfsReducer;
