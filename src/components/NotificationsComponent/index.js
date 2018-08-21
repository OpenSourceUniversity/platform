import React from 'react';
import { Dropdown, Image, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class NotificationItem extends Dropdown.Item {
  render() {
    return (
      <div>
        asd
      </div>
    );
  }
}


class NotificationsComponent extends Dropdown {
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
          {this.renderNotificationItems()}
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

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationsComponent));
