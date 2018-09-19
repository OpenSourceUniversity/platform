const ethEcies = require('eth-ecies');


export function encrypt(publicKey, userData) {
  const userPublicKey = Buffer.from(publicKey, 'hex');
  const encryptedUserData = ethEcies.encrypt(userPublicKey, userData);
  return encryptedUserData;
}

export function decrypt(privateKey, encryptedUserData) {
  const userPrivateKey = Buffer.from(privateKey, 'hex');
  const decryptedUserData = ethEcies.decrypt(userPrivateKey, encryptedUserData);
  return decryptedUserData;
}
