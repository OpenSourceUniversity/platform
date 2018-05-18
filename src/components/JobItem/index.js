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
    /* eslint-disable global-require */

    const profile = require('../../icons/account_profile.svg');

    /* eslint-enable global-require */

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header icon="ellipsis vertical">{this.props.job.title}</Card.Header>
          <Icon name="signal" /> {this.props.job.level}
          <Icon name="world" /> {this.props.job.location}
          <Icon name="time" /> {this.props.job.duration}
          <Icon name="star" /> {this.props.job.rating}
        </Card.Content>
        <Card.Content extra>
          { this.props.job.description }
        </Card.Content>
        <Card.Content extra>
          <Button name="job-page" onClick={this.handleItemClick}> Show job&apos;s details </Button>
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
