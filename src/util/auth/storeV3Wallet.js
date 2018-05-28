export default function storeV3Wallet(v3Wallet) {
  return function action(dispatch) {
    localStorage.setItem('v3Wallet', JSON.stringify(v3Wallet));
    dispatch({
      type: 'V3_WALLET_STORED',
      payload: {
        v3Wallet,
      },
    });
  };
}
