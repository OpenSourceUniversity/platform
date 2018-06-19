import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Grid, Sticky, Segment, List, Button, Statistic, Label, Modal, Image, Form, Input, Dimmer, Loader, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SkillItem from 'components/SkillItem';
import CertificateItem from 'components/CertificateItem';
import { fetchCertificates } from '../../containers/CertificatesPage/actions';
import learnerProfile from '../../util/profile/learnerProfile';


class LearnerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentWillMount() {
    this.props.learnerProfile();
  }
  componentDidMount() {
    this.props.fetchCertificates();
  }

  renderCertificates() {
    return this.props.certificates.map((certificate, index) => (
      <Grid.Column
        computer={4}
        largeScreen={4}
        widescreen={4}
        tablet={8}
        mobile={16}
        key={index}
      >
        <CertificateItem certificate={certificate} key={index} />
      </Grid.Column>
    ));
  }

  handleInputChange(event) {
    event.preventDefault();
    const { target } = event;
    const { name } = target;
    let value;
    [value] = target.files;

    this.setState({
      [name]: value,
    });
  }

  render() {
    /* eslint-disable global-require */

    const token = require('../../icons/edu_token.svg');

    /* eslint-enable global-require */

    const email = `mailto:${this.props.profile.email}`;
    const site = `http://${this.props.profile.site}`;

    return (
      <div>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Sticky offset={150}>
              <Segment.Group className="profileSegment">
                <Segment textAlign="center">
                  <Modal trigger={<Segment
                    textAlign="center"
                    circular
                    className="profilePicSegment"
                    style={{
                      width: 175, height: 175, backgroundImage: `url(${this.props.profile.profilePic})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center center',
                    }}
                  />}
                  >
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content image>
                      <Image style={{ borderRadius: '50%', width: '200px', height: '200px' }} size="medium" src={this.props.profile.profilePic} />
                      <Modal.Description style={{ width: '100%', paddingLeft: '4em', textAlign: 'center' }}>
                        <Header>Default Profile Image</Header>
                        <Form>
                          <Form.Field style={{ paddingTop: '1em' }}>
                            <label style={{ lineHeight: '2.3' }} htmlFor="LernerAvatar">
                              Profile photo
                              <Input
                                id="LernerAvatar"
                                iconPosition="left"
                                icon="address card"
                                type="file"
                                name="LernerAvatar"
                                placeholder="Profile Photo"
                                onChange={this.handleInputChange}
                              />
                            </label>
                          </Form.Field>
                          <Button type="submit" primary size="huge">Save</Button>
                        </Form>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                  <Header size="large">
                    {this.props.profile.names}
                  </Header>
                  <Header size="small" color="grey">
                    {this.props.profile.position}
                  </Header>
                </Segment>
                <Segment>
                  <List>
                    <List.Item icon={{ name: 'users', style: { width: '22px' } }} content={this.props.profile.specialisation} />
                    <List.Item icon={{ name: 'marker', style: { width: '22px' } }} content={this.props.profile.location} />
                    <List.Item icon={{ name: 'mail', style: { width: '22px' } }} content={<a href={email}>{this.props.profile.email}</a>} />
                    <List.Item icon={{ name: 'linkify', style: { width: '22px' } }} content={<a href={site}>{this.props.profile.site}</a>} />
                  </List>
                </Segment>
                <Segment>
                  <Statistic.Group size="tiny" color="orange" horizontal>
                    <Statistic>
                      <Statistic.Value>{this.props.profile.certificates}</Statistic.Value>
                      <Statistic.Label>Certificates</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>{this.props.profile.courses}</Statistic.Value>
                      <Statistic.Label>Courses</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>{this.props.profile.reviews}</Statistic.Value>
                      <Statistic.Label>Reviews</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                </Segment>
              </Segment.Group>
            </Sticky>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={11}>
            <Segment style={{ paddingBottom: '2em' }} size="large">
              <Header>
                Introduction
              </Header>
              <Divider clearing />
              <Segment style={{
                textAlign: 'center', background: '#7f8fa6', color: '#fff', borderRadius: '10px', opacity: 0.7,
              }}
              >
                Coming in Beta
              </Segment>
              <Header>
                Certificates
              </Header>
              <Divider clearing />
              <Button style={{ marginBottom: '1em' }} icon labelPosition="left" positive floated="right" as={Link} to="/certificates/add">
                <Icon name="plus" />
                Add Certificate
              </Button>
              <Divider clearing />
              <Dimmer active={this.props.isFetching} inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
              <Message error hidden={!this.props.error}>
                <p>
                  {this.props.error}
                </p>
              </Message>

              <Message info hidden={this.props.certificates.length > 0 || !!this.props.error}>
                <p>
                  You do not have any certificates yet. Go ahead and add some.
                </p>
              </Message>
              <Grid width={16}>
                {this.renderCertificates()}
              </Grid>

            </Segment>
            <Segment.Group size="large">
              <Segment>
                <Header>
                  Experience
                </Header>
                <Segment style={{
                  textAlign: 'center', background: '#7f8fa6', color: '#fff', borderRadius: '10px', opacity: 0.7,
                }}
                >
                    Coming in Beta
                </Segment>
                <Divider clearing />
              </Segment>
              <Segment>
                <Header>
                  Education
                </Header>
                <Segment style={{
                  textAlign: 'center', background: '#7f8fa6', color: '#fff', borderRadius: '10px', opacity: 0.7,
                }}
                >
                    Coming in Beta
                </Segment>
                <Divider clearing />
              </Segment>
            </Segment.Group>
            <Segment size="large">
              <Header>
                Reviews
              </Header>
              <Segment style={{
                textAlign: 'center', background: '#7f8fa6', color: '#fff', borderRadius: '10px', opacity: 0.7,
              }}
              >
                  Coming in Beta
              </Segment>
              <Divider clearing />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    certificates: state.certificates.certificates,
    isFetchingCertificate: state.certificates.isFetching,
    errorCertificate: state.certificates.error,
    profile: state.profile,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCertificates() {
      dispatch(fetchCertificates());
    },
    learnerProfile() {
      dispatch(learnerProfile());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LearnerProfile);
