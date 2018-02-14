import React from 'react';
import {Segment} from 'semantic-ui-react';

export default class AchievementItem extends React.Component {
  render() {
    return (
      <Segment padded='very'>
        {this.props.achievement.achievementItem}
      </Segment>
    );
  }
}
