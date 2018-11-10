import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Header, Divider, Message, Dimmer, Loader, Image, Icon } from 'semantic-ui-react';
import { getAccountSettings, setWalletSettings, setEmailSettings, setToRequest, setToError } from '../../util/accountSettings/actions';
import storeV3Wallet from '../../util/auth/storeV3Wallet';

class UserSettings extends React.Component {
  componentDidMount() {
    this.props.getAccountSettings();
  }

  saveWallet(event, component) {
    event.preventDefault();
    const walletData = {
      save_wallet: event.target.elements.walletSave.checked,
      password: event.target.elements.passphrase.value,
      wallet: JSON.stringify(component.props.v3Wallet),
    };
    component.props.setWalletSettings(walletData);
  }

  saveEmailSettings(event, component) {
    event.preventDefault();
    const emailData = {
      email: event.target.elements.user_email.value,
      subscribed: event.target.elements.subscribe_general.checked,
      news_subscribed: event.target.elements.news_subscribed.checked,
    };
    component.props.setEmailSettings(emailData);
  }

  changePassphrase(event, component) {
    event.preventDefault();
    component.props.setToRequest();
    const mnemonicPhrase = event.target.elements.mnemonicPhrase.value.toLowerCase();
    const passphrase = event.target.elements.passphrase.value;
    /* eslint-disable global-require */
    const hdkey = require('ethereumjs-wallet/hdkey');
    const bip39 = require('bip39');
    /* eslint-enable global-require */
    setTimeout(() => {
      const seed = bip39.mnemonicToSeed(mnemonicPhrase);
      const wallet = hdkey.fromMasterSeed(seed).getWallet();
      const v3Wallet = wallet.toV3(passphrase);
      if (v3Wallet.address === component.props.v3Wallet.address) {
        this.props.storeV3Wallet(
          v3Wallet, wallet.getChecksumAddressString(),
          wallet.getPublicKey(), wallet.getPrivateKey(),
        );
        if (this.walletSaveRef.checked) {
          const walletData = {
            save_wallet: this.walletSaveRef.checked,
            password: passphrase,
            wallet: JSON.stringify(v3Wallet),
          };
          component.props.setWalletSettings(walletData);
        }
      } else {
        component.props.setToError();
      }
    }, 3000);
  }

  /* eslint-disable jsx-a11y/label-has-for */
  render() {
    /* eslint-disable global-require */
    const loader = require('../../icons/osu-loader.svg');
    /* eslint-enable global-require */
    return (
      <div className="user-settings">
        <Dimmer className="belowNavBar" active={this.props.isFetching} inverted>
          <Loader size="medium">
            <Image src={loader} style={{ display: 'block', margin: '0 auto 10px auto', width: '96px' }} />
            Saving settings...
          </Loader>
        </Dimmer>
        {this.props.isSaved ? (
          <Message
            positive
            header="Successfully saved!"
            onDismiss={this.handleDismiss}
          />
        ) : null}
        {this.props.error ? (
          <Message
            negative
            header="Oops, something went wrong!"
            content={this.props.error}
            onDismiss={this.handleDismiss}
          />
        ) : null}
        <Header>
          User Settings
        </Header>
        <Divider clearing />
        <Form onSubmit={(event) => { this.saveWallet(event, this); }}>
          <label className="label-cbx" htmlFor="walletSave">
            <input
              id="walletSave"
              name="walletSave"
              type="checkbox"
              className="invisible"
              ref={(arg) => { this.walletSaveRef = arg; }}
              key={`walletSave:${this.props.accountSettings.save_wallet || ''}`}
              defaultChecked={this.props.accountSettings.save_wallet}
            />
            <div className="checkbox">
              <svg width="20px" height="20px" viewBox="0 0 20 20">
                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z" />
                <polyline points="4 11 8 15 16 6" />
              </svg>
            </div>
            <span style={{ marginLeft: '5px' }}>Save my wallet on server.</span>
          </label>
          <div style={{ height: '15px' }} />
          <Form.Field
            required
            label="Wallet passphrase"
            control="input"
            type="password"
            name="passphrase"
            maxLength={130}
            placeholder="Your passphrase"
          />
          <Button className="save-button" type="submit" primary>Save Wallet Server Settings</Button>
        </Form>
        <Divider clearing />
        <Form onSubmit={(event) => { this.changePassphrase(event, this); }}>
          <Header>Change my passphrase</Header>
          <Form.Field
            required
            label="12 words mnemonic phrase"
            control="input"
            name="mnemonicPhrase"
            maxLength={130}
            placeholder="Your mnemonic phrase"
          />
          <Form.Field
            required
            label="New passphrase"
            control="input"
            type="password"
            name="passphrase"
            maxLength={130}
            placeholder="New passphrase"
          />
          <Divider clearing />
          <Button className="save-button" type="submit" primary>Change Passphrase</Button>
        </Form>
        <Header>Email settings</Header>
        <Form onSubmit={(event) => { this.saveEmailSettings(event, this); }}>
          <Form.Field
            required
            label="User email"
            control="input"
            type="email"
            name="user_email"
            maxLength={130}
            placeholder="Your user email"
            key={`email:${this.props.accountSettings.user || ''}`}
            defaultValue={this.props.accountSettings.user ? this.props.accountSettings.user.email : ''}
          />
          <Divider hidden />
          {
            this.props.accountSettings.email_verified ?
              <div>
                <Icon name="check" color="green" />
                <span> Email verified</span>
              </div> :
              <div>
                <Icon name="close" color="red" />
                <span> Email not verified. Verification email sent</span>
              </div>
          }
          <Divider clearing />
          <p>Subscribtion settings</p>
          <Form.Field inline className="check-box">
            <label className="label-cbx" htmlFor="subscribe_general">
              <input
                id="subscribe_general"
                name="subscribe_general"
                type="checkbox"
                className="invisible"
                key={`subscribe_general:${this.props.accountSettings.subscribed || ''}`}
                defaultChecked={this.props.accountSettings.subscribed}
              />
              <div className="checkbox">
                <svg width="20px" height="20px" viewBox="0 0 20 20">
                  <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z" />
                  <polyline points="4 11 8 15 16 6" />
                </svg>
              </div>
              <span style={{ marginLeft: '5px' }}>Receive account related emails.</span>
            </label>
          </Form.Field>
          <Form.Field inline className="check-box">
            <label className="label-cbx" htmlFor="news_subscribed">
              <input
                id="news_subscribed"
                name="news_subscribed"
                type="checkbox"
                className="invisible"
                key={`news_subscribed:${this.props.accountSettings.news_subscribed || ''}`}
                defaultChecked={this.props.accountSettings.news_subscribed}
              />
              <div className="checkbox">
                <svg width="20px" height="20px" viewBox="0 0 20 20">
                  <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z" />
                  <polyline points="4 11 8 15 16 6" />
                </svg>
              </div>
              <span style={{ marginLeft: '5px' }}>Receive news emails.</span>
            </label>
          </Form.Field>
          <Divider clearing />
          <Button className="save-button" type="submit" primary>Save Email Settings</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountSettings: state.accountSettings.accountSettings,
    isSaved: state.accountSettings.isSaved,
    isFetching: state.accountSettings.isFetching,
    error: state.accountSettings.error,
    v3Wallet: state.auth.v3Wallet,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    getAccountSettings() {
      dispatch(getAccountSettings());
    },
    setWalletSettings(walletData) {
      dispatch(setWalletSettings(walletData));
    },
    setEmailSettings(emailData) {
      dispatch(setEmailSettings(emailData));
    },
    storeV3Wallet(v3Wallet, checksumAddress, publicKey, privateKey) {
      dispatch(storeV3Wallet(v3Wallet, checksumAddress, publicKey, privateKey));
    },
    setToRequest() {
      dispatch(setToRequest());
    },
    setToError() {
      dispatch(setToError());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
