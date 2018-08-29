import React from 'react';
import { Card, Form, Input, Grid, Button } from 'semantic-ui-react';
import store from '../../store';
import signUpStep from '../../util/auth/signUpStep';

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
    const { email } = component.props;
    const data = {
      email,
      step: 2,
    };
    store.dispatch(signUpStep(data));
    component.props.handleItemClick(event, event.target.elements.recoveryPhraseSeed);
  }

  render() {
    /* eslint-disable global-require */
    const logo = require('../../icons/edu-logo.png');
    /* eslint-enable global-require */
    /* eslint-disable jsx-a11y/label-has-for */
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
              <label htmlFor="agreement">
                <Input
                  id="agreement"
                  name="agreement"
                  type="checkbox"
                  labelPosition="left"
                />
                <span style={{ marginLeft: '5px' }}>I agree with the <a style={{ color: 'orange' }} href="https://os.university/static/Terms-And-Conditions.pdf" rel="noopener noreferrer" target="_blank">Terms&Conditions</a></span>
              </label>
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
