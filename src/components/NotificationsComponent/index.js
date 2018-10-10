import React from 'react';
import { Button, Container, Feed, Dropdown, Image, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import store from '../../store';
import fetchNotifications from '../../util/notification/fetchNotifications';
import toggleNotificationUnread from '../../util/notification/toggleNotificationUnread';
import NotificationSummaryComponent from '../NotificationSummaryComponent';


class NotificationItem extends Dropdown.Item {
  notificationClick = (event, component) => {
    event.preventDefault();
    event.stopPropagation();
    const isLink = !!event.nativeEvent.target.href;
    if ((isLink && this.props.notification.unread) || !isLink) {
      const { id } = component.props.notification;
      store.dispatch(toggleNotificationUnread(id, (error, response) => {
        if (!error) {
          this.props.notification.unread = response.data.new_unread;
        }
      }));
    }
  }

  setTypeHeader(notification) {
    const recipientProfileType = notification.recipient_active_profile_type;
    switch (recipientProfileType) {
    case 1:
      return 'Learner';
    case 2:
      return 'Academy';
    case 3:
      return 'Business';
    default:
      return null;
    }
  }

  render() {
    const { notification } = this.props;
    const backgroundColor = notification.unread ? '#efefef' : 'white';
    const { timesince } = notification;

    return (
      <Feed.Event
        onClick={event => this.notificationClick(event, this)}
        style={{
          padding: '15px',
          borderBottom: '1px solid #ccc',
          backgroundColor,
          cursor: 'pointer',
        }}
      >
        <Feed.Label>
          <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" alt="" />
        </Feed.Label>
        <Feed.Content style={{ marginTop: 0 }} >
          <Feed.Meta style={{ margin: 0 }}>
            {this.setTypeHeader(notification)}
          </Feed.Meta>
          <Feed.Summary>
            <NotificationSummaryComponent notification={notification} />
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
    const shouldScroll = scrollHeight <= (scrollTop + offsetHeight);
    if (shouldScroll && this.props.nextUrl && !this.props.isFetching) {
      this.props.fetchNotifications(this.props.nextUrl);
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
        <Dropdown.Menu>
          <Container
            onScroll={this.notificationsScroll}
            style={{
              maxHeight: '400px', overflowY: 'scroll', overflowX: 'none', width: '400px',
            }}
          >
            <Feed>
              {this.props.notifications.length ?
                this.renderNotificationItems() :
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <p style={{ textAlign: 'center' }}>There are no any notifications yet.</p>
                </div>
              }
              <Feed.Event style={{ display: this.props.isFetching ? 'block' : 'none' }}>
                <Feed.Content style={{ textAlign: 'center' }}>
                  Loading notifications...
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Container>
          <Button
            as={Link}
            to="/notifications/"
            style={{
              textAlign: 'center',
              margin: '0 auto',
              width: '100%',
            }}
          >
            All Notifications
          </Button>
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
    nextUrl: state.notification.nextUrl,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchNotifications(url) {
      dispatch(fetchNotifications(url));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationsComponent));
