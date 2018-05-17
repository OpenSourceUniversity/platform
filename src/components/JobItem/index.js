import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Button, Label, Image } from 'semantic-ui-react';


class JobItemWithoutRouter extends React.Component {
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
    const level = this.props.job.level;
    const location = this.props.job.location;
    const duration = this.props.job.duration;
    const rating = this.props.job.rating;
    const description = this.props.job.description;
    const profile = require('../../icons/account_profile.svg');
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header icon="ellipsis vertical">{this.props.job.title}</Card.Header>
          <Icon name="signal" /> {level}
          <Icon name="world" /> {location}
          <Icon name="time" /> {duration}
          <Icon name="star" /> {rating}
        </Card.Content>
        <Card.Content extra>
          { description }
        </Card.Content>
        <Card.Content extra>
          <Button name="job-page" onClick={this.handleItemClick}> Show job's details </Button>
          <Label as="a">
            <Image avatar spaced="right" src={profile} />
            Title
          </Label>
        </Card.Content>
      </Card>
    );
  }
}

const JobItem = withRouter(JobItemWithoutRouter);

export default JobItem;
