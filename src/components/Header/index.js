import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Menu, Dropdown, Input, Grid, Image, Icon, List } from 'semantic-ui-react';


class HeaderWithoutRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
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
    const { activeItem } = this.state;
    let logo = require('../../icons/edu-logo.png');
    let profile = require('../../icons/account_profile.svg');
    let deposit = require('../../icons/account_deposit.svg');
    let settings = require('../../icons/account_settings.svg');
    let logout = require('../../icons/account_logout.svg');
    let arrow = require('../../icons/arrow.svg');
    let avatar_placeholder = require('../../icons/avatar_placeholder.svg');
    let token = require('../../icons/edu_token.svg');
    let network = require('../../icons/nav_network.svg');
    let messages = require('../../icons/nav_messages.svg');
    let notifications = require('../../icons/nav_notifications.svg');

    const avatar_trigger = (
      <span>
        <Image className='avatar' avatar src={avatar_placeholder} />
      </span>
    );

    const network_trigger = (
      <span>
        <Image className='network icon' src={network} />
      </span>
    );

    const messages_trigger = (
      <span>
        <Image className='messages icon' src={messages} />
      </span>
    );

    const notifications_trigger = (
      <span>
        <Image className='notifications icon' src={notifications} />
      </span>
    );

    const explore_trigger = (
      <span className='explore-icon'>
        <Icon name='grid layout'>
        </Icon>Explore
      </span>
    );

    const options_notifications = [
      { key: 'alarm1', text: 'First notification', icon: 'alarm' },
      { key: 'alarm2', text: 'Second  notification', icon: 'alarm' },
      { key: 'alarm3', text: 'Third  notification', icon: 'alarm' },
      { key: 'alarm4', text: 'etc', icon: 'alarm' },
    ];

    const options_messages = [
      { key: 'message1', text: 'First notification', icon: 'comments' },
      { key: 'message2', text: 'Second  notification', icon: 'comments' },
      { key: 'message3', text: 'Third  notification', icon: 'comments' },
      { key: 'message4', text: 'etc', icon: 'comments' },
    ];

    const options_network = [
      { key: 'user1', text: 'First notification', icon: 'user' },
      { key: 'user2', text: 'Second  notification', icon: 'user' },
      { key: 'user3', text: 'Third  notification', icon: 'user' },
      { key: 'user4', text: 'etc', icon: 'user' },
    ];

    const secondary_nav_elements = [
      { key: 'dashboard', name: 'dashboard', content: 'Dashboard', active: activeItem === 'dashboard', onClick: this.handleItemClick },
      { key: 'courses', name: 'courses', content: 'Courses', active: activeItem === 'courses', onClick: this.handleItemClick },
      { key: 'programs', name: 'programs', content: 'Programs', active: activeItem === 'programs', onClick: this.handleItemClick },
      { key: 'certificates', name: 'certificates', content: 'Certification', active: activeItem === 'certificates', onClick: this.handleItemClick },
      { key: 'challenges', name: 'challenges', content: 'Challenges', active: activeItem === 'challenges', onClick: this.handleItemClick },
      { key: 'jobs', name: 'jobs', content: 'Job positions', active: activeItem === 'jobs', onClick: this.handleItemClick },
      { key: 'interviews', name: 'interviews', content: 'Interviews', active: activeItem === 'interviews', onClick: this.handleItemClick },
    ];

    const learner_academia_dropdown_elements = [
      { key: 'academia', content: 'Academia', name: 'academia', className: 'academia', active: activeItem === 'academia', onClick: this.handleItemClick },
      { key: 'courses', content: 'Browse courses', name: 'courses', active: activeItem === 'courses', onClick: this.handleItemClick },
      { key: 'certificates', content: 'My certificates', name: 'certificates', active: activeItem === 'certificates', onClick: this.handleItemClick },
      { key: 'programs', content: 'Student Programs', name: 'programs', active: activeItem === 'programs', onClick: this.handleItemClick },
      { key: 'scholarships', content: 'Scholarships', name: 'scholarships', active: activeItem === 'scholarships', onClick: this.handleItemClick },
      { key: 'challenges', content: 'Academic Challenges', name: 'challenges', active: activeItem === 'challenges', onClick: this.handleItemClick },
    ];

    const learner_businesses_dropdown_elements = [
      { key: 'businesses', content: 'Businesses', name: 'businesses', className: 'businesses', active: activeItem === 'businesses', onClick: this.handleItemClick },
      { key: 'jobs', content: 'Browse jobs', name: 'jobs', active: activeItem === 'jobs', onClick: this.handleItemClick },
      { key: 'interviews', content: 'My Interviews', name: 'interviews', active: activeItem === 'interviews', onClick: this.handleItemClick },
      { key: 'career', content: 'Career Paths', name: 'career', active: activeItem === 'career', onClick: this.handleItemClick },
      { key: 'interships', content: 'Interships', name: 'interships', active: activeItem === 'interships', onClick: this.handleItemClick },
      { key: 'business-challenges', content: 'Business challenges', name: 'business-challenges', active: activeItem === 'business-challenges', onClick: this.handleItemClick },
    ];

    return (
      <Menu size='massive' fixed='top'>
        <Container fluid>
          <Grid divided='vertically'>
            <Grid.Row className='main-nav'>
              <Menu.Item name='home' onClick={this.handleItemClick}>
                <img className='main-nav-logo' src={logo} />
              </Menu.Item>
              <Dropdown className='explore-dropdown' item trigger={explore_trigger}>
              <Dropdown.Menu>
                <Dropdown.Item className='nav-list'>
                  <List selection items={learner_academia_dropdown_elements} />
                  
                </Dropdown.Item>
                <Dropdown.Item className='nav-list'>
                  <List selection items={learner_businesses_dropdown_elements} />
                </Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>

              <Input className='search-bar' icon='search' placeholder='Search...' />


              <Menu.Menu position='right'>
                <Dropdown item trigger={network_trigger} pointing='top right' options={options_network} icon={null} />

                <Dropdown item trigger={messages_trigger} pointing='top right' options={options_messages} icon={null} />

                <Dropdown item trigger={notifications_trigger} pointing='top right' options={options_notifications} icon={null} />

                <Dropdown item trigger={avatar_trigger} pointing='top right' > 
                  <Dropdown.Menu>
                    <Dropdown.Item name='balance' className='balance-nav' onClick={this.handleItemClick}>
                      EDUx Balance:
                      <span className='balance-nav'>
                        <svg width='16' height='16' className='edu-token'> 
                          <image href={token}  x='0' y='0' width='100%' height='100%'></image>
                        </svg>
                        <span className='integer'>
                          2,389
                        </span>
                        .
                        <span className='fraction'>
                          071
                        </span>
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item name='profile' className='profile-nav' active={activeItem === 'profile'} onClick={this.handleItemClick}>
                      <svg width='16' height='16'> 
                        <image href={profile}  x='0' y='0' width='100%' height='100%'></image>
                      </svg>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item name='deposit' className='deposit-nav' active={activeItem === 'deposit'} onClick={this.handleItemClick}>
                      <svg width='16' height='16'> 
                        <image href={deposit}  x='0' y='0' width='100%' height='100%'></image>
                      </svg>
                      Deposit/Withdraw
                    </Dropdown.Item>
                    <Dropdown.Item name='settings' className='settings-nav' active={activeItem === 'settings'} onClick={this.handleItemClick}>
                      <svg width='16' height='16'> 
                        <image href={settings}  x='0' y='0' width='100%' height='100%'></image>
                      </svg>
                      Account Settings
                    </Dropdown.Item>
                    <Dropdown.Item name='sign-in' className='logout-nav' onClick={this.handleItemClick}>
                      <svg width='16' height='16'> 
                        <image href={logout}  x='0' y='0' width='100%' height='100%'></image>
                      </svg>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Grid.Row>

            <Grid.Row className='secondary-nav'>
              <Menu size='massive' items={learner_academia_dropdown_elements} />
            </Grid.Row>
          </Grid>
        </Container>
      </Menu>

    );
  }
}

const Header = withRouter(HeaderWithoutRouter);

export default Header;
