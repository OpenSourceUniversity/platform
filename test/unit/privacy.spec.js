import { describe, it } from 'mocha';
import { assert } from 'chai';
import { encrypt, decrypt } from '../../src/util/privacy';

const keythereum = require('keythereum');
const ethJsUtil = require('ethereumjs-util');


const keyObject = {
  version: 3,
  id: '224c4e91-6ec4-4434-93e3-a16858ac70d5',
  address: '0e07507fc0f0d8a780429ba0c80733c3a41a0f91',
  Crypto: {
    ciphertext: 'c345f940efad37d369cfcaaa9b799cd6b62a1067f029efe9188a14c61329afcc',
    cipherparams: { iv: '9bb5563058022bfe02df799ad567e514' },
    cipher: 'aes-128-ctr',
    kdf: 'scrypt',
    kdfparams: {
      dklen: 32,
      salt: '364696028a4a17fa4ef93c9ab88bfdf89813006b02377433e61a6a211429c807',
      n: 8192,
      r: 8,
      p: 1,
    },
    mac: '83d853e9c746b4a653f8fa29069b01fd13b817e1bc0dbf4e16ec2480fb393b31',
  },
};


describe('privacy', () => {
  const privateKey = keythereum.recover('test12345!', keyObject);
  const publicKey = ethJsUtil.privateToPublic(privateKey);

  it('encryption works', () => {
    const encrypted = encrypt(publicKey, 'baba');
    const decrypted = decrypt(privateKey, encrypted);
    assert.equal(decrypted, 'baba');
  });
});
