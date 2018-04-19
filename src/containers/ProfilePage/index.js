import React from 'react';
import { Container, Header, Divider, Grid, Sticky, Segment, Image, Icon, List, Dropdown, Button, Statistic, Label } from 'semantic-ui-react';
import OverviewItem from 'components/ProfileOverviewItem';
import ProfileAchievement from 'components/ProfileAchievement';

const square = { width: 175, height: 175 }

export default class ProfilePage extends React.Component {

  renderOverview() {
    const overviewData = [
      { title: 'Education' },
      { title: 'Certificate' },
      { title: 'Courses' },
    ];
    return overviewData.map((overview, index) => (
      <OverviewItem overview={overview} key={index} />
    ));
  }

  renderAchievement() {
    const achievementData = [
      { achievementItem: 'Education' },
      { achievementItem: 'Certificate' },
      { achievementItem: 'Courses' },
    ];
    return achievementData.map((achievement, index) => (
      <ProfileAchievement achievement={achievement} key={index} />
    ));
  }

  render() {

    let profile = require('../../icons/account_profile.svg');
    let token = require('../../icons/edu_token.svg');
    let profilePicture = require('../../img/jj.jpg');
    const color = true ? 'green' : 'orange';

    return (
      <div>
        <Container>

          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Sticky>
                <Segment.Group className="profileSegment">
                  <Segment textAlign='center'>
                    <Segment textAlign='center' circular className="profilePicSegment" style={square}>
                      <Image src={profilePicture} className='circular' />
                    </Segment>
                    <Header size='large'>
                      Jordan Jambazov
                    </Header>
                    <Header size='small' color='grey'>
                      Technology Lead at The Open Source University
                    </Header>
                  </Segment>
                  <Segment>
                    <Button 
                      primary
                      size='large'
                      className='fluid'
                      content='Contact'
                      icon='mail outline'
                      label={{ image: token, as: 'a', basic: true, pointing: 'right', content: '5 EDU' }}
                      labelPosition='left'
                    />
                  </Segment>
                  <Segment>
                    <List>
                      <List.Item icon='users' content='Semantic UI' />
                      <List.Item icon='marker' content='New York, NY' />
                      <List.Item icon='mail' content={<a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>} />
                      <List.Item icon='linkify' content={<a href='http://www.semantic-ui.com'>semantic-ui.com</a>} />
                    </List>
                  </Segment>
                  <Segment>
                    <Statistic.Group size='tiny' color='orange' horizontal>
                      <Statistic>
                        <Statistic.Value>15</Statistic.Value>
                        <Statistic.Label>Certificates</Statistic.Label>
                      </Statistic>
                      <Statistic>
                        <Statistic.Value>23</Statistic.Value>
                        <Statistic.Label>Courses</Statistic.Label>
                      </Statistic>
                      <Statistic>
                        <Statistic.Value>30</Statistic.Value>
                        <Statistic.Label>Skills</Statistic.Label>
                      </Statistic>
                      <Statistic>
                        <Statistic.Value>4</Statistic.Value>
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
                <p>
                “I am a non-accredited, overly logical psychologist, therapist, mechanic, diplomat, businessman, and Teacher working in an industry that is still defining itself each and every day."
                </p>
                <p>
                Aenean eros nibh, dignissim eget gravida et, rutrum et risus. Sed vel nulla scelerisque, scelerisque diam id, cursus ipsum. Quisque molestie tempor tellus, ut blandit velit gravida non. Pellentesque at nibh vel quam malesuada tristique. Nam aliquam nulla eget molestie fermentum. Ut rutrum dictum ligula et pulvinar. Curabitur cursus lacus sed lectus suscipit, nec fringilla ipsum egestas. Nullam vel accumsan leo, vitae fringilla lacus. Aenean varius neque mauris, at ornare nunc pulvinar a. Morbi quam lorem, semper eu dignissim ac, porttitor vel neque. Praesent egestas elementum sollicitudin. Aliquam tincidunt hendrerit libero, non elementum felis varius quis. Nulla facilisi. Curabitur ac lorem a massa malesuada rutrum quis et magna. Praesent condimentum dui eu elit imperdiet, vitae tincidunt magna scelerisque. Duis auctor diam non mattis vestibulum.
                </p>
                <Header>
                  Certificates
                </Header>
                <Divider clearing />

                <Header>
                  Skills
                </Header>
                <Divider clearing />
                <Label.Group size='big'>
                  <Label basic>
                    <Icon size='small' name={true ? 'check' : 'warning sign'} color={color} />
                    Python
                  </Label>
                  <Label basic>
                    <Icon size='small' name={false ? 'check' : 'warning sign'} color='orange' />
                    Design
                  </Label>
                  <Label basic>
                    <Icon size='small' name={true ? 'check' : 'warning sign'} color={color} />
                    Software
                  </Label>
                  <Label basic>
                    <Icon size='small' name={true ? 'check' : 'warning sign'} color={color} />
                    Python
                  </Label>
                  <Label basic>
                    <Icon size='small' name={true ? 'check' : 'warning sign'} color={color} />
                    Python
                  </Label>
                  <Label basic>
                    <Icon size='small' name={true ? 'check' : 'warning sign'} color={color} />
                    Python
                  </Label>
                  <Label basic>
                    <Icon size='small' name={true ? 'check' : 'warning sign'} color={color} />
                    Python
                  </Label>
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
                <p>
                “I am a non-accredited, overly logical psychologist, therapist, mechanic, diplomat, businessman, and Teacher working in an industry that is still defining itself each and every day."
                </p>
                <p>
                Aenean eros nibh, dignissim eget gravida et, rutrum et risus. Sed vel nulla scelerisque, scelerisque diam id, cursus ipsum. Quisque molestie tempor tellus, ut blandit velit gravida non. Pellentesque at nibh vel quam malesuada tristique. Nam aliquam nulla eget molestie fermentum. Ut rutrum dictum ligula et pulvinar. Curabitur cursus lacus sed lectus suscipit, nec fringilla ipsum egestas. Nullam vel accumsan leo, vitae fringilla lacus. Aenean varius neque mauris, at ornare nunc pulvinar a. Morbi quam lorem, semper eu dignissim ac, porttitor vel neque. Praesent egestas elementum sollicitudin. Aliquam tincidunt hendrerit libero, non elementum felis varius quis. Nulla facilisi. Curabitur ac lorem a massa malesuada rutrum quis et magna. Praesent condimentum dui eu elit imperdiet, vitae tincidunt magna scelerisque. Duis auctor diam non mattis vestibulum.
                </p>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
