import React from 'react';
import { Card, Icon } from 'semantic-ui-react';


export default class CourseItem extends React.Component {
  render() {
    const color = this.props.certificate.verified ? 'green' : 'yellow';
    return (
      <Card fluid color={color}>
        <Card.Content>
          <Card.Header>{this.props.certificate.title}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Icon name={this.props.certificate.verified ? 'check' : 'warning sign'} color={color} />
          { this.props.certificate.verified ? 'Verified' : 'Not verified' }
        </Card.Content>
        <Card.Content extra>
          <Icon name="graduation" color={color} />
          { this.props.certificate.grade }%
        </Card.Content>
      </Card>
    );
  }
}
