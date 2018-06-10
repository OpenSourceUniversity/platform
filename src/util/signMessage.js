const ethUtil = require('ethereumjs-util');

export default function signMessage(message, privateKey) {
  const normalizedPk = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
  const hashedMessage = ethUtil.hashPersonalMessage(ethUtil.toBuffer(message));
  const signed = ethUtil.ecsign(hashedMessage, ethUtil.toBuffer(normalizedPk));
  const combined = Buffer.concat([
    Buffer.from(signed.r),
    Buffer.from(signed.s),
    Buffer.from([signed.v])]);
  const combinedHex = combined.toString('hex');
  return `0x${combinedHex}`;
}
