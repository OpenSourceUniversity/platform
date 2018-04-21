import React from 'react';
import { Card, Image } from 'semantic-ui-react';


export default class TopJobItem extends React.Component {
  render() {
    let profile = require('../../icons/account_profile.svg');
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {this.props.jobs.title}
          </Card.Header>
          <img src={profile} />{this.props.jobs.description}
        </Card.Content>
      </Card>
    );
  }
}