import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Button, Label, Image } from 'semantic-ui-react';


class CourseItemWithoutRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  handleItemClick = (e, { name }) => {
    let newPath;
    if (name === 'home') {
      newPath = '/';
    } else {
      newPath = `/${name}`;
    }
    this.props.history.push(newPath);
  }

  render() {
    /* eslint-disable global-require */

    const profile = require('../../icons/account_profile.svg');

    /* eslint-enable global-require */

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header icon="ellipsis vertical">{this.props.certificate.title}</Card.Header>
          <Icon name="signal" /> {this.props.certificate.level}
          <Icon name="world" /> {this.props.certificate.language}
          <Icon name="time" /> {this.props.certificate.duration}
          <Icon name="star" /> {this.props.certificate.rating}
        </Card.Content>
        <Card.Content extra>
          { this.props.certificate.description }
        </Card.Content>
        <Card.Content extra>
          <Button name="course-page" onClick={this.handleItemClick}> Show course </Button>
          <Label as="a">
            <Image avatar spaced="right" src={profile} />
            Title
          </Label>
        </Card.Content>
      </Card>
    );
  }
}

const CourseItem = withRouter(CourseItemWithoutRouter);

export default CourseItem;

