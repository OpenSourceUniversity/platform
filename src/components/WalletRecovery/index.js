import React from 'react';
import { Card, Form, Grid, Button } from 'semantic-ui-react';

export default class WalletRecovery extends React.Component {
  handleWalletRecovery(event, component) {
    const mnemonicPhrase = event.target.elements.mnemonicPhrase.value;
    component.props.setMnemonicPhrase(mnemonicPhrase.toLowerCase());
    component.props.handleItemClick(event, event.target.elements.passwordrecovery);
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
            Wallet Recovery <br />
          </span>
          <span className="orange">
            Enter your seed phrase. This is the 12 word phrase
            you were given when you first created your wallet
          </span>
        </Card.Description>
        <Card.Content>
          <Form onSubmit={(event) => { this.handleWalletRecovery(event, this); }}>
            <Form.Group inline>
              <Form.Field name="mnemonicPhrase" inline width="16" label={{ icon: 'user' }} type="text" control="input" placeholder="Seed phrase" />
            </Form.Group>
            <Form.Button className="orange-button" name="passwordrecovery" type="submit">Continue</Form.Button>
          </Form>
          <Button style={{ float: 'left' }} className="button" name="signip" onClick={this.props.handleItemClick} >BACK TO SIGN IN</Button>
          <Button style={{ float: 'right' }} className="button" name="presignup" onClick={this.props.handleItemClick} >NEW WALLET</Button>
        </Card.Content>
      </div>
    );
  }
}
