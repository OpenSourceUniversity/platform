const initialState = {
  ipfsInstance: null,
};


const ipfsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'IPFS_INITIALIZED':
    return Object.assign({}, state, {
      ipfsInstance: action.payload.ipfsInstance,
    });
  default:
    return state;
  }
};


export default ipfsReducer;
