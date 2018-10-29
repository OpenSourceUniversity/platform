import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Divider, Grid, Segment, Menu, Breadcrumb, Image } from 'semantic-ui-react';
import LearnerSettings from 'components/LearnerSettings';
import AcademySettings from '../../components/AcademySettings';
import BusinessSettings from '../../components/BusinessSettings';
import UserSettings from '../../components/UserSettings';
import { setActiveAccount } from '../../util/activeAccount';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';


class AccountSettings extends React.Component {
  state = { }
  componentDidMount() {
    this.props.setSecondaryNav('account');
    document.title = 'Account Settings';
  }

  render() {
    /* eslint-disable global-require */
    const settings = require('../../icons/account_settings.svg');
    const learners = require('../../icons/learners.svg');
    const businesses = require('../../icons/businesses.svg');
    const academia = require('../../icons/academia.svg');
    /* eslint-enable global-require */
    return (
      <div>
        <Container className="account-settings">
          <Breadcrumb>
            <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section active>Account Settings</Breadcrumb.Section>
          </Breadcrumb>
          <Divider hidden />
          <Header size="large">
            <Image src={settings} className="icon" style={{ width: '32px', marginTop: 0 }} />
            Account Settings
          </Header>
          <Divider clearing />
          <Segment>
            <Grid>
              <Grid.Row className="double-form">
                <Grid.Column
                  mobile={16}
                  tablet={6}
                  computer={6}
                  style={{ paddingRight: 0, paddingLeft: 0 }}
                >
                  <Menu fluid vertical pointing secondary style={{ height: '100%' }}>
                    <Menu.Header>
                      <Header style={{ paddingLeft: '15px' }}>
                        Set active profile:
                      </Header>
                    </Menu.Header>
                    <Menu.Item
                      name="Learner"
                      active={this.props.activeAccount === 'Learner'}
                      onClick={
                        (e, { name }) => {
                          this.props.setActiveAccount(name);
                          this.setState({ userSettings: false });
                        }
                      }
                    >
                      <Image
                        src={learners}
                        className="cogs icon"
                        style={{
                          width: '16px',
                          display: 'inline-block',
                          marginRight: '10px',
                          height: '16px',
                        }}
                      />
                    Learner
                    </Menu.Item>
                    <Menu.Item
                      name="Academy"
                      active={this.props.activeAccount === 'Academy'}
                      onClick={
                        (e, { name }) => {
                          this.props.setActiveAccount(name);
                          this.setState({ userSettings: false });
                        }
                      }
                    >
                      <Image
                        src={academia}
                        className="cogs icon"
                        style={{
                          width: '16px',
                          display: 'inline-block',
                          marginRight: '10px',
                          height: '16px',
                        }}
                      />
                      Academy
                    </Menu.Item>
                    <Menu.Item
                      name="Business"
                      active={this.props.activeAccount === 'Business'}
                      onClick={
                        (e, { name }) => {
                          this.props.setActiveAccount(name);
                          this.setState({ userSettings: false });
                        }
                      }
                    >
                      <Image
                        src={businesses}
                        className="cogs icon"
                        style={{
                          width: '16px',
                          display: 'inline-block',
                          marginRight: '10px',
                          height: '16px',
                        }}
                      />
                      Business
                    </Menu.Item>
                    <Menu.Header>
                      <Header style={{ padding: '15px' }}>
                        Account Settings:
                      </Header>
                    </Menu.Header>
                    <Menu.Item
                      name="UserSettings"
                      active={this.state.userSettings}
                      onClick={() => this.setState({ userSettings: true })}
                    >
                      <Image
                        src={learners}
                        className="cogs icon"
                        style={{
                          width: '16px',
                          display: 'inline-block',
                          marginRight: '10px',
                          height: '16px',
                        }}
                      />
                    General Settings
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={10} computer={10} style={{ paddingLeft: 0 }}>
                  <div className="settings">
                    {(() => {
                      if (this.state.userSettings) {
                        return <UserSettings />;
                      }
                      switch (this.props.activeAccount) {
                      case 'Academy': return <AcademySettings />;
                      case 'Learner': return <LearnerSettings />;
                      case 'Business': return <BusinessSettings />;
                      default: return null;
                      }
                    })()}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAccount: state.activeAccount.activeAccount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveAccount(activeAccount) {
      dispatch(setActiveAccount(activeAccount));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountSettings));
