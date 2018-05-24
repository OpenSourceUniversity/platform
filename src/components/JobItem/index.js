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

  renderRating(ratingNumb) {
    return (
      <div className="ui accurate star widget inline" style={{ marginRight: '10px' }}>
        <div className="highlight" style={{ width: `${ratingNumb / 5 * 100}%` }} />
      </div>);
  }

  render() {
    /* eslint-disable global-require */

    const profile = require('../../icons/account_profile.svg');

    /* eslint-enable global-require */

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header style={{ color: 'black' }} icon="ellipsis vertical">{this.props.job.title}</Card.Header>
          <span className="course-desc" >
            <Icon name="signal" style={{ color: '#c1c1c1' }} className="course-desc" /> {this.props.job.level}
          </span>
          <span className="course-desc" >
            <Icon name="world" style={{ color: '#c1c1c1' }} className="course-desc" /> {this.props.job.location}
          </span>
          <span className="course-desc" >
            <Icon name="time" style={{ color: '#c1c1c1' }} className="course-desc" /> {this.props.job.duration}
          </span>
          <span className="course-desc" >
            {this.renderRating(this.props.job.rating)}
          </span>
        </Card.Content>
        <Card.Content extra>
          { this.props.job.description }
        </Card.Content>
        <Card.Content extra>
          <Button name="job-page" onClick={this.handleItemClick}>
            Show job&apos;s details
          </Button>
          <span className="course-desc" style={{ float: 'right', color: 'black' }}>
            <Image style={{ width: '25px' }} spaced="right" src={profile} />
            Lorem ipsum dolor sit
          </span>
        </Card.Content>
      </Card>
    );
  }
}

const JobItem = withRouter(JobItemWithoutRouter);

export default JobItem;
