import React from 'react';
import { Feed, Dropdown, Image, Label, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import fetchNotifications from '../../util/notification/fetchNotifications';


class NotificationItem extends Dropdown.Item {

  render() {
    const { notification } = this.props;
    let summary = '';
    const target = notification.target_content_type_name;
    const actor = notification.actor_content_type_name;
    const actorName = notification.actor_name;
    const actionObject = notification.action_object_content_type_name;
    const { verb } = notification;
    const { timesince } = notification;

    if (target) {
      if (actionObject) {
        summary = `${actorName} ${verb} ${actionObject} on ${target}`;
      } else {
        summary = `${actorName} ${verb} ${target}`;
      }
    } else if (actionObject) {
      summary = `${actorName} ${verb} ${actionObject}`;
    } else {
      summary = `${actorName} ${verb}`;
    }

    return (
      <Feed.Event style={{ width: 500, padding: '15px', borderBottom: '1px solid #ccc' }}>
        <Feed.Label>
          <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            {summary}
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Date>{timesince} ago</Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}


class NotificationsComponent extends Dropdown {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    /* eslint-disable global-require */
    const notifications = require('../../icons/nav_notifications.svg');
    /* eslint-enable global-require */

    const notificationsTrigger = (
      <span>
        <Image style={{ cursor: 'pointer' }} className="notifications icon" src={notifications} />
        <Label style={{ top: -18, display: this.props.unreadNotificationsCount === 0 ? 'none' : 'block' }} color="red" size="mini" floating>
          { this.props.unreadNotificationsCount }
        </Label>
      </span>
    );

    return (
      <Dropdown
        style={{ padding: 0 }}
        item
        trigger={notificationsTrigger}
        pointing="top right"
        icon={null}
      >
        <Dropdown.Menu style={{ maxHeight: '400px', overflowY: 'scroll', overflowX: 'none' }}>
          <Feed>
            {this.renderNotificationItems()}
          </Feed>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderNotificationItems() {
    return (
      this.props.notifications.map((notification, index) => (
        <NotificationItem notification={notification} key={index} />
      ))
    );
  }
}


function mapStateToProps(state) {
  return {
    notifications: state.notification.notifications,
    unreadNotificationsCount: state.notification.unreadNotificationsCount,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchNotifications() {
      dispatch(fetchNotifications());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationsComponent));
