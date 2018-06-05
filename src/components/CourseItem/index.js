import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Button, Image } from 'semantic-ui-react';


class CourseItemWithoutRouter extends React.Component {
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
        <div className="highlight" style={{ width: `${(ratingNumb / 5) * 100}%` }} />
      </div>);
  }

  render() {
    /* eslint-disable global-require */

    const profile = require('../../icons/account_profile.svg');
    const cardImageSrc = 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/topics/ml/large-icon.png?auto=format%2Ccompress&dpr=1&fit=crop&w=225&h=130';

    /* eslint-enable global-require */

    return (
      <Card fluid>
        <Card.Content>
          <img alt="" src={this.props.certificate.isList ? null : cardImageSrc} />
          <Card.Header style={{ color: 'black' }} icon="ellipsis vertical">{this.props.certificate.title}</Card.Header>
          <span className="course-desc" >
            <Icon name="signal" style={{ color: '#c1c1c1' }} className="course-desc" />
            {this.props.certificate.categories[0].name}
          </span>
          <span className="course-desc" >
            <Icon name="world" style={{ color: '#c1c1c1' }} className="course-desc" /> {this.props.certificate.language}
          </span>
          <span className="course-desc" >
            <Icon name="time" style={{ color: '#c1c1c1' }} className="course-desc" />
            {this.props.certificate.duration}
          </span>
          <span className="course-desc" >
            {this.renderRating(this.props.certificate.rating)}
          </span>
        </Card.Content>
        {this.props.certificate.isList ?
          (<Card.Content extra>
            { this.props.certificate.description }
          </Card.Content>) :
          (null)
        }
        <Card.Content extra>
          <Button name="course-page" onClick={() => { this.props.history.push(`/courses/${this.props.certificate.id}/`); }}>
            Show Course
          </Button>
          <span className="course-desc" style={{ float: 'right', color: 'black' }}>
            <Image style={{ width: '25px' }} spaced="right" src={profile} />
            {this.props.certificate.tutor}
          </span>
        </Card.Content>
      </Card>
    );
  }
}

const CourseItem = withRouter(CourseItemWithoutRouter);

export default CourseItem;
