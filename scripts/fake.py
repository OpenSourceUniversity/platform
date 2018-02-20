import web3
from web3 import Web3, HTTPProvider
import json

web3_connection = Web3(HTTPProvider('http://127.0.0.1:8545'))


CertificateStorageJson = json.load(open('build/contracts/CertificateStorage.json'))
CertificateStorage = web3.contract.construct_contract_factory(
    web3=web3_connection, abi=CertificateStorageJson['abi']
)

CertificateStorage.call({
    'to': '0x345ca3e014aaf5dca488057592ee47305d9b3e10'
}).addCertificate(
    '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
    '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
    '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
    ['Jordan', ''],
    ['Math', ''],
    5,
    True)
