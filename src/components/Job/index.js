import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Header, Divider, Label, Segment, Grid, Menu, Icon, Container } from 'semantic-ui-react';
import JobItem from 'components/JobItem';
import SkillItem from 'components/SkillItem';

class JobWithoutRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  state = { activeItem: 'desc' }

  handleButtonClick = (e, { name }) => {
    let newPath;
    if (name === 'home') {
      newPath = '/';
    } else {
      newPath = `/${name}`;
    }
    this.props.history.push(newPath);
  }
<<<<<<< HEAD

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
=======
>>>>>>> c02060e822c59b6e440b3ec7c2d35d86969b7e27

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
        title: 'Python Development', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Scrum Master', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Machine Learning', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Solidity Development', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Unit Testing', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
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

  renderRating(ratingNumb) {
    return (
      <div className="ui accurate star widget inline" style={{ marginRight: '10px' }}>
        <div className="highlight" style={{ width: `${(ratingNumb / 5) * 100}%` }} />
      </div>);
  }

  render() {
    const vals =
      {
        job_title: 'UI/UX Designer',
        company: 'IO Era',
        location: 'Sofia, Bulgaria',
        salary: '2000 BGN',
        overview: 'Overview Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et egestas leo. Aliquam ultricies libero orci, quis malesuada massa posuere quis. Mauris eget ullamcorper elit, et faucibus sem. Aliquam maximus.',
        description: 'Descriptions Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et egestas leo. Aliquam ultricies libero orci, quis malesuada massa posuere quis. Mauris eget ullamcorper elit, et faucibus sem. Aliquam maximus.',
        resp: 'Responsibilities Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et egestas leo. Aliquam ultricies libero orci, quis malesuada massa posuere quis. Mauris eget ullamcorper elit, et faucibus sem. Aliquam maximus.',
        qual: 'Qualifications Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et egestas leo. Aliquam ultricies libero orci, quis malesuada massa posuere quis. Mauris eget ullamcorper elit, et faucibus sem. Aliquam maximus.',
        offer: 'We offer Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et egestas leo. Aliquam ultricies libero orci, quis malesuada massa posuere quis. Mauris eget ullamcorper elit, et faucibus sem. Aliquam maximus.',
        icon: 'https://era.io/static/img/logo-active-full.png',
        rating: 3.7,
        industry: 'IT & Design',
        posted: '23.05.2018',
        closes: '23.06.2018',
        exp: '1+ year',
        time: 'Full-time',
        job_type: 'Permanent contract',
        lang: 'English, Bulgarian',
      };

    return (
      <div className="course">
        <Grid>
          <Grid.Column width={11}>
            <Segment style={{ padding: '40px' }}>
              <div>
                <Header style={{ fontSize: '1.7em' }}>
                  {vals.job_title}
                  <span className="label-status"> <Label basic color="green">New</Label> </span>
                </Header>
                <span style={{ fontSize: '1.3em', color: 'gray' }}>
                  Posted by {vals.company} <Icon name="point" style={{ marginLeft: '10px', marginRight: 0 }} /> {vals.location} <Icon name="dollar" style={{ marginLeft: '10px', marginRight: 0 }} /> {vals.salary}
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
                  <Menu.Item style={{ fontSize: '1.3em' }} name="desc">
                      Job Descriptions
                  </Menu.Item>
                </Menu>
                <Container style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                  {(() => {
                    switch (this.state.activeItem) {
                    case 'resp': return vals.resp;
                    case 'qual': return vals.qual;
                    case 'offer': return vals.offer;
                    default: return vals.description;
                    }
                  })()}
                </Container>
                <Menu pointing secondary color="orange">
                  <Menu.Item style={{ fontSize: '1.2em' }} name="resp" active >
                      Responsibilities
                  </Menu.Item>
                </Menu>
                <Container style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                  {vals.resp}
                </Container>
                <Menu pointing secondary color="orange">
                  <Menu.Item style={{ fontSize: '1.2em' }} name="qual" active>
                      Qualifications
                  </Menu.Item>
                </Menu>
                <Container style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                  {vals.qual}
                </Container>
              </div>
              <Divider hidden />
              <Button name="jobs" onClick={this.handleButtonClick}> Back to search research </Button>
              <Button style={{ float: 'right' }}> Priveus </Button>
              <Button style={{ float: 'right' }}> Next </Button>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment style={{ padding: '40px' }}>
              <div style={{ textAlign: 'center' }}>
                <Label
                  as="a"
                  href={vals.link}
                  circular
                  style={{
                    boxShadow: '2px 6px 20px 0 #bcbdbd, 0 1px 21px 1px #d4d4d5', width: '10em', height: '10em', backgroundColor: 'white', backgroundImage: `url(${vals.icon})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '80%',
                  }}
                />
                <Divider hidden />
                <span style={{ fontSize: '1.5em', marginBottom: '5px' }}> {vals.company} </span>
                <br />
                {this.renderRating(vals.rating)}
              </div>
              <Divider hidden />
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontWeight: 600, marginRight: '10px' }}> Location: </span> <span> {vals.location} </span>
                <br />
                <span style={{ fontWeight: 600, marginRight: '10px' }}> Industry: </span> <span> {vals.industry} </span>
                <Divider clearing />
                <span style={{ fontWeight: 600, marginRight: '10px' }}> Job title: </span> <span> {vals.job_title} </span>
                <br />
                <span style={{ fontWeight: 600, marginRight: '10px' }}> Posted: </span> <span> {vals.posted} </span>
                <br />
                <span style={{ fontWeight: 600, marginRight: '10px' }}> Closes: </span> <span> {vals.closes} </span>
                <br />
                <span style={{ fontWeight: 600, marginRight: '10px' }}> Experience level: </span> <span> {vals.exp} </span>
                <br />
                <span style={{ fontWeight: 600, marginRight: '10px' }}> Hours: </span> <span> {vals.time} </span>
                <br />
                <span style={{ fontWeight: 600, marginRight: '10px' }}> Job type: </span> <span> {vals.job_type} </span>
                <br />
                <span style={{ fontWeight: 600, marginRight: '10px' }}> Language: </span> <span> {vals.lang} </span>
                <br />
              </div>
              <Divider hidden />
              <div style={{ textAlign: 'center' }}>
                <Button fluid color="green">APPLY NOW</Button>
              </div>
            </Segment>
            <Segment >
              <Header style={{ fontSize: '1.5em' }} textAlign="center">
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

const Job = withRouter(JobWithoutRouter);

export default Job;
