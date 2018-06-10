import signMessage from '../signMessage';

export default function storeSignedAddress(address, privateKey) {
  return function action(dispatch) {
    const signedAddress = signMessage(address, privateKey.toString('hex'));
    localStorage.setItem('signedAddress', signedAddress);
    dispatch({
      type: 'SIGNED_ADDRESS_STORED',
      payload: {
        signature: signedAddress,
      },
    });
  };
}
