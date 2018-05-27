import React from 'react';
import { Header, Divider, Grid, Sticky, Segment, Image, List, Button } from 'semantic-ui-react';
import CourseItem from 'components/CourseItem';

export default class AcademyProfile extends React.Component {
  renderCourses() {
    const courses = [
      {
        title: 'Python Development', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Scrum Master', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Machine Learning', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Solidity Development', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Unit Testing', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
    ];
    return courses.map((certificate, index) => (
      <Grid.Column
        computer={8}
        largeScreen={8}
        widescreen={8}
        tablet={8}
        mobile={16}
        key={index}
      >
        <CourseItem certificate={certificate} key={index} />
      </Grid.Column>));
  }

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
                  <Segment textAlign="center" circular className="profilePicSegment" style={{ width: 175, height: 175, backgroundImage: 'url(' + profilePicture + ')', backgroundRepeat: 'no-repeat', backgroundSize: '90%', backgroundPosition: 'center center' }}/>
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
              {this.renderCourses()}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
