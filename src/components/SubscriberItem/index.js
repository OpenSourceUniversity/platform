import React from 'react';
import { Label, Image } from 'semantic-ui-react';


export default class SubscriberItem extends React.Component {
  render() {
    const link = this.props.subs.account_link;
    return (
      <Label as="a"><Image className="circular" src={this.props.subs.profile_img} /></Label>
    );
  }
}
