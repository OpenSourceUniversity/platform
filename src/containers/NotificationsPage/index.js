import React from 'react';
import { Dimmer, Header, Container, Button, Icon, Loader, Feed, Segment, Card, Breadcrumb, Divider } from 'semantic-ui-react';
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

    /* eslint-disable global-require */
    const jobRequest = require('../../icons/job-request.svg');
    const jobRejected = require('../../icons/job-rejected.svg');
    const jobApproved = require('../../icons/job-approved.svg');
    const certificateApproved = require('../../icons/certificate-approved.svg');
    const certificateRejected = require('../../icons/certificate-rejected.svg');
    const certificateRequest = require('../../icons/certificate-request.svg');
    /* eslint-enable global-require */

    function getIcon() {
      const actionObjectName = notification.action_object_content_type_name;
      const { verb } = notification;
      switch (actionObjectName) {
      case 'verification':
        return certificateRequest;
      case 'job application':
        if (verb === 'approved') {
          return jobApproved;
        } else if (verb === 'submitted') {
          return jobRequest;
        }
        return jobRejected;
      default:
      }
      const targetName = notification.target_content_type_name;
      switch (targetName) {
      case 'certificate':
        return certificateApproved;
      default:
      }
      if (verb === 'rejected') {
        return certificateRejected;
      }
      return null;
    }

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
          <img style={{ borderRadius: 0 }} src={getIcon()} alt="" />
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
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Notifications</Breadcrumb.Section>
        </Breadcrumb>
        <Divider hidden />
        <Header size="large">
          Notifications
        </Header>
        <Segment>
          <Dimmer active={this.props.isFetching} inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
          <Feed>
            { this.props.notifications.length ?
              this.renderNotificationItems() :
              <div style={{ textAlign: 'center', width: '100%' }}>
                <p style={{ textAlign: 'center' }}>There are no any notifications yet.</p>
              </div>
            }
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
