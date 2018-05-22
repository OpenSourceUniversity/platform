import React from 'react';
import { Card } from 'semantic-ui-react';


export default class TopJobItem extends React.Component {
  render() {
    /* eslint-disable global-require */
    const profile = require('../../icons/account_profile.svg');
    /* eslint-enable global-require */
    const link = '#';
    return (
      <Card as="a" href={link} fluid style={{'color': 'black'}}>
        <Card.Content>
          <Card.Header>
            {this.props.jobs.title}
          </Card.Header>
          <img alt="" style={{'width': '20px', 'marginRight': '7px', 'marginBottom': '3px'}} src={profile} />{this.props.jobs.description}
        </Card.Content>
      </Card>
    );
  }
}
