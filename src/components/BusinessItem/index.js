import React from 'react';
import { Card, Icon } from 'semantic-ui-react';


export default class BusinessPeopleItem extends React.Component {
  render() {
    const color = this.props.person.verified ? 'green' : 'yellow';
    return (
      <Card color={color}>
        <Card.Content>
          <Card.Header>{this.props.person.title}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Icon name={this.props.person.verified ? 'check' : 'close'} color={color} />
          { this.props.person.verified ? 'Verified' : 'Not verified' }
        </Card.Content>
        <Card.Content extra>
          <Icon name="graduation" color={color} />
          { this.props.person.grade }%
        </Card.Content>
      </Card>
    );
  }
}
