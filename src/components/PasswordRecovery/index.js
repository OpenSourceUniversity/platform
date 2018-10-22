import React from 'react';
import { Card, Form, Grid } from 'semantic-ui-react';

export default class PasswordRecovery extends React.Component {
  handleSubmit(event, component) {
    const passphrase = event.target.elements.passphrase.value;
    component.props.setPassphrase(passphrase);
    component.props.handleItemClick(event, event.target.elements.walletrecoverysuccess);
  }

  render() {
    /* eslint-disable global-require */
    const logo = require('../../icons/edu-logo.png');
    /* eslint-enable global-require */
    return (
      <div className="recovery">
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
            Create New Passphrase <br />
          </span>
          <span className="orange">
            Enter a new passphrase. This will be stored locally on your browser
          </span>
        </Card.Description>
        <Card.Content>
          <Form onSubmit={(event) => { this.handleSubmit(event, this); }}>
            <Form.Group inline>
              <Form.Field name="passphrase" control="input" inline width="16" label={{ icon: 'user' }} type="password" placeholder="New passphrase" />
            </Form.Group>
            <Form.Button className="orange-button" name="walletrecoverysuccess" type="submit">RECOVER MY WALLET</Form.Button>
          </Form>
        </Card.Content>
      </div>
    );
  }
}
