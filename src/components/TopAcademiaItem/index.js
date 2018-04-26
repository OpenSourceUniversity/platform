import React from 'react';
import { Card, Image } from 'semantic-ui-react';


export default class TopAcademiaItem extends React.Component {
  render() {
    let profile = require('../../icons/account_profile.svg');
    let link = '#'
    return (
      <a href={link}>
        <Card fluid>
          <Card.Content>
            <Card.Header icon='ellipsis vertical'>
              <img src={profile} />{this.props.academia.title}
            </Card.Header>
          </Card.Content>
        </Card>
      </a>
    );
  }
}