import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';


class CertificateItemWithoutRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }
  render() {
    const color = this.props.certificate.verified ? 'green' : 'yellow';
    return (
      <Card color={color} onClick={() => { this.props.history.push(`/certificate/${this.props.certificate.id}/`); }}>
        <Card.Content>
          <Card.Header>{this.props.certificate.course_title}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Icon name={this.props.certificate.verified ? 'check' : 'warning sign'} color={color} />
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

const CertificateItem = withRouter(CertificateItemWithoutRouter);

export default CertificateItem;
