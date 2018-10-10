import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Grid, Button, Input, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import storeV3Wallet from '../../util/auth/storeV3Wallet';
import store from '../../store';
import signUpStep from '../../util/auth/signUpStep';
import setIsLoggingIn from './actions';

class WalletCreatedWithoutRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.createHDWallet();
  }

  address = '';

  handleButtonClick = (e, { name }) => {
    let newPath;
    if (name === 'home') {
      newPath = '/';
    } else {
      newPath = `/${name}`;
    }
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath);
    }
  }

  createHDWallet() {
    /* eslint-disable global-require */
    const hdkey = require('ethereumjs-wallet/hdkey');
    const bip39 = require('bip39');
    /* eslint-enable global-require */
    this.props.setIsLoggingIn();
    setTimeout(() => {
      const seed = bip39.mnemonicToSeed(this.props.mnemonicPhrase);
      const wallet = hdkey.fromMasterSeed(seed).getWallet();
      this.address = wallet.getChecksumAddressString();
      const v3Wallet = wallet.toV3(this.props.passphrase);
      this.props.storeV3Wallet(
        v3Wallet, wallet.getChecksumAddressString(),
        wallet.getPublicKey(), wallet.getPrivateKey(),
      );
      const { email } = this.props;
      const data = {
        email,
        step: 5,
      };
      store.dispatch(signUpStep(data));
    }, 3000);
  }

  copyAddress() {
    const copyText = document.getElementById('WalletAddress');
    copyText.select();
    document.execCommand('Copy');
  }

  render() {
    /* eslint-disable global-require */
    const logo = require('../../icons/edu-logo.png');
    const loader = require('../../icons/osu-loader.svg');
    /* eslint-enable global-require */
    return (
      <div className="recovery">
        <Dimmer className="belowNavBar" active={this.props.isLoggingIn} inverted>
          <Loader size="medium">
            <p>This may take a few moments</p>
            <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
              <image href={loader} x="0" y="0" width="100%" height="100%" />
            </svg>
            Wallet is Creating...
          </Loader>
        </Dimmer>
        <Card.Header>
          <Grid centered>
            <Grid.Row>
              <img alt="" className="logo" src={logo} />
              <span className="osu-text-logo">
                <span className="bold">
                  OPEN SOURCE <br />
                </span>
                <span className="standard-logo">
                  UNIVERSITY
                </span>
              </span>
            </Grid.Row>
          </Grid>
        </Card.Header>
        <Card.Description>
          <span className="welcome">
            Wallet successfully created! <br />
          </span>
          <span className="orange">
            Your ERC20 wallet address:
          </span>
        </Card.Description>
        <Card.Content>
          <Input
            id="WalletAddress"
            readOnly
            fluid
            value={this.address}
            action={{
              labelPosition: 'right', icon: 'copy', content: 'Copy', style: { marginTop: 0 }, onClick: this.copyAddress,
            }}
            style={{ opacity: 1 }}
          />
        </Card.Content>
        <Card.Description>
          <span>
            What would you like to do next?
          </span>
        </Card.Description>
        <Card.Content style={{ paddingTop: 0 }}>
          {/* <Button style={{ float: 'left' }} className="button"
        name="home" onClick={this.handleButtonClick} >DISCOVER PLATFORM</Button> */}
          <Button primary style={{ float: 'right' }} className="button" name="create-profile" onClick={this.handleButtonClick} >CREATE MY ACCOUNT</Button>
        </Card.Content>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
    isLoggingIn: state.auth.isLoggingIn,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    storeV3Wallet(v3Wallet, checksumAddress, publicKey, privateKey) {
      dispatch(storeV3Wallet(v3Wallet, checksumAddress, publicKey, privateKey));
    },
    setIsLoggingIn() {
      dispatch(setIsLoggingIn());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WalletCreatedWithoutRouter));
