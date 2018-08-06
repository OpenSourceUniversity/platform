import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Divider, Label, Segment, Grid, Menu, Icon, Container, Breadcrumb, Modal } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import { fetchJob, deleteJobPosition } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import Config from '../../config';

class JobPage extends React.Component {
  state = { modalOpen: false }

  componentDidMount() {
    const { bdnUrl } = Config.network;
    this.props.fetchJob(`${bdnUrl}api/v1/jobs/${this.props.match.params.id}/`);
    this.props.setSecondaryNav('business');
    document.title = 'Job | OS.University';
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  renderSkills() {
    return this.props.job.skills.map((skill, index) => (
      <SkillItem skill={skill} key={index} />
    ));
  }

  renderIndustries() {
    return this.props.job.categories.map((category, index) => (
      <SkillItem skill={category} key={index} />
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
                    <Modal open={this.state.modalOpen} onClose={this.handleClose} trigger={<Button onClick={this.handleOpen} color="red">Delete</Button>} basic size="small">
                      <Header icon="archive" content="Delete course confirmation" />
                      <Modal.Content>
                        <p>
                        You want to delete youre job position, named: {this.props.job.title}.
                        </p>
                        <p>
                        Please, confirm this action.
                        </p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button onClick={this.handleOpen} basic color="grey" inverted>
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
                    <Label
                      circular
                      onClick={this.props.job.company.eth_address ? () => { this.props.history.push(`/view-profile/business/${this.props.job.company.eth_address}/`); } : null}
                      style={{
                        boxShadow: '2px 6px 20px 0 #bcbdbd, 0 1px 21px 1px #d4d4d5', width: '8em', height: '8em', backgroundColor: 'white', backgroundImage: 'None', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '80%', cursor: 'pointer',
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
                    <span style={{ fontWeight: 600, marginRight: '10px' }}> Job type: </span> <span> {this.props.job.job_type} </span>
                    <br />
                    <span style={{ fontWeight: 600, marginRight: '10px' }}> Language: </span> <span> {this.renderLanguages()} </span>
                    <br />
                  </div>
                  <Divider hidden />
                  <div style={{ textAlign: 'center' }}>
                    <Button as="a" target="_blank" href={this.props.job.external_link} fluid color="green">APPLY NOW</Button>
                  </div>
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
    isFetching: state.job.isFetching,
    error: state.job.error,
    address: state.auth.address,
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
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(JobPage);
