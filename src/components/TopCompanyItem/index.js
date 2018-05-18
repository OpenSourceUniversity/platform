import React from 'react';
import { Card } from 'semantic-ui-react';


export default class TopCompanyItem extends React.Component {
  render() {
    /* eslint-disable global-require */
    const profile = require('../../icons/account_profile.svg');
    /* eslint-enable global-require */
    const link = '#';
    return (
      <a href={link}>
        <Card fluid>
          <Card.Content>
            <Card.Header icon="ellipsis vertical">
              <img alt="" src={profile} />{this.props.companies.title}
            </Card.Header>
          </Card.Content>
        </Card>
      </a>
    );
  }
}
