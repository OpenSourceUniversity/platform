export default function getCoinbase(web3) {
  return function action(dispatch) {
    web3.eth.getCoinbase((error, coinbase) => {
      dispatch({
        type: 'GET_COINBASE_SUCCESS',
        payload: {
          coinbase,
        },
      });
    });
  };
}
