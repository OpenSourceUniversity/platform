import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Button, Image } from 'semantic-ui-react';


class CourseItemWithoutRouter extends React.Component {
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

    const profile = require('../../icons/account_profile.svg');

    /* eslint-enable global-require */

    return (
      <Card fluid style={this.props.isNotList ? { height: '400px' } : null} onClick={() => { this.props.history.push(`/course-page/${this.props.course.id}/`); }}>
        <Card.Content>
          <img alt="" style={{ marginBottom: '20px', width: '100%' }} src={this.props.isNotList ? this.props.course.imgSrc : null} />
          <Card.Header style={{ color: 'black', marginBottom: '20px' }} icon="ellipsis vertical">{this.props.course.title}</Card.Header>
          <span className="course-desc" >
            <Icon name="signal" style={{ color: '#c1c1c1' }} className="course-desc" />
            {this.props.course.categories[0].name}
          </span>
        </Card.Content>
        {this.props.isNotList ?
          (null) :
          (
            <Card.Content extra>
              { this.props.course.description }
            </Card.Content>
          )
        }
        <Card.Content extra>
          <Button name="course-page" onClick={() => { this.props.history.push(`/course-page/${this.props.course.id}/`); }}>
            Show Course
          </Button>
          <span className="course-desc" style={{ float: 'right', color: 'black' }}>
            <Image style={{ width: '25px', borderRadius: '50%', marginTop: '5px' }} spaced="right" src={!this.props.course.avatarSrc ? profile : this.props.course.avatarSrc} />
            <span style={{ top: '3px', position: 'relative' }}>{this.props.course.tutor}</span>
          </span>
        </Card.Content>
      </Card>
    );
  }
}

const CourseItem = withRouter(CourseItemWithoutRouter);

export default CourseItem;
