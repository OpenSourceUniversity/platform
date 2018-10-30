import store from '../../store';
import storeSignedAddress from './storeSignedAddress';
import getDefaultValues from '../profiles/getDefaultValues';
import { getActiveAccount } from '../activeAccount';
import notificationsConnection from '../notification/notificationsConnection';
import messagesConnection from '../messaging/messagesConnection';
import { storeWallet } from '../accountSettings/actions';

export default function storeV3Wallet(
  v3Wallet, checksumAddress,
  publicKey, privateKey, passphrase,
) {
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
    dispatch(notificationsConnection());
    dispatch(messagesConnection());
    const { onBoardingActiveElement } = store.getState().auth;
    if (onBoardingActiveElement === 'created' && passphrase) {
      const walletSettings = {
        password: passphrase,
        wallet: JSON.stringify(v3Wallet),
        save_wallet: true,
      };
      dispatch(storeWallet(walletSettings));
    } else if (onBoardingActiveElement === 'walletrecoverysuccess' && passphrase) {
      const walletSettings = {
        password: passphrase,
        wallet: JSON.stringify(v3Wallet),
        save_wallet: true,
        isRecovery: true,
      };
      dispatch(storeWallet(walletSettings));
    }
  };
}
