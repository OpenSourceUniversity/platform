import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Divider, Label, Segment, Grid, Menu, Icon, Container, Breadcrumb, Modal, Message } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import { fetchJob, deleteJobPosition } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import applyJobPosition from '../../util/jobApplication/applyJobPosition';
import checkJobApplication from '../../util/jobApplication/checkJobApplication';
import markAsFeaturedJobPosition from '../../util/job/markAsFeaturedJobPosition';
import Config from '../../config';

class JobPage extends React.Component {
  state = { modalOpen: false, modalFeaturedOpen: false }

  componentDidMount() {
    const { bdnUrl } = Config.network;
    this.props.fetchJob(`${bdnUrl}api/v1/jobs/${this.props.match.params.id}/`);
    this.props.setSecondaryNav('business');
    this.props.checkJobApplication(this.props.match.params.id);
    document.title = 'Job';
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleFeaturedOpen = () => this.setState({ modalFeaturedOpen: true })

  handleFeaturedClose = () => this.setState({ modalFeaturedOpen: false })

  renderSkills() {
    return this.props.job.skills.map((skill, index) => (
      <SkillItem skill={skill} key={index} />
    ));
  }

  renderIndustries() {
    return this.props.job.industries.map((industry, index) => (
      <SkillItem skill={industry} key={index} />
    ));
  }

  renderLanguages() {
    const languagesArr = this.props.job.languages;
    const languages = [];
    try {
      for (let i = 0; i < languagesArr.length; i += 1) {
        languages.push({
          have_icon: false, check: true, name: languagesArr[i], basic: false,
        });
      }
      return languages.map((language, index) => (
        <SkillItem skill={language} key={index} />
      ));
    } catch (e) {
      return null;
    }
  }

  renderRating(ratingNumb) {
    return (
      <div className="ui accurate star widget inline" style={{ marginRight: '10px' }}>
        <div className="highlight" style={{ width: `${(ratingNumb / 5) * 100}%` }} />
      </div>);
  }

  render() {
    const avatarPlaceholder = 'data:image/jpeg;base64,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';
    return (
      <div className="course">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section href="/#/jobs">Jobs</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section active>Job Description</Breadcrumb.Section>
          </Breadcrumb>
          <Divider clearing />
          <div className="course">
            <Grid>
              {this.props.address.toLowerCase() === this.props.job.company.eth_address ?
                <Grid.Column width={16}>
                  <Segment clearing floated="right">
                    <Button as="a" target="_blank" onClick={() => { this.props.history.push(`/businesses/edit/${this.props.match.params.id}/`); }} color="yellow">Edit</Button>
                    {this.props.job.is_featured ?
                      null :
                      <Modal
                        open={this.state.modalFeaturedOpen}
                        onClose={this.handleFeaturedClose}
                        trigger={
                          <Button
                            onClick={this.handleFeaturedOpen}
                            color="green"
                          >
                            Mark as Featured
                          </Button>
                        }
                        basic
                        size="small"
                      >
                        <Header icon="archive" content="Mark as featured job position confirmation" />
                        <Modal.Content>
                          <Message error hidden={!this.props.errorFeatured}>
                            <p>
                              {this.props.errorFeatured}
                            </p>
                          </Message>
                          <p>
                          You want to mark as featured&nbsp;
                          youre job position, named: {this.props.job.title}.
                          </p>
                          <p>
                          Please, confirm this action.
                          </p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button onClick={this.handleFeaturedClose} floated="left" basic color="grey" inverted>
                            <Icon name="remove" /> Cancel
                          </Button>
                          <Button basic color="green" inverted onClick={() => { this.props.markAsFeaturedJobPosition(this.props.match.params.id); }}>
                            <Icon name="rocket" /> Mark as Featured
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    }
                    <Modal open={this.state.modalOpen} onClose={this.handleClose} trigger={<Button onClick={this.handleOpen} color="red">Delete</Button>} basic size="small">
                      <Header icon="archive" content="Delete job position confirmation" />
                      <Modal.Content>
                        <p>
                        You want to delete youre job position, named: {this.props.job.title}.
                        </p>
                        <p>
                        Please, confirm this action.
                        </p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button onClick={this.handleClose} floated="left" basic color="grey" inverted>
                          <Icon name="remove" /> Cancel
                        </Button>
                        <Button basic color="red" inverted onClick={() => { this.props.deleteJobPosition(this.props.match.params.id); }}>
                          <Icon name="remove" /> Delete
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </Segment>
                </Grid.Column> :
                null
              }
              <Grid.Column width={11}>
                <Segment style={{ padding: '40px' }}>
                  <div>
                    <Header style={{ fontSize: '1.7em' }}>
                      {this.props.job.title}
                    </Header>
                    <span style={{ fontSize: '1.3em', color: 'gray' }}>
                      Posted by {this.props.job.company.name} <Icon name="point" style={{ marginLeft: '10px', marginRight: 0 }} /> {this.props.job.location} <Icon name="dollar" style={{ marginLeft: '10px', marginRight: 0 }} /> {this.props.job.salary}
                    </span>
                    <Header>
                       Overview
                    </Header>
                    <span style={{ whiteSpace: 'pre-line' }}>
                      {this.props.job.overview}
                    </span>
                    <Header>
                      Skills
                    </Header>
                    <Label.Group size="medium">
                      {this.renderSkills()}
                    </Label.Group>
                    <Menu pointing secondary color="orange">
                      <Menu.Item style={{ fontSize: '1.3em' }} name="desc" active>
                          Job Descriptions
                      </Menu.Item>
                    </Menu>
                    <Container style={{ paddingLeft: '40px', paddingRight: '40px', whiteSpace: 'pre-line' }}>
                      {this.props.job.description}
                    </Container>
                  </div>
                  <Divider hidden />
                </Segment>
              </Grid.Column>
              <Grid.Column width={5}>
                <Segment style={{ padding: '40px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Header style={{ fontSize: '1.5em' }}>
                      Company
                    </Header>
                    <Segment
                      textAlign="center"
                      circular
                      className="profilePicSegment"
                      onClick={
                        this.props.job.company ?
                          () => { this.props.history.push(`/view-profile/academy/${this.props.job.company.eth_address}/`); } :
                          null
                      }
                      style={{
                        boxShadow: '2px 6px 20px 0 #bcbdbd, 0 1px 21px 1px #d4d4d5',
                        width: '8em',
                        height: '8em',
                        backgroundColor: 'white',
                        backgroundImage: `url(${
                          (() => {
                            if (this.props.company) {
                              if (this.props.company.company_logo) {
                                return `https://ipfs.io/ipfs/${this.props.company.company_logo}`;
                              }
                              return avatarPlaceholder;
                            }
                            return avatarPlaceholder;
                          })()})`,
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        borderWidth: 0,
                        cursor: this.props.job.company ? 'pointer' : 'auto',
                      }}
                    />
                    <Divider hidden />
                    <span style={{ fontSize: '1.5em', marginBottom: '5px' }}> {this.props.job.company.name} </span>
                  </div>
                  <Divider hidden />
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ fontWeight: 600, marginRight: '10px' }}> Location: </span> <span> {this.props.job.location} </span>
                    <br />
                    <span style={{ fontWeight: 600, marginRight: '10px' }}> Industry: </span> <span> {this.renderIndustries()} </span>
                    <Divider clearing />
                    <span style={{ fontWeight: 600, marginRight: '10px' }}> Job title: </span> <span> {this.props.job.title} </span>
                    <br />
                    <span style={{ fontWeight: 600, marginRight: '10px' }}> Posted: </span> <span> {this.props.job.posted} </span>
                    <br />
                    <span style={{ fontWeight: 600, marginRight: '10px' }}> Closes: </span> <span> {this.props.job.closes ? this.props.job.closes : '-'} </span>
                    <br />
                    <span style={{ fontWeight: 600, marginRight: '10px' }}> Experience level: </span> <span> {this.props.job.experience} </span>
                    <br />
                    <span style={{ fontWeight: 600, marginRight: '10px' }}> Hours: </span> <span> {this.props.job.hours} </span>
                    <br />
                    <span style={{ fontWeight: 600, marginRight: '10px' }}> Language: </span> <span> {this.renderLanguages()} </span>
                    <br />
                  </div>
                  <Divider hidden />
                  {
                    this.props.jobApplication ?
                      <Header style={{ textAlign: 'center' }}>
                        You applied for this job.
                        <Header.Subheader>
                          Status of your application is: <b>{this.props.jobApplication.state}</b>
                        </Header.Subheader>
                      </Header> :
                      <div style={{ textAlign: 'center' }}>
                        <Message error hidden={!this.props.applyError}>
                          <p>
                            {this.props.applyError}
                          </p>
                        </Message>
                        <Button onClick={() => this.props.applyJobPosition(this.props.match.params.id)} fluid color="green">APPLY NOW</Button>
                      </div>
                  }
                </Segment>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    job: state.job.job,
    company: state.job.company,
    isFetching: state.job.isFetching,
    error: state.job.error,
    errorFeatured: state.addJob.error,
    applyError: state.jobApplication.error,
    address: state.auth.address,
    jobApplication: state.jobApplication.checkJobApplication,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchJob(url) {
      dispatch(fetchJob(url));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    deleteJobPosition(id) {
      dispatch(deleteJobPosition(id));
    },
    applyJobPosition(id) {
      dispatch(applyJobPosition(id));
    },
    checkJobApplication(id) {
      dispatch(checkJobApplication(id));
    },
    markAsFeaturedJobPosition(id) {
      dispatch(markAsFeaturedJobPosition(id));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(JobPage);
