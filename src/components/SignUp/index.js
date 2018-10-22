import React from 'react';
import { Card, Form, Grid, Button } from 'semantic-ui-react';
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
              <label className="label-cbx" htmlFor="agreement">
                <input
                  id="agreement"
                  name="agreement"
                  type="checkbox"
                  className="invisible"
                />
                <div className="checkbox">
                  <svg width="20px" height="20px" viewBox="0 0 20 20">
                    <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z" />
                    <polyline points="4 11 8 15 16 6" />
                  </svg>
                </div>
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
