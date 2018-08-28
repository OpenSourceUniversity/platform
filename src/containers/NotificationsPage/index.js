import React from 'react';
import { Dimmer, Header, Container, Button, Icon, Loader, Feed, Segment, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store from '../../store';
import NotificationSummaryComponent from '../../components/NotificationSummaryComponent';
import toggleNotificationUnread from '../../util/notification/toggleNotificationUnread';
import fetchNotifications from '../../util/notification/fetchNotifications';

class NotificationItem extends Card {
  notificationClick = (event, component) => {
    event.preventDefault();
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
        <Feed.Content>
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
