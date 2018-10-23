import React from 'react';
import { Button, Container, Feed, Dropdown, Image, Label, Responsive } from 'semantic-ui-react';
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
          <Image style={{ borderRadius: 0 }} src={getIcon()} alt="" />
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
        <Label
          style={{
            padding: '0.3em 0.78571429em',
            top: '18px',
            left: '70%',
            backgroundColor: '#f16722',
            color: '#fff',
            display: this.props.unreadNotificationsCount === 0 ? 'none' : null,
          }}
          size="mini"
          floating
        >
          { this.props.unreadNotificationsCount }
        </Label>
      </span>
    );

    const notificationsMobileTrigger = (
      <span>
        <Image
          style={{ cursor: 'pointer' }}
          className="notifications icon"
          src={notifications}
          label={{
            floating: true,
            size: 'mini',
            content: this.props.unreadNotificationsCount,
            style: {
              top: '-10px',
              left: '105%',
              color: '#fff',
              padding: '0.3em 0.78571429em',
              backgroundColor: '#f16722',
              display: this.props.unreadNotificationsCount === 0 ? 'none' : null,
            },
          }}
        />
      </span>
    );

    return (
      <div>
        <Responsive
          as={Dropdown}
          {...Responsive.onlyComputer}
          style={{ paddingTop: '29px', paddingBottom: '28px' }}
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
        </Responsive>
        <Responsive
          as={Dropdown}
          {...Responsive.onlyTablet}
          style={{ paddingTop: '29px', paddingBottom: '28px' }}
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
              onClick={this.props.handleSidebarHide}
              style={{
                textAlign: 'center',
                margin: '0 auto',
                width: '100%',
              }}
            >
              All Notifications
            </Button>
          </Dropdown.Menu>
        </Responsive>
        <Responsive
          as={Dropdown}
          {...Responsive.onlyMobile}
          style={{ paddingTop: '25px', paddingBottom: '24px', position: 'static' }}
          item
          trigger={notificationsMobileTrigger}
          pointing="top right"
          icon={null}
        >
          <Dropdown.Menu style={{ width: '100vw' }} className="mobile-notification-menu">
            <Container
              onScroll={this.notificationsScroll}
              className="mobile-notification"
              style={{
                maxHeight: '400px',
                overflowY: 'scroll',
                overflowX: 'none',
                width: '400px',
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
              onClick={this.props.handleSidebarHide}
              style={{
                textAlign: 'center',
                margin: '0 auto',
                width: '100%',
              }}
            >
              All Notifications
            </Button>
          </Dropdown.Menu>
        </Responsive>
      </div>
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
