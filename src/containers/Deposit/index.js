import { connect } from 'react-redux';
import React from 'react';
import { Segment, Container, Grid, Card, Image, Button, Icon, Header, Divider, Statistic, Responsive, Input, Form, Dropdown } from 'semantic-ui-react';
import TransactionHistoryItem from 'components/TransactionHistoryItem';
import getBalances from '../../util/web3/getBalances';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';

const options = [
  '0x849c2ea2a8f0ed0fe6d28b17fa0f779d6a45dff1',
  '0x849c2ea2a8f0ed0fe6d28b17fa0f779d6a45dff1',
  '0x849c2ea2a8f0ed0fe6d28b17fa0f779d6a45dff1',
];

class Deposit extends React.Component {
  constructor(props) {
    super(props);
    this.props.getBalances();
  }
  componentDidMount() {
    this.props.setSecondaryNav('account');
  }

  copyAddress() {
    const copyText = document.getElementById('WalletAddress');
    copyText.select();
    document.execCommand('Copy');
  }

  renderHistory() {
    const history = [
      {
        type: 'Deposit', value: 5, currency: 'ETH', date: '17/Apr/18 18:52:89', sentFrom: options[0], sentTo: this.props.address, transactionHash: '0x9c83816b9264bfc9ce28a1bf32847686ce262fde0a528ac08ef6902abd4da143',
      },
      {
        type: 'Withdraw', value: 5, currency: 'ETH', date: '17/Apr/18 18:52:89', sentFrom: this.props.address, sentTo: options[0], transactionHash: '0x9c83816b9264bfc9ce28a1bf32847686ce262fde0a528ac08ef6902abd4da143',
      },
      {
        type: 'Deposit', value: 6000, currency: 'EDU', date: '17/Apr/18 18:52:89', sentFrom: options[0], sentTo: this.props.address, transactionHash: '0x9c83816b9264bfc9ce28a1bf32847686ce262fde0a528ac08ef6902abd4da143',
      },
      {
        type: 'Withdraw', value: 5000, currency: 'EDU', date: '17/Apr/18 18:52:89', sentFrom: this.props.address, sentTo: options[0], transactionHash: '0x9c83816b9264bfc9ce28a1bf32847686ce262fde0a528ac08ef6902abd4da143',
      },
    ];

    return history.map((historyDetails, index) => (
      <TransactionHistoryItem historyDetails={historyDetails} key={index} />
    ));
  }

  renderAutocomplete() {
    return options.map((wallet, index) => (
      <option value={wallet} key={index} />
    ));
  }

  render() {
    /* eslint-disable global-require */
    const avatarPlaceholder = require('../../icons/avatar_placeholder.svg');
    const settings = require('../../icons/account_deposit.svg');
    const token = require('../../icons/edu_token.svg');
    const ethereum = require('../../icons/ethereum.svg');
    /* eslint-enable global-require */

    return (
      <Container>
        <Header size="huge">
          <svg width="32" height="32" className="icon">
            <image href={settings} x="0" y="0" width="100%" height="100%" />
          </svg>
          Deposit/Withdraw
        </Header>
        <Divider />
        <Grid divided="vertically">
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={10}>
              <Grid>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Card fluid>
                      <Card.Content>
                        <Image floated="right" size="mini" src={avatarPlaceholder} />
                        <Card.Header>
                          DEPOSIT
                        </Card.Header>
                        <Card.Meta>
                          Send EDU Tokens or ETH to the address below.
                        </Card.Meta>
                        <Card.Description>
                          <Form className="attached fluid segment">
                            <Form.Input id="WalletAddress" style={{ fontSize: '0.9em' }} readOnly label="ETH/EDU Deposit Address:" fluid value={this.props.address} />
                          </Form>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div>
                          <Button basic color="grey" onClick={this.copyAddress}><Icon name="copy" /> Copy Address</Button>
                        </div>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Responsive minWidth={768}>
                    <Divider vertical>Or</Divider>
                  </Responsive>
                  <Responsive maxWidth={767}>
                    <Divider horizontal>Or</Divider>
                  </Responsive>
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Card fluid>
                      <Card.Content>
                        <Image floated="right" size="mini" src={avatarPlaceholder} />
                        <Card.Header>
                          WITHDRAW
                        </Card.Header>
                        <Card.Meta>
                          Select
                        </Card.Meta>
                        <Card.Description>
                          <Form className="attached fluid segment">
                            <Form.Input list="wallets" label="Choose withdraw wallet:" fluid placeholder="Choose a wallet" />
                            <datalist id="wallets">
                              {this.renderAutocomplete()}
                            </datalist>
                            <Input
                              fluid
                              label={<Dropdown defaultValue="edu" options={[{ key: 'edu', text: 'EDU', value: 'edu' }, { key: 'eth', text: 'ETH', value: 'eth' }]} />}
                              labelPosition="right"
                              placeholder="0.0000"

                            />
                          </Form>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <Button primary fluid>Submit Withdraw</Button>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider />
            </Grid.Column>
            <Grid.Column tablet={16} computer={6}>
              <Segment>
                <Statistic size="tiny" color="orange">
                  <Statistic.Value>
                    <svg width="24" height="24">
                      <image href={token} x="0" y="0" width="100%" height="100%" />
                    </svg>
                    {this.props.balancesError ? (this.props.balancesError) :
                      (this.props.eduBalance.toFixed(2))
                    }
                  </Statistic.Value>
                  <Statistic.Label>EDU Balance</Statistic.Label>
                </Statistic>
                <Statistic size="tiny">
                  <Statistic.Value>
                    <svg width="24" height="24">
                      <image href={ethereum} x="0" y="0" width="100%" height="100%" />
                    </svg>
                    {this.props.balancesError ? (this.props.balancesError) :
                      (this.props.ethBalance.toFixed(4))
                    }
                  </Statistic.Value>
                  <Statistic.Label>ETH Balance</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    eduBalance: state.web3.eduBalance,
    ethBalance: state.web3.ethBalance,
    balancesError: state.web3.web3Error,
    address: state.auth.address,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBalances() {
      dispatch(getBalances());
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
