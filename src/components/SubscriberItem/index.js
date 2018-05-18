import React from 'react';
import { Label, Image } from 'semantic-ui-react';


export default class SubscriberItem extends React.Component {
  render() {
    return (
      <Label as="a" href={this.props.subs.account_link}><Image className="circular" src={this.props.subs.profile_img} /></Label>
    );
  }
}
