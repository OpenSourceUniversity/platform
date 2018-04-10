import React from 'react';
import { Card, Icon } from 'semantic-ui-react';


export default class CertificateItem extends React.Component {
  render() {
    const color = this.props.certificate.verified ? 'green' : 'yellow';
    return (
      <Card color={color}>
        <Card.Content>
          <Card.Header>{this.props.certificate.name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Icon name={this.props.certificate.verified ? 'check' : 'close'} color={color} />
          { this.props.certificate.verified ? 'Verified' : 'Not verified' }
        </Card.Content>
        <Card.Content extra>
          <Icon name="graduation" color={color} />
          Score:
          { this.props.certificate.score }
        </Card.Content>
      </Card>
    );
  }
}
