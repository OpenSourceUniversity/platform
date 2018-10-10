const LedgerWalletProvider = require('truffle-ledger-provider');
const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")

// var infuraApiKey = process.env.INFURA_APIKEY;

const kovanLedgerOptions = {
  networkId: 42,
  accountsOffset: 0,
};


const mainnetLedgerOptions = {
  networkId: 1,
  accountsOffset: 0,
};


module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    mainnet: {
      provider() {
        const wallet = new LedgerWalletProvider(
          mainnetLedgerOptions,
          'https://mainnet.infura.io/v3/94b6488e61684d60800d7d8aa6263431',
        );
        const nonceTracker = new NonceTrackerSubprovider();
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine)
        return wallet;
      },
      network_id: mainnetLedgerOptions.networkId,
      gas: 800000,
      gasPrice: 7000000000,
    },
    kovan: {
      provider() {
        return new LedgerWalletProvider(
          kovanLedgerOptions,
          'https://kovan.infura.io/v3/94b6488e61684d60800d7d8aa6263431',
        );
      },
      network_id: kovanLedgerOptions.networkId,
      gas: 4600000,
      gasPrice: 25000000000,
    },
  },
};

// "https://kovan.infura.io/" + infuraApiKey
// https://kovan.infura.io/v3/94b6488e61684d60800d7d8aa6263431
