import React from 'react';
import { Button, Header, Divider, Label, Segment, Grid, Menu, Icon } from 'semantic-ui-react';
import JobItem from 'components/JobItem';
import SkillItem from 'components/SkillItem';

export default class Job extends React.Component {
  state = { activeItem: 'desc' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderSkills() {
    const skills = [
      {
        have_icon: false, check: true, name: 'Python', basic: false,
      },
      {
        have_icon: false, check: false, name: 'Design', basic: false,
      },
      {
        have_icon: false, check: true, name: 'Software', basic: false,
      },
      {
        have_icon: false, check: true, name: 'Python', basic: false,
      },
      {
        have_icon: false, check: true, name: 'Python', basic: false,
      },
      {
        have_icon: false, check: true, name: 'Python', basic: false,
      },
      {
        have_icon: false, check: true, name: 'Python', basic: false,
      },
    ];
    return skills.map((course, index) => (
      <SkillItem skill={course} key={index} />
    ));
  }

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
    const vals =
      {
        job_title: 'UI/UX Designer',
        company: 'IO Era',
        location: 'Sofia, Bulgaria',
        salary: '1000 BGN',
        overview: 'Overview blah blah blah',
        description: 'Descriptions blah blah blah',
        resp: 'Responsobilities blah blah blah',
        qual: 'Qualifications blah blah blah',
        offer: 'We offer blah blah blah',
        icon: 'https://os.university/static/assets/icons/osu-logo.png',
        rating: 5.0,
        industry: 'IT & Design',
        posted: '23.05.2018',
        closes: '23.06.2018',
        exp: '1+ years',
        time: 'Full-time',
        job_type: 'Permanent contract',
        lang: 'English, Bulgarian',
      };

    const { activeItem } = this.state;
    return (
      <div className="course">
        <Grid>
          <Grid.Column width={11}>
            <Segment>
              <div>
                <Header>
                  {vals.job_title}
                  <span className="label-status"> [New] </span>
                </Header>
                <span>
                  Posted by {vals.company} <Icon name="point" /> {vals.location} <Icon name="dollar" /> {vals.salary}
                </span>
                <Header>
                   Overview
                </Header>
                <span>
                  {vals.overview}
                </span>
                <Header>
                  Skills
                </Header>
                <Label.Group size="medium">
                  {this.renderSkills()}
                </Label.Group>
                <Menu pointing secondary color="orange">
                  <Menu.Item name="desc" active={activeItem === 'desc'} onClick={this.handleItemClick}>
                      Job Descriptions
                  </Menu.Item>
                  <Menu.Item name="resp" active={activeItem === 'resp'} onClick={this.handleItemClick}>
                      Responsobilities
                  </Menu.Item>
                  <Menu.Item name="qual" active={activeItem === 'qual'} onClick={this.handleItemClick}>
                      Qualifications
                  </Menu.Item>
                  <Menu.Item name="offer" active={activeItem === 'offer'} onClick={this.handleItemClick}>
                      We offer
                  </Menu.Item>
                </Menu>
                <span>
                  {(() => {
                    switch (this.state.activeItem) {
                    case 'resp': return vals.resp;
                    case 'qual': return vals.qual;
                    case 'offer': return vals.offer;
                    default: return vals.description;
                    }
                  })()}
                </span>
                <Menu pointing secondary color="orange">
                  <Menu.Item name="resp" active >
                      Responsobilities
                  </Menu.Item>
                </Menu>
                <span>
                  {vals.resp}
                </span>
                <Menu pointing secondary color="orange">
                  <Menu.Item name="qual" active>
                      Qualifications
                  </Menu.Item>
                </Menu>
                <span>
                  {vals.qual}
                </span>
              </div>
              <Divider hidden />
              <Button> Back to search research </Button>
              <Button style={{ float: 'right' }}> Priveus </Button>
              <Button style={{ float: 'right' }}> Next </Button>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment textAlign="center">
              <img alt="" src={vals.icon} />
              <Divider hidden />
              <span> {vals.company} </span>
              <br />
              <Icon color="yellow" name="star" />
              <Icon color="yellow" name="star" />
              <Icon color="yellow" name="star" />
              <Icon color="yellow" name="star" />
              <Icon color="yellow" name="star" />
              {vals.rating.toFixed(1)}/5.0
              <Divider hidden />
              <div style={{ textAlign: 'left' }}>
                <span> Location: </span> <span> {vals.location} </span>
                <br />
                <span> Industry: </span> <span> {vals.industry} </span>
                <Divider clearing />
                <span> Job title: </span> <span> {vals.job_title} </span>
                <br />
                <span> Posted: </span> <span> {vals.posted} </span>
                <br />
                <span> Closes: </span> <span> {vals.closes} </span>
                <br />
                <span> Experience level: </span> <span> {vals.exp} </span>
                <br />
                <span> Hours: </span> <span> {vals.time} </span>
                <br />
                <span> Job type: </span> <span> {vals.job_type} </span>
                <br />
                <span> Language: </span> <span> {vals.lang} </span>
                <br />
              </div>
              <Divider hidden />
              <Button color="green">APPLY NOW</Button>
            </Segment>
            <Segment>
              <Header textAlign="center">
                Similar positions
              </Header>
              {this.renderJobs()}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
