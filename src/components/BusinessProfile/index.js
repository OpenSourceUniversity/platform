import React from 'react';
import { Header, Divider, Grid, Sticky, Segment, List, Button } from 'semantic-ui-react';
import JobItem from 'components/JobItem';

export default class BusinessProfile extends React.Component {
  renderJobs() {
    const jobs = [
      {
        title: 'Python Development', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Scrum Master', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Machine Learning', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Solidity Development', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Unit Testing', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah',
      },
    ];
    return jobs.map((job, index) => (
      <Grid.Column
        computer={8}
        largeScreen={8}
        widescreen={8}
        tablet={8}
        mobile={16}
        key={index}
      >
        <JobItem job={job} key={index} />
      </Grid.Column>));
  }

  render() {
    // IMG SRC
    // Company name
    // Location
    // Short description
    // Employees
    // Email
    // Company type
    // Site (+ render site link)
    // Socials (render)
    // Full description
    // Jobs Listing (Jobs Item?)
    /* eslint-disable global-require */

    const profilePicture = this.props.company.profile_src;

    /* eslint-enable global-require */

    const email = `mailto:${this.props.company.email}`;
    const link = `https://${this.props.company.site}`;

    return (
      <div>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Sticky offset={150}>
              <Segment.Group className="profileSegment">
                <Segment textAlign="center">
                  <Segment
                    textAlign="center"
                    circular
                    className="profilePicSegment"
                    style={{
                      width: 175, height: 175, backgroundImage: `url(${profilePicture})`, backgroundRepeat: 'no-repeat', backgroundSize: '90%', backgroundPosition: 'center center',
                    }}
                  />
                  <Header size="large">
                    {this.props.company.name}
                  </Header>
                  <Header size="small" color="grey">
                    {this.props.company.location}
                  </Header>
                  <span>
                    {this.props.company.short_desc}
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
                    <List.Item icon="users" content={this.props.company.employees} />
                    <List.Item icon="mail" content={<a href={email}>{this.props.company.email}</a>} />
                    <List.Item icon="linkify" content={<a href={link}>{this.props.company.site}</a>} />
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
              {this.props.company.full_desc}
              <Divider clearing />
            </Segment>
            <Segment size="large">
              <Header>
                Jobs
              </Header>
              <Divider clearing />
              {this.renderJobs()}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
