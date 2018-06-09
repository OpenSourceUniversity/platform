import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Menu, Dropdown, Grid, Image, Icon, List, Button, Step } from 'semantic-ui-react';
import HeaderSearchComponent from '../HeaderSearchComponent';
import logout from '../../util/auth/logout';
import getBalances from '../../util/web3/getBalances';


class HeaderWithoutRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.props.getBalances();
  }

  state = { }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    let newPath;
    if (name === 'home') {
      this.props.setSecondaryNav(e, { name });
      newPath = '/';
    } else {
      newPath = `/${name}`;
    }
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath);
    }
  }

  loginFunc = (e, { name }) => {
    this.props.logout();
    const newPath = `/${name}`;
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath);
    }
  }

  createAccountRender() {
    return (
      <Step.Group size="mini" fluid>
        <Step
          active={this.props.createAccountActiveItem === 'profile'}
          icon="radio"
          link
          onClick={this.props.createAccountActiveItemFunc}
          title="CHOOSE PROFILE"
          name="profile"
        />

        <Step
          active={this.props.createAccountActiveItem === 'info'}
          icon="radio"
          link
          onClick={this.props.createAccountActiveItemFunc}
          title="ADDITIONAL INFO"
          name="info"
        />

        <Step
          active={this.props.createAccountActiveItem === 'payment'}
          icon="radio"
          link
          onClick={this.props.createAccountActiveItemFunc}
          title="PAYMENT METNOD"
          name="payment"
        />

        <Step
          active={this.props.createAccountActiveItem === 'deposit'}
          icon="radio"
          link
          onClick={this.props.createAccountActiveItemFunc}
          title="DEPOSIT"
          name="deposit"
        />
      </Step.Group>
    );
  }

  render() {
    const { activeItem } = this.state;
    /* eslint-disable global-require */
    const logo = require('../../icons/edu-logo.png');
    const profile = require('../../icons/account_profile.svg');
    const deposit = require('../../icons/account_deposit.svg');
    const settings = require('../../icons/account_settings.svg');
    const logoutImage = require('../../icons/account_logout.svg');
    const token = require('../../icons/edu_token.svg');
    const network = require('../../icons/nav_network.svg');
    const messages = require('../../icons/nav_messages.svg');
    const notifications = require('../../icons/nav_notifications.svg');
    /* eslint-enable global-require */

    const avatarTrigger = (
      <span>
        <Image className="avatar" avatar src={this.props.profilePic} />
      </span>
    );

    const notificationsTrigger = (
      <span>
        <Image style={{ cursor: 'pointer' }} className="notifications icon" src={notifications} />
      </span>
    );

    const exploreTrigger = (
      <span className="explore-icon">
        <Icon name="grid layout" />Explore
      </span>
    );

    const accountElements = [
      {
        key: 'profile', content: 'My Profile', name: 'profile', className: 'profile-nav', active: activeItem === 'profile', onClick: this.handleItemClick,
      },
      {
        key: 'deposit', content: 'Deposit/Withdraw', name: 'deposit', className: 'deposit-nav', active: activeItem === 'deposit', onClick: this.handleItemClick,
      },
      {
        key: 'settings', content: 'Account Settings', name: 'settings', className: 'settings-nav', active: activeItem === 'settings', onClick: this.handleItemClick,
      },
      {
        key: 'onboarding', content: 'Logout', name: 'onboarding', className: 'logout-nav', onClick: this.loginFunc,
      },
    ];

    const optionsNotifications = [
      { key: 'alarm1', text: 'First notification', icon: 'alarm' },
      { key: 'alarm2', text: 'Second  notification', icon: 'alarm' },
      { key: 'alarm3', text: 'Third  notification', icon: 'alarm' },
      { key: 'alarm4', text: 'etc', icon: 'alarm' },
    ];

    const learnerAcademiaDropdownElements = [
      {
        key: 'academia', content: 'Academia', name: 'courses', className: 'academia', active: activeItem === 'academia', onClick: this.handleItemClick,
      },
      {
        key: 'courses', content: 'Browse courses', name: 'courses', active: activeItem === 'courses', onClick: this.handleItemClick,
      },
      {
        key: 'certificates', content: 'My certificates', name: 'certificates', active: activeItem === 'certificates', onClick: this.handleItemClick,
      },
      {
        key: 'programs', content: 'Student Programs', name: 'programs', active: false, className: "secondary-nav-disabled-beta",
      },
      {
        key: 'scholarships', content: 'Scholarships', name: 'scholarships', active: false, className: "secondary-nav-disabled-beta",
      },
      {
        key: 'challenges', content: 'Academic Challenges', name: 'challenges', active: false, className: "secondary-nav-disabled-customer",
      },
    ];

    const learnerBusinessesDropdownElements = [
      {
        key: 'businesses', content: 'Businesses', name: 'jobs', className: 'businesses', active: activeItem === 'businesses', onClick: this.handleItemClick,
      },
      {
        key: 'jobs', content: 'Browse jobs', name: 'jobs', active: activeItem === 'jobs', onClick: this.handleItemClick,
      },
      {
        key: 'interviews', content: 'My Interviews', name: 'interviews', active: false, className: "secondary-nav-disabled-beta",
      },
      {
        key: 'career', content: 'Career Paths', name: 'career', active: false, className: "secondary-nav-disabled-beta",
      },
      {
        key: 'interships', content: 'Interships', name: 'interships', active: false, className: "secondary-nav-disabled-beta",
      },
      {
        key: 'business-challenges', content: 'Business challenges', name: 'business-challenges', active: false, className: "secondary-nav-disabled-customer",
      },
    ];

    return (
      <Menu size="massive" fixed="top">
        <Container fluid>
          <Grid divided="vertically">
            { this.props.isLoggedIn ? (
              <Grid.Row className="main-nav">
                <Menu.Item name="home" onClick={this.handleItemClick}>
                  <img className="main-nav-logo" alt="" src={logo} />
                </Menu.Item>
                <Dropdown className="explore-dropdown" item trigger={exploreTrigger}>
                  <Dropdown.Menu>
                    <Dropdown.Item name="academia" className="nav-list" onClick={this.props.setSecondaryNav}>
                      <List selection items={learnerAcademiaDropdownElements} />
                    </Dropdown.Item>
                    <Dropdown.Item name="business" className="nav-list" onClick={this.props.setSecondaryNav}>
                      <List selection items={learnerBusinessesDropdownElements} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <HeaderSearchComponent />

                <Menu.Menu position="right">
                  <Menu.Item disabled style={{ cursor: 'pointer!important' }} className="nav-disabled-beta" name="network" onClick={this.handleItemClick}>
                    <svg width="20" height="20" className="network" style={{ opacity: 0.5, cursor: 'pointer' }} >
                      <image href={network} x="0" y="0" width="100%" height="100%" />
                    </svg>
                  </Menu.Item>
                  <Menu.Item disabled style={{ cursor: 'pointer!important' }} className="nav-disabled-beta" name="inbox" onClick={this.handleItemClick}>
                    <svg width="20" height="20" className="inbox" style={{ opacity: 0.5, cursor: 'pointer' }} >
                      <image href={messages} x="0" y="0" width="100%" height="100%" />
                    </svg>
                  </Menu.Item>
                  <Menu.Item disabled style={{ cursor: 'pointer!important' }} className="nav-disabled-beta">
                    <Dropdown style={{ padding: 0 }} disabled className="nav-disabled-beta" item trigger={notificationsTrigger} pointing="top right" options={optionsNotifications} icon={null} />
                  </Menu.Item>
                  <Dropdown item trigger={avatarTrigger} pointing="top right">
                    <Dropdown.Menu>
                      <Dropdown.Item className="account-nav-setter" name="account" onClick={this.props.setSecondaryNav}>

                        <Dropdown.Item style={{ cursor: 'default' }} name="balance" className="balance-nav">
                          EDU Balance
                          {this.props.balancesError ? (this.props.balancesError) : (
                            <span className="balance-nav">
                              <svg width="16" height="16" className="edu-token">
                                <image href={token} x="0" y="0" width="100%" height="100%" />
                              </svg>
                              <span className="integer">
                                {this.props.eduBalance.toString().split('.')[0]}
                              </span>
                              <span className="fraction">
                                .{this.props.eduBalance.toString().split('.')[1]}
                              </span>
                            </span>
                          )}
                        </Dropdown.Item>

                        <Dropdown.Item name="profile" className="profile-nav" active={activeItem === 'profile'} onClick={this.handleItemClick}>
                          <svg width="16" height="16">
                            <image href={profile} x="0" y="0" width="100%" height="100%" />
                          </svg>
                          My Profile
                        </Dropdown.Item>
                        <Dropdown.Item name="deposit" className="deposit-nav" active={activeItem === 'deposit'} onClick={this.handleItemClick}>
                          <svg width="16" height="16">
                            <image href={deposit} x="0" y="0" width="100%" height="100%" />
                          </svg>
                          Deposit/Withdraw
                        </Dropdown.Item>
                        <Dropdown.Item name="settings" className="settings-nav" active={activeItem === 'settings'} onClick={this.handleItemClick}>
                          <svg width="16" height="16">
                            <image href={settings} x="0" y="0" width="100%" height="100%" />
                          </svg>
                          Account Settings
                        </Dropdown.Item>
                        <Dropdown.Item name="onboarding" className="logout-nav" onClick={this.loginFunc}>
                          <svg width="16" height="16">
                            <image href={logoutImage} x="0" y="0" width="100%" height="100%" />
                          </svg>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Menu>
              </Grid.Row>
            ) : (
              <Grid.Row className="main-nav">
                <Menu.Item name="home" onClick={this.handleItemClick}>
                  <img className="main-nav-logo" alt="" style={{ marginRight: `${15}px` }} src={logo} />
                  Open Source <br /> University
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item name="network">
                    <Button primary name="onboarding" onClick={this.handleItemClick} >LOGIN </Button>
                  </Menu.Item>
                </Menu.Menu>
              </Grid.Row>
            )
            }

            <Grid.Row className="secondary-nav">
              {(() => {
                if (this.props.isLoggedIn) {
                  switch (this.props.secondaryNav) {
                  case 'business': return <Menu size="massive" items={learnerBusinessesDropdownElements.slice(1)} />;
                  case 'academia': return <Menu size="massive" items={learnerAcademiaDropdownElements.slice(1)} />;
                  case 'account': return <Menu size="massive" items={accountElements} />;
                  case 'createAccount': return this.createAccountRender();
                  default: return null;
                  }
                }
                return null;
              })()}
            </Grid.Row>
          </Grid>
        </Container>
      </Menu>

    );
  }
}

function mapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
    isLoggedIn: state.auth.isLoggedIn,
    eduBalance: state.web3.eduBalance,
    balancesError: state.web3.web3Error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout() {
      dispatch(logout());
    },
    getBalances() {
      dispatch(getBalances());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderWithoutRouter));
