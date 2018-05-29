import React from 'react';
import { Card, Form, Input, Grid, Button } from 'semantic-ui-react';

export default class SignUp extends React.Component {
  state = {
    errorMessage: '',
  }

  passphraseSubmit(event, component) {
    const passphrase = event.target.elements.passphrase.value;
    if (passphrase.length < 6) {
      component.setState({ errorMessage: 'Passphrase shouldn\'t be shorter then 6 symbols' });
      return;
    } else if (!event.target.elements.agreement.checked) {
      component.setState({ errorMessage: 'Please agree with our Terms&Conditions' });
      return;
    }
    component.props.setPassphrase(passphrase);
    component.props.handleItemClick(event, event.target.elements.recoveryPhraseSeed);
  }

  render() {
    /* eslint-disable global-require */
    const logo = require('../../icons/edu-logo.png');
    /* eslint-enable global-require */
    return (
      <div>
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
            New ERC20 Wallet <br />
          </span>
          <span className="orange">
            Please enter a passphrase to encrypt your wallet
          </span>
        </Card.Description>
        <Card.Content>
          <Form onSubmit={(event) => { this.passphraseSubmit(event, this); }}>
            <Form.Group inline>
              <Form.Field name="passphrase" inline width="16" label={{ icon: 'user' }} control="input" type="password" placeholder="Set your passphrase" />
            </Form.Group>
            <Form.Field inline className="check-box">
              <Input
                name="agreement"
                type="checkbox"
              />
              <span>
                I agree with the <a style={{ color: 'orange' }} href="https://os.university/static/Terms-And-Conditions.pdf" rel="noopener noreferrer" target="_blank">Terms&Conditions</a>
              </span>
            </Form.Field>
            <span style={{ color: 'red' }}>
              {this.state.errorMessage}
            </span>
            <Form.Button type="submit" name="recoveryPhraseSeed" className="orange-button">CREATE MY WALLET</Form.Button>
          </Form>
          <div className="sign-up">
            <span> Already have a Wallet? </span>
            <Button name="signin" style={{ float: 'right' }} onClick={this.props.handleItemClick}>ACCESS MY WALLET</Button>
          </div>
        </Card.Content>
      </div>
    );
  }
}
