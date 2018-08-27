import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class CertificateItemWithoutRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  renderStatus() {
    if (this.props.certificate.is_expired) {
      return 'expired';
    }
    if (this.props.certificate.verifications.length === 0) {
      return 'not verified';
    }
    for (let i = 0; i < this.props.certificate.verifications.length; i += 1) {
      if (this.props.certificate.verifications[i][this.props.certificate.verifications[i].length - 1].state === 'verified') {
        return 'verified';
      }
    }
    return 'revoked';
  }

  render() {
    const status = this.renderStatus();
    function getColor() {
      switch (status) {
      case 'verified':
        return 'green';
      case 'revoked':
        return 'red';
      case 'expired':
        return 'blue';
      default:
        return 'yellow';
      }
    }
    const color = getColor();
    return (
      <Card color={color} onClick={() => { this.props.history.push(`/certificate/${this.props.certificate.id}/`); }}>
        <Card.Content>
          <Card.Header>{this.props.certificate.course_title}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Icon name={status === 'verified' ? 'check' : 'warning sign'} color={color} />
          { capitalizeFirstLetter(status) }
        </Card.Content>
        <Card.Content extra>
          <Icon name="graduation" color={color} />
          Score: { this.props.certificate.score }
        </Card.Content>
      </Card>
    );
  }
}

const CertificateItem = withRouter(CertificateItemWithoutRouter);

export default CertificateItem;
