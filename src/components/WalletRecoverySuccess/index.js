import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import storeV3Wallet from '../../util/auth/storeV3Wallet';

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

    const seed = bip39.mnemonicToSeed(this.props.mnemonicPhrase);
    const wallet = hdkey.fromMasterSeed(seed).getWallet();
    const v3Wallet = wallet.toV3(this.props.passphrase);

    this.props.storeV3Wallet(v3Wallet, wallet.getChecksumAddressString(), wallet.getPublicKey());
    this.address = wallet.getChecksumAddressString();
  }

  render() {
    /* eslint-disable global-require */
    const logo = require('../../icons/edu-logo.png');
    /* eslint-enable global-require */
    return (
      <div className="recovery">
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


function mapStateToProps() {
  return {};
}


function mapDispatchToProps(dispatch) {
  return {
    storeV3Wallet(v3Wallet, checksumAddress, publicKey) {
      dispatch(storeV3Wallet(v3Wallet, checksumAddress, publicKey));
    },
  };
}


const WalletRecoverySuccess = withRouter(WalletRecoverySuccessWithoutRouter);
export default connect(mapStateToProps, mapDispatchToProps)(WalletRecoverySuccess);
