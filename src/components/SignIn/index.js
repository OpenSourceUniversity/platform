import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Image, Card, Form, Input, Grid, Button, Icon } from 'semantic-ui-react';

class SignInWithoutRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  loginFunc = (e, { name }) => {
    this.props.setLogInStatus(e, { name });
    const newPath = '/';
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath);
    }
  }


  render() {
    const logo = require('../../icons/edu-logo.png');
    return (
      <div>
        <Card.Header>
          <Grid centered>
            <Grid.Row>
              <img className="logo" src={logo} />
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
            Welcome Back! <br />
          </span>
          <span className="orange">
            Please enter your encryption passphrase to access your wallet
          </span>
        </Card.Description>
        <Card.Content>
          <Form>
            <Form.Group inline>
              <Form.Field inline width="16">
                <label>
                  <Icon name="lock" />
                </label>
                <Input type="password" placeholder="Passphrase" />
              </Form.Field>
            </Form.Group>
            <Form.Button name="login" onClick={this.loginFunc} className="orange-button">ACCESS MY WALLET</Form.Button>
          </Form>
          <Button fluid name="recovery" className="recovery-link" onClick={this.props.handleItemClick}>Wallet Recovery </Button> <br />
          <span> Don't have a wallet? </span>
          <Button className="button" style={{ float: 'right' }} name="signup" onClick={this.props.handleItemClick} >NEW WALLET</Button>
        </Card.Content>
      </div>
    );
  }
}

const SignIn = withRouter(SignInWithoutRouter);

export default SignIn;

