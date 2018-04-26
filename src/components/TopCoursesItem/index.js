import React from 'react';
import { Card, Image } from 'semantic-ui-react';


export default class TopCoursesItem extends React.Component {
  render() {
    let profile = require('../../icons/account_profile.svg');
    let link = '#'
    return (
      <a href={link}>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {this.props.course.title}
            </Card.Header>
            <img src={profile} />{this.props.course.description}
          </Card.Content>
        </Card>
      </a>
    );
  }
}