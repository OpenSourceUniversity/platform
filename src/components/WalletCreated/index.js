import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Image, Card, Form, Input, Grid, Button, Icon, Label } from 'semantic-ui-react';

class WalletCreatedWithoutRouter extends React.Component {
  constructor(props) {
    super(props);
    this.props.setLogInStatus(this, { name: 'login' });
  }

  walletAddress = '0x5e50703df199c351ffd92f2ab3fa4e9d5e1bbddf'

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  handleButtonClick = (e, { name }) => {
    let newPath;
    if (name === 'home') {
      newPath = '/';
    } else {
      newPath = `/${name}`;
    }
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath);
    }
  }

  render() {
    const logo = require('../../icons/edu-logo.png');
    return (
      <div className="recovery">
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
            Wallet successfully created! <br />
          </span>
          <span className="orange">
            Your ERC20 wallet address:
          </span>
        </Card.Description>
        <Card.Content>
          <Input
            disabled
            fluid
            defaultValue={this.walletAddress}
            action={{
              labelPosition: 'right', icon: 'copy', content: 'Copy', style: { marginTop: 0 },
            }}
            style={{ opacity: 1 }}
          />
        </Card.Content>
        <Card.Description>
          <span>
            What would you like to do next?
          </span>
        </Card.Description>
        <Card.Content style={{ paddingTop: 0 }}>
          <Button style={{ float: 'left' }} className="button" name="home" onClick={this.handleButtonClick} >DISCOVER PLATFORM</Button>
          <Button primary style={{ float: 'right' }} className="button" name="create-profile" onClick={this.handleButtonClick} >CREATE MY ACCOUNT</Button>
        </Card.Content>
      </div>
    );
  }
}

const WalletCreated = withRouter(WalletCreatedWithoutRouter);

export default WalletCreated;
