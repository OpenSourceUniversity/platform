import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Button, Image, Label } from 'semantic-ui-react';


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
      <Card
        fluid
        style={(() => {
          let style = {};
          if (this.props.isNotList) {
            style = Object.assign({}, style, { height: '400px' });
          }
          if (this.props.job.is_featured) {
            style = Object.assign({}, style, { border: '1px solid #fbd233', background: '#fffaea' });
          }
          return style;
        })()
        }
        onClick={() => { this.props.history.push(`/job-page/${this.props.job.id}/`); }}
      >
        <Card.Content style={{ paddingTop: 0 }}>
          <img alt="" style={{ marginBottom: '20px', width: '100%' }} src={this.props.isNotList ? this.props.job.imgSrc : null} />
          <Card.Header style={{ color: 'black' }} icon="ellipsis vertical">{this.props.job.title}</Card.Header>
          { this.props.job.is_featured ?
            <Label style={{ background: '#fbd233' }} attached="top right">
              FEATURED
            </Label> :
            null
          }
          <span className="course-desc" >
            <Icon name="signal" style={{ color: '#c1c1c1' }} className="course-desc" />
            {this.props.job.industries[0] ? this.props.job.industries[0].name : null}
          </span>
          <span className="course-desc" >
            <Icon name="time" style={{ color: '#c1c1c1' }} className="course-desc" /> {this.props.job.hours ? this.props.job.hours : '-'} h/w
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
