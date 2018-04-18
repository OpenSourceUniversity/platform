import React from 'react';
import { Segment, Container, Grid, Card, Image, Button, Table, Icon, Header, Divider, Statistic, Responsive, Input, Dropdown, Message, Form, Label } from 'semantic-ui-react'

let walletOptions = [
    {
      text: '0x849c2ea2a8f0ed0fe6d28b17fa0f779d6a45dff1',
      value: '0x849c2ea2a8f0ed0fe6d28b17fa0f779d6a45dff1',
    },
]

export default class Deposit extends React.Component {

  state = { }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    let avatar_placeholder = require('../../icons/avatar_placeholder.svg');
    let settings = require('../../icons/account_deposit.svg');
    let token = require('../../icons/edu_token.svg');
    let ethereum = require('../../icons/ethereum.svg');

    const { activeItem } = this.state

    return (
      <Container fluid className='inbox'>
        <Header size="huge">
          <svg width='32' height='32' className="icon"> 
            <image href={settings}  x='0' y='0' width='100%' height='100%'></image>
          </svg>
          Deposit/Withdraw
        </Header>
        <Divider />
        <Grid divided='vertically'>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={10}>
              <Grid>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Card fluid>
                      <Card.Content>
                        <Image floated='right' size='mini' src={avatar_placeholder} />
                        <Card.Header>
                          DEPOSIT
                        </Card.Header>
                        <Card.Meta>
                          Send EDU Tokens or ETH to the address below.
                        </Card.Meta>
                        <Card.Description>
                          <Form className='attached fluid segment'>
                            <Form.Input readOnly label='ETH/EDU Deposit Address:' fluid value='0x849c2ea2a8f0ed0fe6d28b17fa0f779d6a45dff1' />
                          </Form>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className='ui two buttons'>
                          <Button basic color='grey'><Icon name='qrcode' /> Show QR Code</Button>
                          <Button basic color='grey'><Icon name='copy' /> Copy Address</Button>
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
                        <Image floated='right' size='mini' src={avatar_placeholder} />
                        <Card.Header>
                          WITHDRAW
                        </Card.Header>
                        <Card.Meta>
                          Select
                        </Card.Meta>
                        <Card.Description>
                          <Form className='attached fluid segment'>
                            <Form.Dropdown label='Choose withdraw wallet:' fluid placeholder='Choose a wallet' openOnFocus selection options={walletOptions} />
                            <Input fluid label='EDU' labelPosition='right' placeholder='0.0000' />
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
                <Statistic size='tiny' color='orange'>
                  <Statistic.Value>
                    <svg width='24' height='24'> 
                      <image href={token}  x='0' y='0' width='100%' height='100%'></image>
                    </svg>
                    1,000.000
                  </Statistic.Value>
                  <Statistic.Label>EDU Balance</Statistic.Label>
                </Statistic>
                <Statistic size='tiny'>
                  <Statistic.Value>
                    <svg width='24' height='24'> 
                      <image href={ethereum}  x='0' y='0' width='100%' height='100%'></image>
                    </svg>
                    0.000
                  </Statistic.Value>
                  <Statistic.Label>ETH Balance</Statistic.Label>
                </Statistic>
              </Segment>
              <Card fluid>
                <Card.Content>
                  <Table celled striped>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell colSpan='6'>Transaction History</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Icon name='arrow up' />
                        </Table.Cell>
                        <Table.Cell>Deposit</Table.Cell>
                        <Table.Cell>5</Table.Cell>
                        <Table.Cell>ETH</Table.Cell>
                        <Table.Cell textAlign='right'>17/Apr/18 18:52:89</Table.Cell>
                        <Table.Cell textAlign='center'>
                          <Button size='tiny' icon='unordered list' />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Icon name='arrow down' />
                        </Table.Cell>
                        <Table.Cell>Withdraw</Table.Cell>
                        <Table.Cell>5</Table.Cell>
                        <Table.Cell>ETH</Table.Cell>
                        <Table.Cell textAlign='right'>17/Apr/18 18:52:89</Table.Cell>
                        <Table.Cell textAlign='center'>
                          <Button size='tiny' icon='unordered list' />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Icon name='arrow up' />
                        </Table.Cell>
                        <Table.Cell>Deposit</Table.Cell>
                        <Table.Cell>6,000</Table.Cell>
                        <Table.Cell>EDU</Table.Cell>
                        <Table.Cell textAlign='right'>17/Apr/18 18:52:89</Table.Cell>
                        <Table.Cell textAlign='center'>
                          <Button size='tiny' icon='unordered list' />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Icon name='arrow down' />
                        </Table.Cell>
                        <Table.Cell>Withdraw</Table.Cell>
                        <Table.Cell>5,000</Table.Cell>
                        <Table.Cell>EDU</Table.Cell>
                        <Table.Cell textAlign='right'>17/Apr/18 18:52:89</Table.Cell>
                        <Table.Cell textAlign='center'>
                          <Button size='tiny' icon='unordered list' />
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
      </Container>
    )
  }
}