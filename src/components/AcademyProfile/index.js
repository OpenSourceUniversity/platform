import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Grid, Sticky, Segment, List, Button, Modal, Form, Input, Image } from 'semantic-ui-react';
import academyProfile from '../../util/profile/academyProfile';

class AcademyProfile extends React.Component {
  componentWillMount() {
    this.props.academyProfile();
  }
  render() {
    const email = `mailto:${this.props.profile.email}`;
    const link = `https://${this.props.profile.site}`;

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
                    {this.props.profile.name}
                  </Header>
                  <span>
                    {this.props.profile.shortDescription}
                  </span>
                </Segment>
                <Segment>
                  <Button
                    as="a"
                    primary
                    size="large"
                    className="fluid"
                    content="MESSAGE US"
                    icon="mail outline"
                    href={email}
                  />
                </Segment>
                <Segment>
                  <List>
                    <List.Item icon={{ name: 'users', style: { width: '22px' } }} content={<span>{this.props.profile.students}</span>} />
                    <List.Item icon={{ name: 'marker', style: { width: '22px' } }} content={this.props.profile.location} />
                    <List.Item icon={{ name: 'mail', style: { width: '22px' } }} content={<a href={email}>{this.props.profile.email}</a>} />
                    <List.Item icon={{ name: 'linkify', style: { width: '22px' } }} content={<a href={link}>{this.props.profile.site}</a>} />
                  </List>
                </Segment>
                <Segment />
              </Segment.Group>
            </Sticky>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={11}>
            <Segment size="large">
              <Header>
                About
              </Header>
              <Divider clearing />
              {this.props.profile.fullDescription}
              <Divider clearing />
            </Segment>
            <Segment size="large">
              <Header>
                Courses
              </Header>
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
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    academyProfile() {
      dispatch(academyProfile());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AcademyProfile);
