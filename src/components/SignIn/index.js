import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Form, Input, Grid, Button, Loader, Dimmer } from 'semantic-ui-react';
import login from '../../util/auth/login';


class SignInWithoutRouter extends React.Component {
  constructor(props) {
    super(props);
    this.refPassphrase = null;
  }

  loginSubmit(event, component) {
    event.preventDefault();
    const passphrase = event.target.elements.passphrase.value;
    component.props.login(passphrase);
  }

  render() {
    /* eslint-disable global-require */
    const logo = require('../../icons/edu-logo.png');
    const loader = require('../../icons/osu-loader.svg');
    /* eslint-enable global-require */
    return (
      <div>
        <Dimmer active={this.props.isLoggingIn} inverted>
          <Loader size="medium">
            <p>This may take a few moments</p>
            <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
              <image href={loader} x="0" y="0" width="100%" height="100%" />
            </svg>
            Wallet is Unlocking...
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
            Welcome Back! <br />
          </span>
          <span className="orange">
            Please enter your encryption passphrase to access your wallet
          </span><br />
        </Card.Description>
        <Card.Content>
          <Form onSubmit={(event) => { this.loginSubmit(event, this); }}>
            <Form.Group inline>
              <Form.Field inline width="16" icon={{ icon: 'lock' }}>
                <Input name="passphrase" type="password" placeholder="Passphrase" />
              </Form.Field>
            </Form.Group>
            <span style={{ color: 'red' }}>
              {this.props.loginError}
            </span>
            <Form.Button style={{ marginTop: 0 }} type="submit" name="login" className="orange-button">ACCESS MY WALLET</Form.Button>
          </Form>
          <Button fluid name="recovery" className="recovery-link" onClick={this.props.handleItemClick}>Wallet Recovery </Button> <br />
          <span> Don&apos;t have a wallet? </span>
          <Button className="button" style={{ float: 'right' }} name="presignup" onClick={this.props.handleItemClick} >NEW WALLET</Button>
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
    login(passphrase) {
      dispatch(login(passphrase));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInWithoutRouter));
