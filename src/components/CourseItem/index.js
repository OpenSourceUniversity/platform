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
    const level = this.props.certificate.level;
    const language = this.props.certificate.language;
    const duration = this.props.certificate.duration;
    const rating = this.props.certificate.rating;
    const description = this.props.certificate.description;
    const profile = require('../../icons/account_profile.svg');
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header icon="ellipsis vertical">{this.props.certificate.title}</Card.Header>
          <Icon name="signal" /> {level}
          <Icon name="world" /> {language}
          <Icon name="time" /> {duration}
          <Icon name="star" /> {rating}
        </Card.Content>
        <Card.Content extra>
          { description }
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

