import CryptoJS from 'crypto-js';

const ethEcies = require('eth-ecies');
const Wallet = require('ethereumjs-wallet');


// function toWordArray(str){
//   return CryptoJS.enc.Utf8.parse(str);
// }
//
// function toString(words){
//   return CryptoJS.enc.Utf8.stringify(words);
// }
//
// function toBase64String(words){
//   return CryptoJS.enc.Base64.stringify(words);
// }

// export function encryptIPFS(input, key) {
//     var PROTOCOL_AES256 = 2;
//     var secret_key = CryptoJS.SHA256(key);
//     var header = toWordArray("OSUni" + String.fromCharCode(PROTOCOL_AES256));
//     var body = CryptoJS.AES.encrypt(input, secret_key);
//
//     // construct the packet
//     // HEADER + IV + BODY
//     header.concat(iv);
//     header.concat(body.ciphertext);
//
//     // encode in base64
//     return toBase64String(header);
// }
//
//
// export function decryptIPFS(input, key) {
//     // convert payload encoded in base64 to words
//     var packet = CryptoJS.enc.Base64.parse(input);
//
//     // helpers to compute for offsets
//     var PROTOCOL_AES256 = 2;
//     var secret_key = CryptoJS.SHA256(key);
//     var header = toWordArray("OSUni" + String.fromCharCode(PROTOCOL_AES256));
//     var iv = CryptoJS.lib.WordArray.random(16);
//
//     // compute for offsets
//     var packet_size = packet.words.length - (iv.words.length + header.words.length);
//     var start = iv.words.length + header.words.length;
//     var end = packet.words.length;
//
//     var ciphertext = CryptoJS.lib.WordArray.create(packet.words.slice(start, end));
//     var parsed_iv = CryptoJS.lib.WordArray.create(packet.words.slice(header.words.length, iv.words.length+1));
//     ciphertext = toBase64String(ciphertext);
//     var decrypted = CryptoJS.AES.decrypt(ciphertext, secret_key, {iv: parsed_iv});
//
//     return toString(decrypted);
// }


// export function encryptTEST(_data,_key) {
//     if (_key.length != (128 + 256) / 8 * 2) throw new Error('invalid_key');
//
//     var iv = new Buffer(_key.substr(0, 128 / 8 * 2), 'hex');
//     var key = new Buffer(_key.substr(128 / 8 * 2), 'hex');
//     var data = crypto.randomBytes(8).toString('hex') + _data;
//
//     var e = crypto.createCipheriv('AES256', key, iv);
//     var c = e.update(data, 'utf8', 'base64');
//     c += e.final('base64');
//     return c;
// }
//
// export function decryptTEST(_data,_key) {
//     if (_key.length != (128 + 256) / 8 * 2) throw new Error('invalid_key');
//
//     var iv = new Buffer(_key.substr(0, 128 / 8 * 2), 'hex');
//     var key = new Buffer(_key.substr(128 / 8 * 2), 'hex');
//
//     var d = crypto.createDecipheriv('AES256', key, iv);
//     var p = d.update(data, 'base64', 'utf8');
//     p += d.final('utf8');
//     return p;
// }


export function encryptIPFS(publicKey, userData) {
  const userPublicKey = Buffer.from(publicKey, 'hex');
  const encryptedUserData = ethEcies.encrypt(userPublicKey, userData);
  return encryptedUserData.toString('base64');
}

export function decryptIPFS(privateKey, encryptedUserData) {
  const userPrivateKey = Buffer.from(privateKey, 'hex');
  const bufferEncryptedUserData = Buffer.from(encryptedUserData, 'base64');
  const decryptedUserData = ethEcies.decrypt(userPrivateKey, bufferEncryptedUserData);
  return decryptedUserData.toString('utf8');
}
