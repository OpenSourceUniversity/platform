import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Divider, Grid, Sticky, Segment, List, Button, Icon, Responsive } from 'semantic-ui-react';
import { fetchCompanyJobs } from '../ViewBusinessProfile/actions';
import JobItem from '../../components/JobItem';

const colors = [
  'blue',
];

/* eslint-disable camelcase */
class BusinessProfile extends React.Component {
  componentDidMount() {
    this.props.fetchCompanyJobs(this.props.eth_address.toLowerCase());
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
    const email = `mailto:${this.props.profiles.company_email}`;

    return (
      <div>
        <Responsive as={Grid} {...Responsive.onlyComputer}>
          {colors.map(color => (
            <Grid.Row className="profileBackground" color={color} key={color}>
              <Grid.Column />
            </Grid.Row>
          ))}
        </Responsive>
        <Container>
          <Grid className="profileDetails">
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
                        backgroundImage: `url(${this.props.profiles.company_logo ? `https://ipfs.io/ipfs/${this.props.profiles.company_logo}` : avatarPlaceholder})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center center',
                        borderWidth: 0,
                        cursor: 'auto',
                      }}
                    />
                    <Header size="large">
                      {this.props.profiles.company_name}
                    </Header>
                    <Header size="small" color="grey">
                      {this.props.profiles.company_country ? this.props.profiles.company_country : '-'}
                    </Header>
                  </Segment>
                  <Segment padded>
                    <Button
                      primary
                      size="large"
                      className="fluid"
                      content="MESSAGE US"
                      icon="mail outline"
                    />
                  </Segment>
                  <Segment padded="very">
                    <List>
                      {/* <List.Item icon="users" content={this.props.profiles.employees} /> */}
                      <List.Item
                        icon="mail"
                        content={
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={email}
                          >
                            {this.props.profiles.company_email}
                          </a>
                        }
                      />
                      <List.Item
                        icon="linkify"
                        content={
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={this.props.profiles.company_website}
                          >
                            {this.props.profiles.company_website}
                          </a>
                        }
                      />
                    </List>
                  </Segment>
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
                      backgroundImage: `url(${this.props.profiles.company_logo ? `https://ipfs.io/ipfs/${this.props.profiles.company_logo}` : avatarPlaceholder})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center center',
                      borderWidth: 0,
                      cursor: 'auto',
                    }}
                  />
                  <Header size="large">
                    {this.props.profiles.company_name}
                  </Header>
                  <Header size="small" color="grey">
                    {this.props.profiles.company_country ? this.props.profiles.company_country : '-'}
                  </Header>
                </Segment>
                <Segment padded>
                  <Button
                    primary
                    size="large"
                    className="fluid"
                    content="MESSAGE US"
                    icon="mail outline"
                  />
                </Segment>
                <Segment padded="very">
                  <List>
                    {/* <List.Item icon="users" content={this.props.profiles.employees} /> */}
                    <List.Item
                      icon="mail"
                      content={
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={email}
                        >
                          {this.props.profiles.company_email}
                        </a>
                      }
                    />
                    <List.Item
                      icon="linkify"
                      content={
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={this.props.profiles.company_website}
                        >
                          {this.props.profiles.company_website}
                        </a>
                      }
                    />
                  </List>
                </Segment>
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
                      backgroundImage: `url(${this.props.profiles.company_logo ? `https://ipfs.io/ipfs/${this.props.profiles.company_logo}` : avatarPlaceholder})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center center',
                      borderWidth: 0,
                      cursor: 'auto',
                    }}
                  />
                  <Header size="large">
                    {this.props.profiles.company_name}
                  </Header>
                  <Header size="small" color="grey">
                    {this.props.profiles.company_country ? this.props.profiles.company_country : '-'}
                  </Header>
                </Segment>
                <Segment padded>
                  <Button
                    primary
                    size="large"
                    className="fluid"
                    content="MESSAGE US"
                    icon="mail outline"
                  />
                </Segment>
                <Segment padded="very">
                  <List>
                    {/* <List.Item icon="users" content={this.props.profiles.employees} /> */}
                    <List.Item
                      icon="mail"
                      content={
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={email}
                        >
                          {this.props.profiles.company_email}
                        </a>
                      }
                    />
                    <List.Item
                      icon="linkify"
                      content={
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={this.props.profiles.company_website}
                        >
                          {this.props.profiles.company_website}
                        </a>
                      }
                    />
                  </List>
                </Segment>
              </Responsive>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={11}>
              <Segment size="large" padded="very">
                <Header>
                  About
                </Header>
                <Divider clearing />
                <div style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                  {this.props.profiles.company_about ? this.props.profiles.company_about : '-'}
                </div>
              </Segment>
              <Segment size="large" padded="very">
                <Header>
                  Job positions
                </Header>
                <Divider clearing />
                <Button style={{ marginBottom: '1em' }} icon labelPosition="left" positive floated="right" as={Link} to="/businesses/add">
                  <Icon name="plus" />
                  Add job position
                </Button>
                {
                  this.props.jobs.length ?
                    this.renderJobs() :
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <p style={{ textAlign: 'center' }}>There are no job positions yet.</p>
                    </div>
                }
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles.profiles,
    jobs: state.companyJobs.jobs,
    eth_address: state.auth.address,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCompanyJobs(eth_address) {
      dispatch(fetchCompanyJobs(eth_address));
    },
  };
}
/* eslint-enable camelcase */
export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);
