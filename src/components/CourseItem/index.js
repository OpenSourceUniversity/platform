import React from 'react';
import { Divider, Card, Icon } from 'semantic-ui-react';


export default class CourseItem extends React.Component {
  render() {
    const color = this.props.certificate.verified ? 'green' : 'yellow';
    return (
      <Card color={color}>
        <Card.Content>
          <Card.Header>{this.props.certificate.title}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Icon name={this.props.certificate.verified ? 'check' : 'close'} color={color} />
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
