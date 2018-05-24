import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Button } from 'semantic-ui-react';


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
    const overview_title = this.props.programe.overviewTitle;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header icon="ellipsis vertical">{this.props.programe.title}</Card.Header>
          <Icon name="world" /> {language}
          <Icon name="time" /> {duration}
          <Icon name="star" /> {rating}
          <Icon name="briefcase" /> {description}
        </Card.Content>
        <Card.Content extra>
          { overview_title }
        </Card.Content>
        <Card.Content extra>
          <Button name="program-page" onClick={this.handleItemClick}> Show courses </Button>

        </Card.Content>
      </Card>
    );
  }
}

const ProgramItem = withRouter(StudentProgramItemWithoutRouter);

export default ProgramItem;
