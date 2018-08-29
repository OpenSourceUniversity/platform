import React from 'react';
import { Card, Form, Grid, Button } from 'semantic-ui-react';
import store from '../../store';
import signUpStep from '../../util/auth/signUpStep';

export default class PreSignUp extends React.Component {
  emailSubmit = (event) => {
    const email = event.target.elements.email.value;
    const data = {
      email,
      step: 1,
    };
    store.dispatch(signUpStep(data));
    this.props.setEmail(email);
    this.props.handleItemClick(event, event.target.elements.signup);
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
            Please enter your email
          </span>
        </Card.Description>
        <Card.Content>
          <Form onSubmit={this.emailSubmit}>
            <Form.Group inline>
              <Form.Field name="email" inline width="16" label={{ icon: 'mail' }} control="input" type="email" placeholder="example@mail.com" />
            </Form.Group>
            <Form.Button type="submit" name="signup" className="orange-button">SET MY PASSPHRASE</Form.Button>
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
