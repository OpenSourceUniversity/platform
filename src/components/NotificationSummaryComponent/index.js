import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getProfileTypeName } from '../../util/activeAccount';


class NotificationSummaryComponent extends React.Component {
  actionObject() {
    const { notification } = this.props;
    const actionObjectName = notification.action_object_content_type_name;
    function getActionObjectLink() {
      switch (actionObjectName) {
      case 'verification':
        return `/verifications/${notification.action_object_object_id}/`;
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
        >
          {actionObjectName}
        </Link>
      );
    }
    return null;
  }

  render() {
    const { notification } = this.props;
    const target = notification.target_content_type_name;
    const actorName = notification.actor_name;
    const actionObject = this.actionObject();
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
        summary = (<span>{actor} {verb} {target}</span>);
      }
    } else if (actionObject) {
      summary = (<span>{actor} {verb} {actionObject}</span>);
    } else {
      summary = (<span>{actor} {verb}</span>);
    }
    return summary;
  }
}


export default withRouter(NotificationSummaryComponent);
