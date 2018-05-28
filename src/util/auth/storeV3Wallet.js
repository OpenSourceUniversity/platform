export default function storeV3Wallet(v3Wallet, checksumAddress, publicKey) {
  return function action(dispatch) {
    localStorage.setItem('v3Wallet', JSON.stringify(v3Wallet));
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('address', checksumAddress);
    localStorage.setItem('publicKey', publicKey);
    dispatch({
      type: 'V3_WALLET_STORED',
      payload: {
        v3Wallet,
      },
    });
  };
}
