import React from 'react';
import { Container, Header, Divider, Grid, Sticky, Segment, Image, Icon, List, Dropdown, Button, Statistic, Label } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';

const square = { width: 175, height: 175 }

export default class LearnerProfile extends React.Component {

  renderSkills() {
    const skills = [
      { have_icon: true, check: true, name: 'Python', basic: true },
      { have_icon: true, check: false, name: 'Design', basic: true },
      { have_icon: true, check: true, name: 'Software', basic: true },
      { have_icon: true, check: true, name: 'Python', basic: true },
      { have_icon: true, check: true, name: 'Python', basic: true },
      { have_icon: true, check: true, name: 'Python', basic: true },
      { have_icon: true, check: true, name: 'Python', basic: true },
    ];
    return skills.map((course, index) => (
        <SkillItem skill={course} key={index} />
    ));
  }

  render() {

    let profile = require('../../icons/account_profile.svg');
    let token = require('../../icons/edu_token.svg');
    let profilePicture = require('../../img/jj.jpg');
    const color = true ? 'green' : 'orange';

    let email = 'mailto:' + this.props.learner.email;
    let site = 'http://' + this.props.learner.site;

    //name
    //position
    //email
    //site
    //certificates
    //courses
    //skills
    //reviews
    //introduction


    return (
      <div>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Sticky offset={150}>
              <Segment.Group className="profileSegment">
                <Segment textAlign='center'>
                  <Segment textAlign='center' circular className="profilePicSegment" style={square}>
                    <Image src={profilePicture} className='circular' />
                  </Segment>
                  <Header size='large'>
                    {this.props.learner.name}
                  </Header>
                  <Header size='small' color='grey'>
                    {this.props.learner.position}
                  </Header>
                </Segment>
                <Segment>
                  <Button 
                    primary
                    size='large'
                    className='fluid'
                    content='Contact'
                    icon='mail outline'
                    label={{ image: token, as: 'a', basic: true, pointing: 'right', content: this.props.learner.edu + ' EDU' }}
                    labelPosition='left'
                  />
                </Segment>
                <Segment>
                  <List>
                    <List.Item icon='users' content={this.props.learner.specialisation} />
                    <List.Item icon='marker' content={this.props.learner.location} />
                    <List.Item icon='mail' content={<a href={email}>{this.props.learner.email}</a>} />
                    <List.Item icon='linkify' content={<a href={site}>{this.props.learner.site}</a>} />
                  </List>
                </Segment>
                <Segment>
                  <Statistic.Group size='tiny' color='orange' horizontal>
                    <Statistic>
                      <Statistic.Value>{this.props.learner.certificates}</Statistic.Value>
                      <Statistic.Label>Certificates</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>{this.props.learner.courses}</Statistic.Value>
                      <Statistic.Label>Courses</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>{this.props.learner.skills}</Statistic.Value>
                      <Statistic.Label>Skills</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>{this.props.learner.reviews}</Statistic.Value>
                      <Statistic.Label>Reviews</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                </Segment>        
              </Segment.Group>
            </Sticky>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={11}>
            <Segment size='large'>
              <Header>
                Introduction
              </Header>
              <Divider clearing />
              {this.props.learner.introduction}
              <Header>
                Certificates
              </Header>
              <Divider clearing />

              <Header>
                Skills
              </Header>
              <Divider clearing />
              <Label.Group size='large'>
                {this.renderSkills()}
              </Label.Group>
            </Segment>
            <Segment.Group size='large'>
              <Segment>
                <Header>
                  Experience
                </Header>
                <Divider clearing />
              </Segment>
              <Segment>
                <Header>
                  Education
                </Header>
                <Divider clearing />
              </Segment>
            </Segment.Group>
            <Segment size='large'>
              <Header>
                Reviews
              </Header>
              <Divider clearing />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
