import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Button, Container, Header, Divider, Grid, Segment, Icon, Menu, Form } from 'semantic-ui-react';
import LernersSettings from 'components/LernersSettings';

export default class AccountSettings extends React.Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  state = { activeItem: 'Learners' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    let settings = require('../../icons/account_settings.svg');
    
  const { activeItem } = this.state
    return (
      <div>
        <Container fluid className='account-settings'>
          <Header size="huge">
            <svg width='44' height='44' className='cogs icon'> 
              <image href={settings}  x='0' y='0' width='100%' height='100%'></image>
            </svg>
            Account Settings
          </Header>
          <Divider clearing />
          <Grid reversed="mobile">
            <Grid.Row className='double-form'>
              <Grid.Column width={6}>
                <Segment>
                  <Header>
                    Set default profile
                  </Header>
                  <Menu fluid vertical pointing>
                    <Menu.Item name='Lerners' active={activeItem === 'lerners'} onClick={this.handleItemClick} />
                    <Menu.Item name='Academia' active={activeItem === 'academia'} onClick={this.handleItemClick} />
                    <Menu.Item name='Businesss' active={activeItem === 'businesss'} onClick={this.handleItemClick} />
                  </Menu>
                  <Header>
                    Change Account Password
                  </Header>
                  <Divider clearing />
                  <Form>
                    <Form.Field disabled label="Email" autoComplete='email' control="input" type='email' placeholder='Email@gmail.com' />
                    <Form.Field label="Current Password" control="input" type='password' placeholder="Current Password" />
                    <Form.Field label="New Password" control="input" type='password' placeholder="New Password" />
                    <Divider hidden />
                    <Button type="submit">Change Password</Button>
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column stretched width={10}>
                <Segment>
                  <LernersSettings />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}
