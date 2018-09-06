var LedgerWalletProvider = require("truffle-ledger-provider");
//var infuraApiKey = process.env.INFURA_APIKEY;

var kovanLedgerOptions = {
    networkId: 42,
    accountsOffset: 0
};


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    kovan: {
      provider() {
        return new LedgerWalletProvider(
          kovanLedgerOptions,
          'https://kovan.infura.io/v3/94b6488e61684d60800d7d8aa6263431'
        )
      },
      network_id: kovanLedgerOptions.networkId,
      gas: 4600000,
      gasPrice: 25000000000
    }
  }
};

// "https://kovan.infura.io/" + infuraApiKey
// https://kovan.infura.io/v3/94b6488e61684d60800d7d8aa6263431
