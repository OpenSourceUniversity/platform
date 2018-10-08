import React from 'react';
import { Dimmer, Header, Container, Button, Icon, Loader, Feed, Segment, Grid, Divider, Breadcrumb } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import JobApplicationItem from '../../components/JobApplicationItem';
import JobApplicationLearnerItem from '../../components/JobApplicationLearnerItem';
import fetchJobApplications from '../../util/jobApplication/fetchJobApplications';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import resetJobApplications from './actions';


class JobApplicationsPage extends React.Component {
  componentDidMount() {
    this.props.fetchJobApplications();
    this.props.setSecondaryNav('business');
  }
  componentWillUnmount() {
    this.props.resetJobApplications();
  }

  renderJobApplicationItems() {
    if (this.props.activeAccount === 'Business') {
      return (
        this.props.jobApplications.map((application, index) => (
          <JobApplicationItem
            application={application}
            key={index}
          />
        ))
      );
    }
    return (
      this.props.jobApplications.map((application, index) => (
        <JobApplicationLearnerItem
          application={application}
          key={index}
        />
      ))
    );
  }

  render() {
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section href="/#/jobs">Jobs List</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Job Applications</Breadcrumb.Section>
        </Breadcrumb>
        <Divider hidden />
        <Header size="large">
          Job Applications
        </Header>
        <Segment>
          <Dimmer active={this.props.isFetching} inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
          <Feed size="large">
            <Grid style={{ textAlign: 'center' }}>
              <Grid.Column width={4}>
                <Header>
                  {this.props.activeAccount === 'Business' ? 'Name' : 'Company name'}
                </Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header>
                  Skills
                </Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header>
                  Applied for
                </Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header>
                  Status
                </Header>
              </Grid.Column>
            </Grid>
            <Divider clearing />
            {this.props.jobApplications.length ? null : 'You have not any job applications'}
            {this.renderJobApplicationItems()}
            <div style={{ display: !this.props.nextUrl ? 'none' : 'block', marginTop: '20px', textAlign: 'center' }}>
              <Button
                onClick={() => { this.props.fetchJobApplications(this.props.nextUrl); }}
                icon
                labelPosition="left"
              >
                <Icon
                  name={!this.props.isFetching ? 'arrow down' : 'spinner'}
                  loading={this.props.isFetching}
                />
                Load More
              </Button>
            </div>
          </Feed>
        </Segment>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    jobApplications: state.jobApplication.jobApplications,
    isFetching: state.jobApplication.isFetching,
    nextUrl: state.jobApplication.nextUrl,
    activeAccount: state.activeAccount.activeAccount,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchJobApplications(url) {
      dispatch(fetchJobApplications(url));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    resetJobApplications() {
      dispatch(resetJobApplications());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobApplicationsPage));
