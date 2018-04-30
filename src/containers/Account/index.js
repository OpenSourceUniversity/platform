import React from 'react';
import { Button, Container, Header, Divider, Grid, Segment, Icon, Menu, Form } from 'semantic-ui-react';
import LernersSettings from 'components/LernersSettings';
import AcademiaSettings from 'components/AcademiaSettings';

export default class AccountSettings extends React.Component {
  state = {defaultProfile: this.props.activeAccount}

  

  render() {
    let settings = require('../../icons/account_settings.svg');
    let learners = require('../../icons/learners.svg');
    let businesses = require('../../icons/businesses.svg');
    let academia = require('../../icons/academia.svg');
    const { defaultProfile } = this.state;
    return (
      <div>
        <Container className='account-settings'>
          <Header size="huge">
            <svg width='32' height='32' className='icon'> 
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
                    Set default profile:
                  </Header>
                  <Menu fluid vertical pointing>
                    <Menu.Item name='Learner' active={this.props.activeAccount === 'Learner'} onClick={this.props.setActiveAccount}>
                    <svg width='16' height='16' className='cogs icon'> 
                      <image href={learners}  x='0' y='0' width='100%' height='100%'></image>
                    </svg>
                    Learner
                    </Menu.Item>
                    <Menu.Item name='Academy' active={this.props.activeAccount === 'Academy'} onClick={this.props.setActiveAccount}>
                      <svg width='16' height='16' className='cogs icon'> 
                        <image href={academia}  x='0' y='0' width='100%' height='100%'></image>
                      </svg>
                      Academy
                    </Menu.Item>
                    <Menu.Item name='Business' active={this.props.activeAccount === 'Business'} onClick={this.props.setActiveAccount}>
                      <svg width='16' height='16' className='cogs icon'> 
                        <image href={businesses}  x='0' y='0' width='100%' height='100%'></image>
                      </svg>
                      Business
                    </Menu.Item>
                  </Menu>
                  <Header>
                    Change Account Password
                  </Header>
                  <Divider clearing />
                  <Form >
                    <Form.Field disabled label="Email" control="input" type='email' defaultValue='Email@gmail.com' style={{ opacity: 1, color: 'black'}} className='disabled-email' />
                    <Form.Field label="Current Password" control="input" type='password' placeholder="Current Password" />
                    <Form.Field label="New Password" control="input" type='password' placeholder="New Password" />
                    <Divider hidden />
                    <Button type="submit">Change Password</Button>
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column stretched width={10}>
                <Segment className='settings'>
                  {(() => {
                    switch(this.props.activeAccount) {
                    case 'Academy': return <AcademiaSettings />;
                    case 'Learner': return <LernersSettings />;
                    default: return null;
                    }
                  })()}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}
