import React from 'react';
import { Card } from 'semantic-ui-react';


export default class TopCoursesItem extends React.Component {
  render() {
    /* eslint-disable global-require */
    const profile = require('../../icons/account_profile.svg');
    /* eslint-enable global-require */
    const link = '#';
    return (
      <Card fluid as="a" href={link} style={{ color: 'black' }}>
        <Card.Content>
          <Card.Header>
            {this.props.course.title}
          </Card.Header>
          <img alt="" style={{ width: '20px', marginRight: '7px', marginBottom: '3px' }} src={profile} /> <span>{this.props.course.description}</span>
        </Card.Content>
      </Card>
    );
  }
}
