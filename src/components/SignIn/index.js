import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Form, Input, Grid, Button, Loader, Dimmer, Image } from 'semantic-ui-react';
import { getWallet } from '../../util/accountSettings/actions';


class SignInWithoutRouter extends React.Component {
  loginSubmit(event, component) {
    event.preventDefault();
    const passphrase = event.target.elements.passphrase.value;
    const email = event.target.elements.email.value;
    const walletAccessData = {
      password: passphrase,
      email,
    };
    component.props.getWallet(walletAccessData);
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
            <Image src={loader} style={{ display: 'block', margin: '0 auto 10px auto', width: '96px' }} />
            Wallet is Unlocking...
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
            Welcome Back! <br />
          </span>
          <span className="orange">
            Please enter your email and encryption passphrase to access your wallet
          </span><br />
        </Card.Description>
        <Card.Content>
          <Form onSubmit={(event) => { this.loginSubmit(event, this); }}>
            <Form.Field name="email" width="16" label={{ icon: 'mail' }} control="input" type="email" placeholder="example@mail.com" />
            <br />
            <Form.Field width="16" icon={{ icon: 'lock' }}>
              <Input name="passphrase" type="password" placeholder="Passphrase" />
            </Form.Field>
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
    getWallet(walletAccessData) {
      dispatch(getWallet(walletAccessData));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInWithoutRouter));
