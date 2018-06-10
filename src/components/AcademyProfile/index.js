import React from 'react';
import { Header, Divider, Grid, Sticky, Segment, List, Button, Modal, Form, Input } from 'semantic-ui-react';

export default class AcademyProfile extends React.Component {

  render() {
    // IMG SRC
    // academy name
    // Location
    // Short description
    // Employees
    // Email
    // academy type
    // Site (+ render site link)
    // Socials (render)
    // Full description
    // Jobs Listing (Jobs Item?)
    /* eslint-disable global-require */

    const profilePicture = this.props.academy.profile_src;

    /* eslint-enable global-require */

    const email = `mailto:${this.props.academy.email}`;
    const link = `https://${this.props.academy.site}`;

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
                      width: 175, height: 175, backgroundImage: `url(${profilePicture})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center center',
                    }}
                  />}>
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content image>
                      <Image style={{ borderRadius: '50%', width: '200px', height: '200px' }} size="medium" src={profilePicture} />
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
                    {this.props.academy.name}
                  </Header>
                  <Header size="small" color="grey">
                    {this.props.academy.location}
                  </Header>
                  <span>
                    {this.props.academy.short_desc}
                  </span>
                </Segment>
                <Segment>
                  <Button
                    primary
                    size="large"
                    className="fluid"
                    content="MESSAGE US"
                    icon="mail outline"
                  />
                </Segment>
                <Segment>
                  <List>
                    <List.Item icon="users" content={<span>{this.props.academy.learners}</span>} />
                    <List.Item icon="mail" content={<a href={email}>{this.props.academy.email}</a>} />
                    <List.Item icon="linkify" content={<a href={link}>{this.props.academy.site}</a>} />
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
              {this.props.academy.full_desc}
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
