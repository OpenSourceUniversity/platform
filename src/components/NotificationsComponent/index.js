import React from 'react';
import { Loader, Feed, Dropdown, Image, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getProfileTypeName } from '../../util/activeAccount';
import fetchNotifications from '../../util/notification/fetchNotifications';


class NotificationItem extends Dropdown.Item {
  notificationClick(event) {
    event.preventDefault();
  }

  render() {
    const { notification } = this.props;
    let summary = '';
    const target = notification.target_content_type_name;
    const actorName = notification.actor_name;
    const actionObject = notification.action_object_content_type_name;
    const { verb } = notification;
    const { timesince } = notification;
    const actorType = getProfileTypeName(notification.actor_active_profile_type).toLowerCase();
    const actorUsername = notification.actor_username;
    const actorUrl = `/view-profile/${actorType}/${actorUsername}/`;
    const actor = (<Link href={actorUrl} to={actorUrl}>{actorName}</Link>);

    if (target) {
      if (actionObject) {
        summary = (<span>{actor} {verb} {actionObject} on {target}</span>);
      } else {
        summary = (<span>{actor} {verb} {target}</span>);
      }
    } else if (actionObject) {
      summary = (<span>{actor} {verb} {actionObject}</span>);
    } else {
      summary = (<span>{actor} {verb}</span>);
    }

    return (
      <Feed.Event onClick={this.notificationClick} style={{ width: 400, padding: '15px', borderBottom: '1px solid #ccc' }}>
        <Feed.Label>
          <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" alt="" />
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

  notificationsScroll = (event) => {
    const { scrollHeight, scrollTop, offsetHeight } = event.currentTarget;
    if (scrollHeight <= (scrollTop + offsetHeight)) {
      this.props.fetchNotifications();
    }
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
        <Dropdown.Menu onScroll={this.notificationsScroll} style={{ maxHeight: '400px', overflowY: 'scroll', overflowX: 'none' }}>
          <Feed>
            {this.renderNotificationItems()}
            <Feed.Event style={{ display: this.props.isFetching ? 'block' : 'none' }}>
              <Feed.Content style={{ textAlign: 'center' }}>
                Loading notifications...
              </Feed.Content>
            </Feed.Event>
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
    isFetching: state.notification.isFetching,
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