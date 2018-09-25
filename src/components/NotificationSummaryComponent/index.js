import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getProfileTypeName, setActiveAccount } from '../../util/activeAccount';


class NotificationSummaryComponent extends React.Component {
  setActiveProfileClick = (recipientProfileType) => {
    switch (recipientProfileType) {
    case 1:
      this.props.setActiveAccount('Learner');
      return null;
    case 2:
      this.props.setActiveAccount('Academy');
      return null;
    case 3:
      this.props.setActiveAccount('Business');
      return null;
    default:
      return null;
    }
  };

  actionObject(notification) {
    const actionObjectName = notification.action_object_content_type_name;
    const recipientProfileType = notification.recipient_active_profile_type;
    function getActionObjectLink() {
      switch (actionObjectName) {
      case 'verification':
        return recipientProfileType === 2 ?
          `/verifications/academy/${notification.action_object_object_id}/` :
          `/verifications/business/${notification.action_object_object_id}/`;
      case 'job application':
        return '/job-applications/';
      default:
        return null;
      }
    }
    if (actionObjectName) {
      const actionObjectUrl = getActionObjectLink();
      if (!actionObjectUrl) {
        return (<span>{actionObjectName}</span>);
      }
      return (
        <Link
          href={actionObjectUrl}
          to={actionObjectUrl}
          onClick={() => { this.setActiveProfileClick(recipientProfileType); }}
        >
          {actionObjectName}
        </Link>
      );
    }
    return null;
  }

  target(notification) {
    const targetName = notification.target_content_type_name;
    const recipientProfileType = notification.recipient_active_profile_type;
    function getTargetLink() {
      switch (targetName) {
      case 'certificate':
        return `/certificate/${notification.target_object_id}/`;
      default:
        return null;
      }
    }
    if (targetName) {
      const targetUrl = getTargetLink();
      if (!targetUrl) {
        return (<span>{targetName}</span>);
      }
      return (
        <Link
          href={targetUrl}
          to={targetUrl}
          onClick={() => { this.setActiveProfileClick(recipientProfileType); }}
        >
          {targetName}
        </Link>
      );
    }
    return null;
  }

  render() {
    const { notification } = this.props;
    const target = this.target(notification);
    const actorName = notification.actor_name;
    const actionObject = this.actionObject(notification);
    const { verb } = notification;
    const actorType = getProfileTypeName(notification.actor_active_profile_type).toLowerCase();
    const actorUsername = notification.actor_username;
    const actorUrl = `/view-profile/${actorType}/${actorUsername}/`;
    const actor = (<Link href={actorUrl} to={actorUrl}>{actorName}</Link>);

    let summary;
    if (target) {
      if (actionObject) {
        summary = (<span>{actor} {verb} {actionObject} on {target}</span>);
      } else {
        summary = (<span>{actor} {verb} your {target}</span>);
      }
    } else if (actionObject) {
      summary = (<span>{actor} {verb} {actionObject}</span>);
    } else {
      summary = (<span>{actor} {verb}</span>);
    }
    return summary;
  }
}


function mapStateToProps(state) {
  return {
    activeAccount: state.activeAccount.activeAccount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveAccount(activeAccount) {
      dispatch(setActiveAccount(activeAccount));
    },
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationSummaryComponent));
