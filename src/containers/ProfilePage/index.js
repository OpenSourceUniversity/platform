import React from 'react';
import { Container, Header, Divider, Grid, Sticky, Segment, Icon, List } from 'semantic-ui-react';
import OverviewItem from 'components/ProfileOverviewItem';
import ProfileAchievement from 'components/ProfileAchievement';

export default class ProfilePage extends React.Component {
  renderOverview() {
    const overview = [
      { title: 'Education' },
      { title: 'Sertificate' },
      { title: 'Courses' },
    ];
    return overview.map((overview, index) => (
      <OverviewItem overview={overview} key={index} />
    ));
  }

  renderAchievement() {
    const achievement = [
      { achievementItem: 'Education' },
      { achievementItem: 'Sertificate' },
      { achievementItem: 'Courses' },
    ];
    return achievement.map((achievement, index) => (
      <ProfileAchievement achievement={achievement} key={index} />
    ));
  }

  render() {
    return (
      <div>
        <Container>
          <Header size="huge">
            <Icon name="user" />
            OS.UNI
          </Header>
        </Container>

        <Divider clearing />

        <Container>
          <Grid reversed="mobile">
            <Grid.Column width={12}>
              {this.renderAchievement()}
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
