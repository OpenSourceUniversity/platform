import React from 'react';
import { Container, Grid, Card, Image, Button, Table, Icon, Header, Divider, Statistic } from 'semantic-ui-react'

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
        <Grid divided='vertically'>
          <Grid.Row columns={3}>
            <Grid.Column tablet={16} computer={8}>
              <Header size="huge">
                <svg width='32' height='32'> 
                  <image href={settings}  x='0' y='0' width='100%' height='100%'></image>
                </svg> 
                Deposit/Withdraw
              </Header>
            </Grid.Column>
            <Grid.Column mobile={8} computer={4} textAlign='right'>
              <Statistic size='tiny' color='orange'>
                <Statistic.Value>
                  <svg width='24' height='24'> 
                    <image href={token}  x='0' y='0' width='100%' height='100%'></image>
                  </svg>
                  1,000.000
                </Statistic.Value>
                <Statistic.Label>EDU Balance</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column mobile={8} computer={4} textAlign='left'>
              <Statistic size='tiny'>
                <Statistic.Value>
                  <svg width='24' height='24'> 
                    <image href={ethereum}  x='0' y='0' width='100%' height='100%'></image>
                  </svg>
                  0.000
                </Statistic.Value>
                <Statistic.Label>ETH Balance</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Card fluid>
                <Card.Content>
                  <Image floated='right' size='mini' src={avatar_placeholder} />
                  <Card.Header>
                    DEPOSIT
                  </Card.Header>
                  <Card.Meta>
                    New User
                  </Card.Meta>
                  <Card.Description>
                    Molly wants to add you to the group <strong>musicians</strong>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>Approve</Button>
                    <Button basic color='red'>Decline</Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Card fluid>
                <Card.Content>
                  <Image floated='right' size='mini' src={avatar_placeholder} />
                  <Card.Header>
                    WITHDRAW
                  </Card.Header>
                  <Card.Meta>
                    New User
                  </Card.Meta>
                  <Card.Description>
                    Molly wants to add you to the group <strong>musicians</strong>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>Approve</Button>
                    <Button basic color='red'>Decline</Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column tablet={16} computer={6}>
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
                        <Table.Cell collapsing>
                          <Icon name='arrow up' />
                        </Table.Cell>
                        <Table.Cell>Deposit</Table.Cell>
                        <Table.Cell>5</Table.Cell>
                        <Table.Cell>ETH</Table.Cell>
                        <Table.Cell collapsing textAlign='right'>17/Apr/18 18:52:89</Table.Cell>
                        <Table.Cell>
                          <Button icon='unordered list' />
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
                        <Table.Cell>
                          <Button icon='unordered list' />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell collapsing>
                          <Icon name='arrow up' />
                        </Table.Cell>
                        <Table.Cell>Deposit</Table.Cell>
                        <Table.Cell>6,000</Table.Cell>
                        <Table.Cell>EDU</Table.Cell>
                        <Table.Cell collapsing textAlign='right'>17/Apr/18 18:52:89</Table.Cell>
                        <Table.Cell>
                          <Button icon='unordered list' />
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
                        <Table.Cell>
                          <Button icon='unordered list' />
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