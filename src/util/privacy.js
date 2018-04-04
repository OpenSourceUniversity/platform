const ethEcies = require('eth-ecies');


export function encrypt(publicKey, userData) {
  const userPublicKey = Buffer.from(publicKey, 'hex');
  const bufferUserData = Buffer.from(userData);
  const encryptedUserData = ethEcies.encrypt(userPublicKey, bufferUserData);
  return encryptedUserData.toString('base64');
}

export function decrypt(privateKey, encryptedUserData) {
  const userPrivateKey = Buffer.from(privateKey, 'hex');
  const bufferEncryptedUserData = Buffer.from(encryptedUserData, 'base64');
  const decryptedUserData = ethEcies.decrypt(userPrivateKey, bufferEncryptedUserData);
  return decryptedUserData.toString('utf8');
}
