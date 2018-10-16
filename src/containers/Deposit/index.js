import { connect } from 'react-redux';
import React from 'react';
import QRCode from 'qrcode.react';
import { Segment, Container, Grid, Card, Image, Button, Icon, Header, Divider, Statistic, Table, Input, Form, Dropdown, Dimmer, Message, Breadcrumb, Menu } from 'semantic-ui-react';
import TransactionHistoryItem from 'components/TransactionHistoryItem';
import { initWalletUnlocker } from '../../util/auth/walletUnlocker';
import getBalances from '../../util/web3/getBalances';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import store from '../../store';
import Config from '../../config';
import GasPriceExtension from '../../components/GasPriceExtension';
import { withdraw, resetWithdrawProps } from './actions';
import getWithdrawTransactions from '../../util/withdraw/getWithdrawTransactions';

class Deposit extends React.Component {
  state = {
    coin: 'edu',
    activeMenuItem: 'Deposit',
  }

  componentDidMount() {
    this.props.getBalances();
    this.props.setSecondaryNav('account');
    this.props.getWithdrawTransactions();
    document.title = 'Deposit or Withdraw';
  }

  onCoinChange(event, data) {
    this.setState({
      coin: data.value,
    });
  }

  getAvatar() {
    const avatarPlaceholder = 'data:image/jpeg;base64,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';
    switch (this.props.activeAccount) {
    case 'Business': return this.props.profiles.company_logo ? `https://ipfs.io/ipfs/${this.props.profiles.company_logo}` : avatarPlaceholder;
    case 'Academy': return this.props.profiles.academy_logo ? `https://ipfs.io/ipfs/${this.props.profiles.academy_logo}` : avatarPlaceholder;
    case 'Learner': return this.props.profiles.learner_avatar ? `https://ipfs.io/ipfs/${this.props.profiles.learner_avatar}` : avatarPlaceholder;
    default: return avatarPlaceholder;
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeMenuItem: name })

  transactionsScroll = (event) => {
    const { scrollHeight, scrollTop, offsetHeight } = event.currentTarget;
    const shouldScroll = scrollHeight <= (scrollTop + offsetHeight);
    if (shouldScroll && this.props.next && !this.props.isGetingWithdrawTransactions) {
      this.props.getWithdrawTransactions(this.props.next);
    }
  }

  handleHide = () => this.props.resetWithdrawProps()

  submitWithdraw(event, component) {
    event.preventDefault();
    component.props.getBalances(); // lint no unused vars
    const recipient = event.target.elements.wallet.value;
    const amount = event.target.elements.amount.value;
    const { coin } = this.state;
    if (recipient && amount) {
      store.dispatch(initWalletUnlocker((wallet) => {
        this.props.withdraw(wallet, recipient, amount, coin);
      }, <GasPriceExtension activityText="Unlock wallet to complete withdraw transaction" />));
    }
  }

  copyAddress() {
    const copyText = document.getElementById('WalletAddress');
    copyText.select();
    document.execCommand('Copy');
  }

  showPrivateKey() {
    /* eslint-disable no-alert */
    store.dispatch(initWalletUnlocker((wallet) => {
      prompt('Copy your private key', wallet.getPrivateKeyString());
    }));
  }

  renderHistory() {
    const history = this.props.withdrawTransactions;
    return history.map((historyDetails, index) => (
      <TransactionHistoryItem historyDetails={historyDetails} key={index} />
    ));
  }

  render() {
    /* eslint-disable global-require */
    const settings = require('../../icons/account_deposit.svg');
    const token = require('../../icons/edu_token.svg');
    const ethereum = require('../../icons/ethereum.svg');
    /* eslint-enable global-require */
    return (
      <Container className="deposit">
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Deposit/Withdraw</Breadcrumb.Section>
        </Breadcrumb>
        <Divider hidden />
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
        <Header size="large">
          <svg width="32" height="32" className="icon">
            <image href={settings} x="0" y="0" width="100%" height="100%" />
          </svg>
          Deposit/Withdraw
        </Header>
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Menu style={{ margin: '0 -1px' }}>
                <Menu.Item
                  name="Deposit"
                  active={this.state.activeMenuItem === 'Deposit'}
                  onClick={this.handleItemClick}
                >
                  Deposit
                </Menu.Item>

                <Menu.Item
                  name="Withdraw"
                  active={this.state.activeMenuItem === 'Withdraw'}
                  onClick={this.handleItemClick}
                >
                  Withdraw
                </Menu.Item>
              </Menu>
              <Card
                fluid
                style={{
                  marginTop: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  padding: '1em',
                  display: this.state.activeMenuItem === 'Deposit' ? null : 'none',
                }}
              >
                <Card.Content>
                  <Image floated="right" style={{ borderRadius: '50%' }} size="mini" src={this.getAvatar()} />
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
              <Card
                fluid
                style={{
                  marginTop: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  padding: '1em',
                  display: this.state.activeMenuItem === 'Withdraw' ? null : 'none',
                }}
              >
                <Card.Content>
                  <Image floated="right" style={{ borderRadius: '50%' }} size="mini" src={this.getAvatar()} />
                  <Card.Header>
                    WITHDRAW
                  </Card.Header>
                  <Card.Meta>
                    Select
                  </Card.Meta>
                  <Card.Description>
                    <Form
                      id="withdrawForm"
                      className="attached fluid segment"
                      onSubmit={
                        (event) => {
                          this.submitWithdraw(event, this);
                        }
                      }
                    >
                      <Form.Input
                        list="wallets"
                        name="wallet"
                        label="Choose withdraw wallet:"
                        fluid
                        onChange={
                          (event, { name, value }) => { this.setState({ [name]: value }); }
                        }
                        placeholder="Enter ETH address:"
                      />
                      <Input
                        fluid
                        name="amount"
                        onChange={
                          (event, { name, value }) => { this.setState({ [name]: value }); }
                        }
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
                  <Button
                    form="withdrawForm"
                    type="submit"
                    primary
                    fluid
                    disabled={!this.state.amount || !this.state.wallet}
                  >
                    Submit Withdraw
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
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
              <Table celled striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      colSpan={6}
                    >
                      Withdraw Transaction History
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <div
                    onScroll={this.transactionsScroll}
                    style={{ overflowY: 'scroll', maxHeight: '256px' }}
                  >
                    {this.props.withdrawTransactions.length ?
                      this.renderHistory() :
                      <p style={{ textAlign: 'center' }}>You haven&apos;t any withdraw transactions</p>
                    }
                  </div>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAccount: state.activeAccount.activeAccount,
    eduBalance: state.web3.eduBalance,
    ethBalance: state.web3.ethBalance,
    profiles: state.profiles.profiles,
    balancesError: state.web3.web3Error,
    address: state.auth.address,
    isSuccess: state.withdraw.isSuccess,
    error: state.withdraw.error,
    isError: state.withdraw.isError,
    txHash: state.withdraw.txHash,
    withdrawTransactions: state.withdraw.withdrawTransactions,
    isGetingWithdrawTransactions: state.withdraw.isGetingWithdrawTransactions,
    getingWithdrawTransactionsError: state.withdraw.getingWithdrawTransactionsError,
    next: state.withdraw.next,
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
    getWithdrawTransactions() {
      dispatch(getWithdrawTransactions());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
