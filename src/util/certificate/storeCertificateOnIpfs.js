import store from '../../store';
import addCertificate from './addCertificate';


export default function storeCertificateOnIpfs(buffer, certificateData) {
  return function dispatcher(dispatch) {
    const ipfs = store.getState().ipfs.IPFSinstance;
    dispatch({
      type: 'IPFS_GET_REQUEST',
    });
    dispatch({
      type: 'ADD_CERTIFICATE_REQUEST',
    });
    /* eslint-disable global-require */
    /* eslint-disable camelcase */
    const { checksum_hash } = certificateData;
    const hdkey = require('ethereumjs-wallet/hdkey');
    const bip39 = require('bip39');
    const openpgp = require('openpgp');
    const mnemonic = bip39.entropyToMnemonic(checksum_hash);
    const seed = bip39.mnemonicToSeed(mnemonic);
    const hdKeyInstance = hdkey.fromMasterSeed(seed);
    const passphrase = hdKeyInstance.publicExtendedKey();
    let encryptedArrayBuffer;
    const options = {
      message: openpgp.message.fromBinary(buffer),
      passwords: [passphrase],
      armor: false,
    };
    openpgp.encrypt(options).then((ciphertext) => {
      encryptedArrayBuffer = ciphertext.message.packets.write();
      const encryptedBuffer = Buffer.from(encryptedArrayBuffer);
      ipfs.add(encryptedBuffer, (err, ipfsHash) => {
        dispatch({
          type: 'IPFS_GET_SUCCESS',
          payload: {
            ipfsHash: ipfsHash[0].hash,
          },
        });
        const hashComponent = { ipfs_hash: ipfsHash[0].hash };
        const certificateDataCopy = Object.assign({}, certificateData, hashComponent);
        dispatch(addCertificate(certificateDataCopy));
      });
    });
  };
}
