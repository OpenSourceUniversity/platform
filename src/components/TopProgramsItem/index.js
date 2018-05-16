import React from 'react';
import { Card, Image } from 'semantic-ui-react';


export default class TopProgramsItem extends React.Component {
  render() {
    let profile = require('../../icons/account_profile.svg');
    let link = '#'
    return (
      <a href={link}>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {this.props.program.title}
            </Card.Header>
            <img src={profile} />{this.props.program.description}
          </Card.Content>
        </Card>
      </a>
    );
  }
}
