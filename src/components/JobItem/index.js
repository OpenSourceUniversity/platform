import React from 'react';
import { Card, Icon, Button, Label, Image } from 'semantic-ui-react';


export default class JobItem extends React.Component {
  render() {
    const level = this.props.job.level;
    const location = this.props.job.location;
    const duration = this.props.job.duration;
    const rating = this.props.job.rating;
    const description = this.props.job.description;
    let profile = require('../../icons/account_profile.svg');
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header icon='ellipsis vertical'>{this.props.job.title}</Card.Header>
          <Icon name='signal' /> {level}
          <Icon name='world' /> {location}
          <Icon name='time' /> {duration}
          <Icon name='star' /> {rating}
        </Card.Content>
        <Card.Content extra>
          { description }
        </Card.Content>
        <Card.Content extra>
          <Button> Show job's details </Button>
          <Label as='a'>
            <Image avatar spaced='right' src={profile} />
            Title
          </Label>
        </Card.Content>
      </Card>
    );
  }
}
