import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Button, Label, Image } from 'semantic-ui-react';


class StudentProgramItemWithoutRouter extends React.Component {

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
    // const level = this.props.certificate.level;
    const language = this.props.programe.language;
    const duration = this.props.programe.duration;
    const rating = this.props.programe.rating;
    const description = this.props.programe.location;
    let profile = require('../../icons/account_profile.svg');
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header icon='ellipsis vertical'>{this.props.programe.title}</Card.Header>
          <Icon name='world' /> {language}
          <Icon name='time' /> {duration}
          <Icon name='star' /> {rating}
        </Card.Content>
        <Card.Content extra>
          { description }
        </Card.Content>
        <Card.Content extra>
          <Button name='courses-page' onClick={this.handleItemClick}> Show courses </Button>
          <Label as='a'>
            <Image avatar spaced='right' src={profile} />
            Title
          </Label>
        </Card.Content>
      </Card>
    );
  }
}

const ProgramItem = withRouter(StudentProgramItemWithoutRouter);

export default ProgramItem;
