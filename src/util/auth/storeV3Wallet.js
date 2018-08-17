import storeSignedAddress from './storeSignedAddress';
import getDefaultValues from '../profiles/getDefaultValues';
import { getActiveAccount } from '../activeAccount/setActiveAccount';

export default function storeV3Wallet(v3Wallet, checksumAddress, publicKey, privateKey) {
  return function action(dispatch) {
    localStorage.setItem('v3Wallet', JSON.stringify(v3Wallet));
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('address', checksumAddress);
    localStorage.setItem('publicKey', publicKey);
    dispatch(storeSignedAddress(checksumAddress.slice(2), privateKey));
    dispatch({
      type: 'V3_WALLET_STORED',
      payload: {
        v3Wallet,
      },
    });
    dispatch(getActiveAccount());
    dispatch(getDefaultValues());
  };
}
