import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Container, Header, Divider, Grid, Segment, Menu, Form } from 'semantic-ui-react';
import LernersSettings from 'components/LernersSettings';
import AcademiaSettings from 'components/AcademiaSettings';
import BusinessesSettings from 'components/BusinessesSettings';
import setActiveAccount from '../../util/activeAccount/setActiveAccount';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';

class AccountSettings extends React.Component {
  componentDidMount() {
    this.props.setSecondaryNav('account');
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
          <Header size="huge">
            <svg width="32" height="32" className="icon">
              <image href={settings} x="0" y="0" width="100%" height="100%" />
            </svg>
            Account Settings
          </Header>
          <Divider clearing />
          <Grid reversed="mobile">
            <Grid.Row className="double-form">
              <Grid.Column width={6}>
                <Segment>
                  <Header>
                    Set default profile:
                  </Header>
                  <Menu fluid vertical pointing>
                    <Menu.Item name="Learner" active={this.props.activeAccount === 'Learner'} onClick={(e, { name }) => this.props.setActiveAccount(name)}>
                      <svg width="16" height="16" className="cogs icon">
                        <image href={learners} x="0" y="0" width="100%" height="100%" />
                      </svg>
                    Learner
                    </Menu.Item>
                    <Menu.Item name="Academy" active={this.props.activeAccount === 'Academy'} onClick={(e, { name }) => this.props.setActiveAccount(name)}>
                      <svg width="16" height="16" className="cogs icon">
                        <image href={academia} x="0" y="0" width="100%" height="100%" />
                      </svg>
                      Academy
                    </Menu.Item>
                    <Menu.Item name="Business" active={this.props.activeAccount === 'Business'} onClick={(e, { name }) => this.props.setActiveAccount(name)}>
                      <svg width="16" height="16" className="cogs icon">
                        <image href={businesses} x="0" y="0" width="100%" height="100%" />
                      </svg>
                      Business
                    </Menu.Item>
                  </Menu>
                </Segment>
              </Grid.Column>
              <Grid.Column stretched width={10}>
                <Segment className="settings">
                  {(() => {
                    switch (this.props.activeAccount) {
                    case 'Academy': return <AcademiaSettings />;
                    case 'Learner': return <LernersSettings />;
                    case 'Business': return <BusinessesSettings />;
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
