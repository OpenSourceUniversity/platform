import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Button, Image } from 'semantic-ui-react';


class JobItemWithoutRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  renderRating(ratingNumb) {
    return (
      <div className="ui accurate star widget inline" style={{ marginRight: '10px' }}>
        <div className="highlight" style={{ width: `${(ratingNumb / 5) * 100}%` }} />
      </div>);
  }

  render() {
    /* eslint-disable global-require */

    const profileBusiness = require('../../icons/businesses.svg');

    /* eslint-enable global-require */

    return (
      <Card fluid style={this.props.isNotList ? { height: '400px' } : null} onClick={() => { this.props.history.push(`/job-page/${this.props.job.id}/`); }} >
        <Card.Content extra>
          <Card.Header style={{ color: 'black' }} icon="ellipsis vertical">{this.props.job.title}</Card.Header>
          <span className="course-desc" >
            <Icon name="world" style={{ color: '#c1c1c1' }} className="course-desc" /> {this.props.job.location}
          </span>
          <span className="course-desc" >
            <Icon name="time" style={{ color: '#c1c1c1' }} className="course-desc" /> {this.props.job.hours} h/w
          </span>
        </Card.Content>
        <Card.Content>
          { this.props.job.overview ? `${this.props.job.overview.substr(0, 100)}...` : '-' }
        </Card.Content>
        <Card.Content extra>
          <Button name="job-page" onClick={() => { this.props.history.push(`/job-page/${this.props.job.id}/`); }} >
            Show job&apos;s details
          </Button>
          <span className="course-desc" style={{ float: 'right', color: 'black' }}>
            <Image style={{ width: '25px' }} spaced="right" src={profileBusiness} />
            { this.props.job.company.name ? `${this.props.job.company.name}` : 'deleted' }
          </span>
        </Card.Content>
      </Card>
    );
  }
}

const JobItem = withRouter(JobItemWithoutRouter);

export default JobItem;
