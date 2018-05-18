import React from 'react';
import { Card } from 'semantic-ui-react';


export default class TopCoursesItem extends React.Component {
  render() {
    /* eslint-disable global-require */
    const profile = require('../../icons/account_profile.svg');
    /* eslint-enable global-require */
    const link = '#';
    return (
      <a href={link}>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {this.props.course.title}
            </Card.Header>
            <img alt="" src={profile} />{this.props.course.description}
          </Card.Content>
        </Card>
      </a>
    );
  }
}
