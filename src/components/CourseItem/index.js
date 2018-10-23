import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Button, Image, Label } from 'semantic-ui-react';


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
      <Card
        fluid
        style={(() => {
          let style = {};
          if (this.props.isNotList) {
            style = Object.assign({}, style, { height: '400px' });
          }
          if (this.props.course.is_featured) {
            style = Object.assign({}, style, { border: '1px solid #fbd233', background: '#fffaea' });
          }
          return style;
        })()
        }
        onClick={() => { this.props.history.push(`/course-page/${this.props.course.id}/`); }}
      >
        <Card.Content style={{ paddingTop: 0 }}>
          <img alt="" style={{ marginBottom: '20px', width: '100%' }} src={this.props.isNotList ? this.props.course.imgSrc : null} />
          <Card.Header style={{ color: 'black', marginBottom: '20px' }} icon="ellipsis vertical">{this.props.course.title}</Card.Header>
          { this.props.course.is_featured ?
            <Label size="small" style={{ background: '#fbd233', opacity: '0.8' }} attached="top right">
              FEATURED
            </Label> :
            null
          }
          <span className="course-desc" >
            <Icon name="signal" style={{ color: '#c1c1c1' }} className="course-desc" />
            {this.props.course.industries[0] ? this.props.course.industries[0].name : null}
          </span>
        </Card.Content>
        {this.props.isNotList ?
          (null) :
          (
            <Card.Content extra>
              { this.props.course.description ? `${this.props.course.description.substr(0, 100)}...` : '-'}
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
