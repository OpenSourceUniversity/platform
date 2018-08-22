import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button, Header, Divider, Segment, Grid } from 'semantic-ui-react';
import { setActiveAccount } from '../../util/activeAccount';

class ChooseAccount extends React.Component {
  render() {
    /* eslint-disable global-require */

    const academia = require('../../icons/academia_hex.svg');
    const learners = require('../../icons/learners_hex.svg');
    const businesses = require('../../icons/businesses_hex.svg');

    /* eslint-enable global-require */

    return (
      <div>
        <Header>
          SET YOUR DEFAULT PROFILE
        </Header>
        <Divider clearing />
        <Grid columns={3}>
          <Grid.Column>
            <Segment style={{ minHeight: '400px' }} padded="very" className="padded-top-segment">
              <img className="hex-icon" alt="" src={academia} />
              <Header>
                ACADEMIA
              </Header>
              <span>
                Academia include high schools, universities, MOOC platforms, corporate training and
                non-formal education providers, independent experts, organizations in the
                field of education & professional development.
              </span>
              <Divider clearing />
              <span>
                Are you an academic or a training provider?
              </span>
              <Button style={{ marginTop: '30px' }} name="Academy" as={Link} to="/settings" onClick={(e, { name }) => this.props.setActiveAccount(name)} fluid> SELECT </Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment style={{ minHeight: '400px' }} padded="very" className="padded-top-segment">
              <img className="hex-icon" alt="" src={learners} />
              <Header>
                LEARNERS
              </Header>
              <span>
                Learners include students and employees gaining new knowledge, lifelong
                learners and curious minds who are seeking challenges and/or new academic
                or professional paths.
              </span>
              <Divider clearing />
              <span>
                Are you pursuing learning and development opportunities?
              </span>
              <Button style={{ marginTop: '30px' }} primary name="Learner" as={Link} to="/settings" onClick={(e, { name }) => this.props.setActiveAccount(name)} fluid> SELECT </Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment style={{ minHeight: '400px' }} padded="very" className="padded-top-segment">
              <img className="hex-icon" alt="" src={businesses} />
              <Header>
                BUSINESSES
              </Header>
              <span>
                Businesses include companies of various sizes from startups to enterprises,
                NGOs, institutions, seeking better and faster candidate sourcing, optimization of
                costs & results, and improvement of employee recognition.
              </span>
              <Divider clearing />
              <span>
                Are you a company or an organization representative?
              </span>
              <Button style={{ marginTop: '30px' }} name="Business" as={Link} to="/settings" onClick={(e, { name }) => this.props.setActiveAccount(name)} fluid> SELECT </Button>
            </Segment>
          </Grid.Column>
        </Grid>

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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChooseAccount));
