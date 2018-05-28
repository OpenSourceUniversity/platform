![logo.png](logo.png)

# Open Source University Platform

Empowering 7 billion learners to connect to world's top academic education and professional development opportunities on the Ethereum blockchain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have the following dependencies installed on your system.

* `nodejs >= 9.3.0`
* `npm >= 5.5.1`

Navigate to the project directory and execute the following command in order to install project dependencies:

    npm install

Install truffle as global dependency and compile the smart contracts.

* `npm install -g truffle`
* `truffle compile`

### Running

Within the project directory execute the following command:

    npm run start

This script will run the `webpack-dev-server` in hot reloading mode. Open your browser on this address and you are ready to develop: http://localhost:8080/

## Running the tests

To be added.

### Coding style

Make sure the style of the source code you commit is consistent with the style of the rest of the project.

If you are in doubt refer to the Airbnb style guide for JavaScript code and to the Solidity Style Guide for smart contracts.

* [Airbnb Style Guide](https://github.com/airbnb/javascript) - JavaScript
* [Solidity Style Guide](http://solidity.readthedocs.io/en/develop/style-guide.html) - Solidity


#### Automatically linting your code

Before commiting your changes, make sure the following command exits with zero-code:

    npm run lint

#### Editor configuration
For Atom install [linter-eslint](https://atom.io/packages/linter-eslint): `apm install linter-eslint`.

## Deployment

To be added.

## Built With

* [Semantic UI](react.semantic-ui.com) - UI Framework
* [Truffle](http://truffleframework.com/) - Development framework for Ethereum

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **RECHAINED** - *Initial work* - [RECHAINED](https://rechained.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
