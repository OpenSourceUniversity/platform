import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Menu, Dropdown, Grid, Image, Icon, List, Button, Step } from 'semantic-ui-react';
import HeaderSearchComponent from '../HeaderSearchComponent';
import logout from '../../util/auth/logout';
import getBalances from '../../util/web3/getBalances';
import setOnBoardingActiveElement from '../../util/auth/setOnBoardingActiveElement';


class HeaderWithoutRouter extends React.Component {
  constructor(props) {
    super(props);
    this.props.getBalances();
  }

  state = { }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    let newPath;
    if (name === 'home') {
      newPath = '/';
    } else if (name === 'onboarding') {
      this.props.setOnBoardingActiveElement('signin');
    } else {
      newPath = `/${name}`;
    }
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath);
    }
  }

  loginFunc = (e, { name }) => {
    this.props.logout();
    this.props.setOnBoardingActiveElement('signin');
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
    const avatarPlaceholder = 'data:image/jpeg;base64,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';

    const avatarTrigger = (
      <span>
        <Image
          className="avatar"
          avatar
          src={(() => {
            if (this.props.isLoggedIn) {
              switch (this.props.activeAccount) {
              case 'Business': return this.props.profiles.company_logo ? this.props.profiles.company_logo : avatarPlaceholder;
              case 'Academy': return this.props.profiles.academy_logo ? this.props.profiles.academy_logo : avatarPlaceholder;
              case 'Learner': return this.props.profiles.lerner_avatar ? this.props.profiles.lerner_avatar : avatarPlaceholder;
              default: return null;
              }
            }
            return null;
          })()}
        />
      </span>
    );

    const notificationsTrigger = (
      <span>
        <Image style={{ cursor: 'pointer' }} className="notifications icon" src={notifications} />
      </span>
    );

    const exploreTrigger = (
      <span className="explore-icon">
        <Icon name="compass outline" />Explore
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
        key: 'academies', content: 'Academia', name: 'academies', className: 'academia', active: activeItem === 'academies', onClick: this.handleItemClick,
      },
      {
        key: 'courses', content: 'Browse courses', name: 'courses', active: activeItem === 'courses', onClick: this.handleItemClick,
      },
      {
        key: 'certificates', content: 'My certificates', name: 'certificates', active: activeItem === 'certificates', onClick: this.handleItemClick,
      },
      {
        key: 'programs', content: 'Student Programs', name: 'programs', active: false, className: 'secondary-nav-disabled-beta',
      },
      {
        key: 'scholarships', content: 'Scholarships', name: 'scholarships', active: false, className: 'secondary-nav-disabled-beta',
      },
      {
        key: 'challenges', content: 'Academic Challenges', name: 'challenges', active: false, className: 'secondary-nav-disabled-customer',
      },
    ];

    const learnerBusinessesDropdownElements = [
      {
        key: 'businesses', content: 'Businesses', name: 'businesses', className: 'businesses', active: activeItem === 'businesses', onClick: this.handleItemClick,
      },
      {
        key: 'jobs', content: 'Browse jobs', name: 'jobs', active: activeItem === 'jobs', onClick: this.handleItemClick,
      },
      {
        key: 'interviews', content: 'My Interviews', name: 'interviews', active: false, className: 'secondary-nav-disabled-beta',
      },
      {
        key: 'career', content: 'Career Paths', name: 'career', active: false, className: 'secondary-nav-disabled-beta',
      },
      {
        key: 'interships', content: 'Interships', name: 'interships', active: false, className: 'secondary-nav-disabled-beta',
      },
      {
        key: 'business-challenges', content: 'Business challenges', name: 'business-challenges', active: false, className: 'secondary-nav-disabled-customer',
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
                    <Dropdown.Item name="academia" className="nav-list">
                      <List selection items={learnerAcademiaDropdownElements} />
                    </Dropdown.Item>
                    <Dropdown.Item name="business" className="nav-list secondary-nav-disabled-beta">
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
                      <Dropdown.Item className="account-nav-setter" name="account">

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
                                {this.props.eduBalance.toString().split('.')[0] === '0' && !this.props.eduBalance.toString().split('.')[1] ? null : '.'}{this.props.eduBalance.toString().split('.')[1]}
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
    secondaryNav: state.secondaryNav.secondaryNav,
    profiles: state.profiles.profiles,
    onBoardingActiveElement: state.auth.onBoardingActiveElement,
    activeAccount: state.activeAccount.activeAccount,
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
    setOnBoardingActiveElement(activeElement) {
      dispatch(setOnBoardingActiveElement(activeElement));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderWithoutRouter));
