import React from 'react';
import { Segment, Container, Grid, Card, Image, Button, Table, Icon, Header, Divider, Statistic, Responsive, Input, Dropdown, Message, Form, Label, Modal } from 'semantic-ui-react';
import TransactionHistoryItem from 'components/TransactionHistoryItem';

const walletOptions = [
  {
    text: '0x849c2ea2a8f0ed0fe6d28b17fa0f779d6a45dff1',
    value: '0x849c2ea2a8f0ed0fe6d28b17fa0f779d6a45dff1',
  },
];

const options = [
  '0x849c2ea2a8f0ed0fe6d28b17fa0f779d6a45dff1',
  '0x849c2ea2a8f0ed0fe6d28b17fa0f779d6a45dff1',
  '0x849c2ea2a8f0ed0fe6d28b17fa0f779d6a45dff1',
];

const eduBalance = '1000.000';
const ethBalance = '0.000';

export default class Deposit extends React.Component {
  state = { }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderAutocomplete() {
    return options.map((wallet, index) => (
      <option value={wallet} key={index} />
    ));
  }

  renderHistory() {
    const history = [
      {
        type: 'Deposit', value: 5, currency: 'ETH', date: '17/Apr/18 18:52:89', sentFrom: options[0], sentTo: walletOptions[0].value, transactionHash: '0x9c83816b9264bfc9ce28a1bf32847686ce262fde0a528ac08ef6902abd4da143',
      },
      {
        type: 'Withdraw', value: 5, currency: 'ETH', date: '17/Apr/18 18:52:89', sentFrom: walletOptions[0].value, sentTo: options[0], transactionHash: '0x9c83816b9264bfc9ce28a1bf32847686ce262fde0a528ac08ef6902abd4da143',
      },
      {
        type: 'Deposit', value: 6000, currency: 'EDU', date: '17/Apr/18 18:52:89', sentFrom: options[0], sentTo: walletOptions[0].value, transactionHash: '0x9c83816b9264bfc9ce28a1bf32847686ce262fde0a528ac08ef6902abd4da143',
      },
      {
        type: 'Withdraw', value: 5000, currency: 'EDU', date: '17/Apr/18 18:52:89', sentFrom: walletOptions[0].value, sentTo: options[0], transactionHash: '0x9c83816b9264bfc9ce28a1bf32847686ce262fde0a528ac08ef6902abd4da143',
      },
    ];

    return history.map((history, index) => (
      <TransactionHistoryItem historyDetails={history} key={index} />
    ));
  }

  render() {
    const avatar_placeholder = require('../../icons/avatar_placeholder.svg');
    const settings = require('../../icons/account_deposit.svg');
    const token = require('../../icons/edu_token.svg');
    const ethereum = require('../../icons/ethereum.svg');

    const { activeItem } = this.state;

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
                        <Image floated="right" size="mini" src={avatar_placeholder} />
                        <Card.Header>
                          DEPOSIT
                        </Card.Header>
                        <Card.Meta>
                          Send EDU Tokens or ETH to the address below.
                        </Card.Meta>
                        <Card.Description>
                          <Form className="attached fluid segment">
                            <Form.Input readOnly label="ETH/EDU Deposit Address:" fluid value={walletOptions[0].value} />
                          </Form>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="ui two buttons">
                          <Modal className="modalFix" style={{ display: 'flex' + '!important', textAlign: 'center' }} trigger={<Button basic color="grey"><Icon name="qrcode" /> Show QR Code</Button>}>
                            <Modal.Content>
                              <Modal.Header>
                                <Image style={{ display: 'inline-block' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png" />
                              </Modal.Header>
                              <Modal.Description>
                                <Header>ETH/EDU Deposit Address: {walletOptions[0].text}</Header>
                              </Modal.Description>
                            </Modal.Content>
                          </Modal>
                          <Button basic color="grey"><Icon name="copy" /> Copy Address</Button>
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
                        <Image floated="right" size="mini" src={avatar_placeholder} />
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
                            <Input fluid label="EDU" labelPosition="right" placeholder="0.0000" />
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
                    {eduBalance}
                  </Statistic.Value>
                  <Statistic.Label>EDU Balance</Statistic.Label>
                </Statistic>
                <Statistic size="tiny">
                  <Statistic.Value>
                    <svg width="24" height="24">
                      <image href={ethereum} x="0" y="0" width="100%" height="100%" />
                    </svg>
                    {ethBalance}
                  </Statistic.Value>
                  <Statistic.Label>ETH Balance</Statistic.Label>
                </Statistic>
              </Segment>
              <Card fluid>
                <Card.Content>
                  <Table celled striped>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell colSpan="6">Transaction History</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      { this.renderHistory() }
                    </Table.Body>
                  </Table>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>
    );
  }
}
