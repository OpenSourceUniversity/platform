import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Grid, Button, Dimmer, Loader, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import storeV3Wallet from '../../util/auth/storeV3Wallet';
import setIsLoggingIn from '../WalletCreated/actions';

class WalletRecoverySuccessWithoutRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.createHDWallet();
  }

  handleButtonClick = (e, { name }) => {
    let newPath;
    if (name === 'home') {
      newPath = '/';
    } else {
      newPath = `/${name}`;
    }
    this.props.history.push(newPath);
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
      const v3Wallet = wallet.toV3(this.props.passphrase);

      this.props.storeV3Wallet(
        v3Wallet, wallet.getChecksumAddressString(),
        wallet.getPublicKey(), wallet.getPrivateKey(),
      );
      this.address = wallet.getChecksumAddressString();
    }, 3000);
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
            <Image src={loader} style={{ display: 'block', margin: '0 auto 10px auto', width: '96px' }} />
            Wallet is Recovering...
          </Loader>
        </Dimmer>
        <Card.Header className="card-logo">
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
            Success! <br />
          </span>
          <span className="orange">
            Your wallet has been recovered!
          </span>
        </Card.Description>
        <Card.Content style={{ paddingTop: 0 }}>
          <Button color="orange" primary fluid className="button" name="home" onClick={this.handleButtonClick} >AWESOME!</Button>
        </Card.Content>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
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


const WalletRecoverySuccess = withRouter(WalletRecoverySuccessWithoutRouter);
export default connect(mapStateToProps, mapDispatchToProps)(WalletRecoverySuccess);
