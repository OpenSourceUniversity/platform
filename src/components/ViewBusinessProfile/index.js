import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Header, Divider, Grid, Sticky, Segment, List, Button, Dimmer, Loader, Message, Responsive } from 'semantic-ui-react';
import { fetchCompanyJobs } from './actions';
import JobItem from '../../components/JobItem';
import getProfileView from '../../util/profiles/getProfileView';
import openThread from '../../util/messaging/openThread';

const colors = [
  'blue',
];

/* eslint-disable camelcase */
class ViewBusinessProfile extends React.Component {
  componentDidMount() {
    this.props.getProfileView('business', this.props.eth_address);
    this.props.fetchCompanyJobs(this.props.eth_address);
  }

  handleBack = () => this.props.history.push('/businesses');

  openMessaging = (e, { name }) => {
    const threadData = {
      opponent_eth_address: name,
    };
    this.props.openThread(threadData);
  }

  renderJobs() {
    return (
      this.props.jobs.map((job, index) => (
        <Grid.Column
          computer={8}
          largeScreen={8}
          widescreen={8}
          tablet={8}
          mobile={16}
          key={index}
          style={{ marginTop: '10px' }}
        >
          <JobItem job={job} key={index} />
        </Grid.Column>))
    );
  }

  render() {
    const avatarPlaceholder = 'data:image/jpeg;base64,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';
    const email = `mailto:${this.props.company.company_email}`;
    const link = `${this.props.company.company_website}`;
    const showDimmer = !!(this.props.profileViewError) || !(this.props.company.company_name);
    return (
      <div>
        <Responsive as={Grid} {...Responsive.onlyComputer}>
          {colors.map(color => (
            <Grid.Row className="profileBackground" color={color} key={color}>
              <Grid.Column />
            </Grid.Row>
          ))}
        </Responsive>
        <Dimmer active={this.props.profileViewIsFetching} inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
        <Dimmer
          active={showDimmer && !this.props.profileViewIsFetching}
          inverted
          onClickOutside={this.handleBack}
        >
          <Message negative>
            <Message.Header>Can&apos;t load this profile</Message.Header>
            <p>Please, check the ETH address</p>
          </Message>
          <Button
            primary
            as={Link}
            to="/businesses"
          >
            Back to Businesses list
          </Button>
        </Dimmer>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Responsive as={Sticky} {...Responsive.onlyComputer} offset={150}>
              <Segment.Group className="profileSegment">
                <Segment textAlign="center">
                  <Segment
                    textAlign="center"
                    circular
                    className="profilePicSegment"
                    style={{
                      width: 175,
                      height: 175,
                      backgroundImage: `url(${this.props.company.company_logo ? `https://ipfs.io/ipfs/${this.props.company.company_logo}` : avatarPlaceholder})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center center',
                      borderWidth: 0,
                      cursor: 'auto',
                    }}
                  />
                  <Header size="large">
                    {this.props.company.company_name}
                  </Header>
                  <Header size="small" color="grey">
                    {this.props.company.company_country ? this.props.company.company_country : '-'}
                  </Header>
                </Segment>
                <Segment>
                  <Button
                    primary
                    size="large"
                    className="fluid"
                    content="SEND MESSAGE"
                    name={this.props.eth_address.toLowerCase()}
                    icon="mail outline"
                    onClick={this.openMessaging}
                  />
                </Segment>
                <Segment>
                  <List>
                    { <List.Item icon={{ name: 'users', style: { width: '22px' } }} content={<span style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }} >{this.props.eth_address}</span>} /> }
                    <List.Item icon="mail" content={<a href={email}>{this.props.company.company_email}</a>} />
                    <List.Item icon="linkify" content={<a href={link}>{this.props.company.company_website}</a>} />
                  </List>
                </Segment>
                <Segment />
              </Segment.Group>
            </Responsive>
            <Responsive as={Segment.Group} {...Responsive.onlyTablet} className="profileSegment">
              <Segment textAlign="center">
                <Segment
                  textAlign="center"
                  circular
                  className="profilePicSegment"
                  style={{
                    width: 175,
                    height: 175,
                    backgroundImage: `url(${this.props.company.company_logo ? `https://ipfs.io/ipfs/${this.props.company.company_logo}` : avatarPlaceholder})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    borderWidth: 0,
                    cursor: 'auto',
                  }}
                />
                <Header size="large">
                  {this.props.company.company_name}
                </Header>
                <Header size="small" color="grey">
                  {this.props.company.company_country ? this.props.company.company_country : '-'}
                </Header>
              </Segment>
              <Segment>
                <Button
                  primary
                  size="large"
                  className="fluid"
                  content="SEND MESSAGE"
                  name={this.props.eth_address.toLowerCase()}
                  icon="mail outline"
                  onClick={this.openMessaging}
                />
              </Segment>
              <Segment>
                <List>
                  { <List.Item icon={{ name: 'users', style: { width: '22px' } }} content={<span style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }} >{this.props.eth_address}</span>} /> }
                  <List.Item icon="mail" content={<a href={email}>{this.props.company.company_email}</a>} />
                  <List.Item icon="linkify" content={<a href={link}>{this.props.company.company_website}</a>} />
                </List>
              </Segment>
              <Segment />
            </Responsive>
            <Responsive as={Segment.Group} {...Responsive.onlyMobile} className="profileSegment">
              <Segment textAlign="center">
                <Segment
                  textAlign="center"
                  circular
                  className="profilePicSegment"
                  style={{
                    width: 175,
                    height: 175,
                    backgroundImage: `url(${this.props.company.company_logo ? `https://ipfs.io/ipfs/${this.props.company.company_logo}` : avatarPlaceholder})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    borderWidth: 0,
                    cursor: 'auto',
                  }}
                />
                <Header size="large">
                  {this.props.company.company_name}
                </Header>
                <Header size="small" color="grey">
                  {this.props.company.company_country ? this.props.company.company_country : '-'}
                </Header>
              </Segment>
              <Segment>
                <Button
                  primary
                  size="large"
                  className="fluid"
                  content="SEND MESSAGE"
                  name={this.props.eth_address.toLowerCase()}
                  icon="mail outline"
                  onClick={this.openMessaging}
                />
              </Segment>
              <Segment>
                <List>
                  { <List.Item icon={{ name: 'users', style: { width: '22px' } }} content={<span style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }} >{this.props.eth_address}</span>} /> }
                  <List.Item icon="mail" content={<a href={email}>{this.props.company.company_email}</a>} />
                  <List.Item icon="linkify" content={<a href={link}>{this.props.company.company_website}</a>} />
                </List>
              </Segment>
              <Segment />
            </Responsive>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={11}>
            <Segment size="large">
              <Header>
                About
              </Header>
              <Divider clearing />
              <div style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                {this.props.company.company_about ? this.props.company.company_about : '-'}
              </div>
              <Divider clearing />
            </Segment>
            <Segment size="large">
              <Header>
                Courses
              </Header>
              <Divider clearing />
              {
                this.props.jobs.length ?
                  this.renderJobs() :
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <p style={{ textAlign: 'center' }}>There are no job positions yet.</p>
                  </div>
              }
            </Segment>
            <div style={{ height: '40px' }} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    company: state.profiles.profileView,
    profileViewIsFetching: state.profiles.profileViewIsFetching,
    profileViewError: state.profiles.profileViewError,
    jobs: state.companyJobs.jobs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfileView(type, eth_address) {
      dispatch(getProfileView(type, eth_address));
    },
    fetchCompanyJobs(eth_address) {
      dispatch(fetchCompanyJobs(eth_address));
    },
    openThread(threadData) {
      dispatch(openThread(threadData));
    },
  };
}
/* eslint-enable camelcase */
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewBusinessProfile));
