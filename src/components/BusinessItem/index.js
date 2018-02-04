import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default class BusinessItem extends React.Component {
  render() {
    const color = this.props.position.verified ? 'green' : 'yellow';
    return (
      <Card color={color}>
        <Card.Content>
          <Card.Header>{this.props.position.title}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Icon name={this.props.position.verified ? 'check' : 'close'} color={color} />
          { this.props.position.verified ? 'Open' : 'Closed' }
        </Card.Content>
      </Card>
    );
  }
}
