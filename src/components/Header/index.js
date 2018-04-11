import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Menu, Dropdown, Input, Grid, Image, Icon } from 'semantic-ui-react';


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

    const trigger = (
      <span>
        <Image avatar src={avatar_placeholder} />
      </span>
    )

    return (
      <Menu size="massive" fixed='top'>
        <Container fluid>
          <Grid divided='vertically'>
            <Grid.Row className='main-nav'>
              <Menu.Item name="home" onClick={this.handleItemClick}>
                  <img src={logo} />
              </Menu.Item>

              <Menu.Item name="certificates" active={activeItem === 'certificates'} onClick={this.handleItemClick}>
                Certificates
              </Menu.Item>
              <Menu.Item name="courses" active={activeItem === 'courses'} onClick={this.handleItemClick}>
                Courses
              </Menu.Item>
              <Menu.Item name="jobs" active={activeItem === 'jobs'} onClick={this.handleItemClick}>
                Jobs
              </Menu.Item>
              <Menu.Item name="business" active={activeItem === 'business'} onClick={this.handleItemClick}>
                Business
              </Menu.Item>


              <Menu.Menu position="right">
                <Input className='search-bar' icon='search' placeholder='Search...' />
                <Dropdown item trigger={trigger} pointing='top right' > 
                  <Dropdown.Menu>
                    <Dropdown.Item name="balance" className='balance-nav' onClick={this.handleItemClick}>
                      EDUx Balance:
                      <span className='balance-nav'>
                        <svg width="16" height="16" className='edu-token'> 
                          <image href={token}  x="0" y="0" width="100%" height="100%"></image>
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
                    <Dropdown.Item name="profile" className='profile-nav' active={activeItem === 'profile'} onClick={this.handleItemClick}>
                      <svg width="16" height="16"> 
                        <image href={profile}  x="0" y="0" width="100%" height="100%"></image>
                      </svg>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item name="deposit" className='deposit-nav' onClick={this.handleItemClick}>
                      <svg width="16" height="16"> 
                        <image href={deposit}  x="0" y="0" width="100%" height="100%"></image>
                      </svg>
                      Deposit/Withdraw
                    </Dropdown.Item>
                    <Dropdown.Item name="settings" className='settings-nav' onClick={this.handleItemClick}>
                      <svg width="16" height="16"> 
                        <image href={settings}  x="0" y="0" width="100%" height="100%"></image>
                      </svg>
                      Account Settings
                    </Dropdown.Item>
                    <Dropdown.Item name="logout" className='logout-nav' onClick={this.handleItemClick}>
                      <svg width="16" height="16"> 
                        <image href={logout}  x="0" y="0" width="100%" height="100%"></image>
                      </svg>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Grid.Row>

            <Grid.Row className='secondary-nav'>
              <Menu.Item name="dashboard" active={activeItem === 'certificates'} onClick={this.handleItemClick}>
                Dashboard
              </Menu.Item>

              <Menu.Item name="courses" active={activeItem === 'certificates'} onClick={this.handleItemClick}>
                Courses
              </Menu.Item>
              <Menu.Item name="programs" active={activeItem === 'courses'} onClick={this.handleItemClick}>
                Programs
              </Menu.Item>
              <Menu.Item name="certificates" active={activeItem === 'jobs'} onClick={this.handleItemClick}>
                Certification
              </Menu.Item>
              <Menu.Item name="challenges" active={activeItem === 'business'} onClick={this.handleItemClick}>
                Challenges
              </Menu.Item>
              <Menu.Item name="jobs" active={activeItem === 'business'} onClick={this.handleItemClick}>
                Job positions
              </Menu.Item>
              <Menu.Item name="interviews" active={activeItem === 'business'} onClick={this.handleItemClick}>
                Interviews
              </Menu.Item>
              <Menu.Item name="sign-in" active={activeItem === 'sign-in'} onClick={this.handleItemClick}>
                Sign In (Just testing)
              </Menu.Item>
            </Grid.Row>
          </Grid>
        </Container>
      </Menu>

    );
  }
}

const Header = withRouter(HeaderWithoutRouter);

export default Header;
