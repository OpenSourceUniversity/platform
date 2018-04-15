import React from 'react';
import { Container, Header, Divider, Grid, Sticky, Segment, Icon, List, Dropdown, Button } from 'semantic-ui-react';
import OverviewItem from 'components/ProfileOverviewItem';
import ProfileAchievement from 'components/ProfileAchievement';

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
    const skills = [
    { key: 'css', value: 'css', text: 'CSS' },
    { key: 'html', value: 'html', text: 'HTML' },
    { key: 'c++', value: 'c++', text: 'C++' },
    { key: 'swift', value: 'swift', text: 'Swift' },
    { key: 'js', value: 'js', text: 'JavaScript' },
    { key: 'jquery', value: 'jquery', text: 'jQuery' },
    { key: 'react', value: 'react', text: 'React' },
  ];
  let profile = require('../../icons/account_profile.svg');
    return (
      <div>
        <Container fluid>
          <Header size="huge">
            <svg width='44' height='44' className='cogs icon'> 
              <image href={profile}  x='0' y='0' width='100%' height='100%'></image>
            </svg>
            OS.UNI
          </Header>


        <Divider clearing />


          <Grid reversed="mobile">
            <Grid.Column width={12}>
              {this.renderAchievement()}
              <div className='ui very padded segment'>
                <Dropdown placeholder='Select Skills' fluid multiple search selection options={skills} />
                <Button primary>Save</Button>
              </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <Sticky>
                <Segment>
                  <Header>
                    Overview
                  </Header>
                  <List relaxed>
                    {this.renderOverview()}
                  </List>
                </Segment>
              </Sticky>
            </Grid.Column>
          </Grid>
        </Container>
      </div>

        

    );
  }
}
