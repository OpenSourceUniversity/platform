import React from 'react';
import { Dimmer, Header, Container, Button, Icon, Loader, Feed, Segment, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getProfileTypeName } from '../../util/activeAccount';
import fetchNotifications from '../../util/notification/fetchNotifications';

class NotificationItem extends Card {
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
      <Feed.Event onClick={this.notificationClick} style={{ padding: '15px', borderBottom: '1px solid #ccc' }}>
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

class NotificationsPage extends React.Component {
  renderNotificationItems() {
    return (
      this.props.notifications.map((notification, index) => (
        <NotificationItem
          notification={notification}
          key={index}
        />
      ))
    );
  }

  render() {
    return (
      <Container>
        <Header>
          Notifications
        </Header>
        <Segment>
          <Dimmer active={this.props.isFetching} inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
          <Feed>
            {this.renderNotificationItems()}
            <div style={{ display: !this.props.nextUrl ? 'none' : 'block', marginTop: '20px', textAlign: 'center' }}>
              <Button
                onClick={() => { this.props.fetchNotifications(this.props.nextUrl); }}
                icon
                labelPosition="left"
              >
                <Icon
                  name={!this.props.isFetching ? 'arrow down' : 'spinner'}
                  loading={this.props.isFetching}
                />
                Load More
              </Button>
            </div>
          </Feed>
        </Segment>
      </Container>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationsPage));
