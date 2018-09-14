import { connect } from 'react-redux';
import React from 'react';
import QRCode from 'qrcode.react';
import { Segment, Container, Grid, Card, Image, Button, Icon, Header, Divider, Statistic, Input, Form, Dropdown, Dimmer, Message } from 'semantic-ui-react';
import TransactionHistoryItem from 'components/TransactionHistoryItem';
import { initWalletUnlocker } from '../../util/auth/walletUnlocker';
import getBalances from '../../util/web3/getBalances';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import store from '../../store';
import Config from '../../config';
import { withdraw, resetWithdrawProps } from './actions';

const options = JSON.parse(localStorage.getItem('withdrawWallets')) ? JSON.parse(localStorage.getItem('withdrawWallets')) : [];

class Deposit extends React.Component {
  constructor(props) {
    super(props);
    this.props.getBalances();
  }

  state = {
    coin: 'edu',
  }

  componentDidMount() {
    this.props.setSecondaryNav('account');
    document.title = 'Deposit or Withdraw';
  }

  onCoinChange(event, data) {
    this.setState({
      coin: data.value,
    });
  }

  handleHide = () => this.props.resetWithdrawProps()

  submitWithdraw(event, component) {
    event.preventDefault();
    component.props.getBalances(); // lint no unused vars
    const recipient = event.target.elements.wallet.value;
    const amount = event.target.elements.amount.value;
    const { coin } = this.state;
    store.dispatch(initWalletUnlocker((wallet) => {
      this.props.withdraw(wallet, recipient, amount, coin);
    }));
  }

  copyAddress() {
    const copyText = document.getElementById('WalletAddress');
    copyText.select();
    document.execCommand('Copy');
  }

  showPrivateKey() {
    store.dispatch(initWalletUnlocker((wallet) => {
      prompt('Copy your private key', wallet.getPrivateKeyString());
    }));
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

  render() {
    /* eslint-disable global-require */
    const avatarPlaceholder = require('../../icons/avatar_placeholder.svg');
    const settings = require('../../icons/account_deposit.svg');
    const token = require('../../icons/edu_token.svg');
    const ethereum = require('../../icons/ethereum.svg');
    /* eslint-enable global-require */

    return (
      <Container>
        <Dimmer
          active={this.props.isError || this.props.isSuccess}
          inverted
          onClickOutside={this.handleHide}
        >

          <Message success hidden={!this.props.txHash}>
            <p>Successful transaction!</p>
            <p>Your transaction hash: <a href={`${Config.network.etherscanUrl}tx/${this.props.txHash}`}>{this.props.txHash}</a></p>
          </Message>
          <Message error hidden={!this.props.error}>
            <p>Error withdraw <span style={{ textTransform: 'uppercase' }}>{this.state.coin}</span>!</p>
            <p>{this.props.error}</p>
          </Message>

        </Dimmer>
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
                        <Card.Meta style={{ textAlign: 'center', paddingTop: '1em', paddingBottom: '1em' }}>
                          <QRCode value={this.props.address} />
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
                          <Button basic color="grey" onClick={this.showPrivateKey}>
                            <Icon name="copy" />
                            Show Private Key
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
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
                          <Form id="withdrawForm" className="attached fluid segment" onSubmit={(event) => { this.submitWithdraw(event, this); }}>
                            <Form.Input
                              list="wallets"
                              name="wallet"
                              label="Choose withdraw wallet:"
                              fluid
                              placeholder="Enter ETH address:"
                            />
                            <Input
                              fluid
                              name="amount"
                              label={
                                <Dropdown
                                  defaultValue="edu"
                                  onChange={(event, data) => { this.onCoinChange(event, data); }}
                                  options={
                                    [
                                      { key: 'edu', text: 'EDU', value: 'edu' },
                                      { key: 'eth', text: 'ETH', value: 'eth' },
                                    ]}
                                />
                              }
                              labelPosition="right"
                              placeholder="0.0000"
                            />
                          </Form>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <Button form="withdrawForm" type="submit" primary fluid>Submit Withdraw</Button>
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
    isSuccess: state.withdraw.isSuccess,
    error: state.withdraw.error,
    isError: state.withdraw.isError,
    txHash: state.withdraw.txHash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBalances() {
      dispatch(getBalances());
    },
    withdraw(wallet, recipient, amount, coin) {
      dispatch(withdraw(wallet, recipient, amount, coin));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    resetWithdrawProps() {
      dispatch(resetWithdrawProps());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
