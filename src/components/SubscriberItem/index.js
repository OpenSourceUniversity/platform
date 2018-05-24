import React from 'react';
import { Label, Image } from 'semantic-ui-react';


export default class SubscriberItem extends React.Component {
  render() {
    return (
      <Label as="a" size="big" style={{ padding: 0, marginRight: '-0.7em', background: 'transparent' }} href={this.props.subs.account_link}><Image style={{ border: '2px', borderStyle: 'solid', borderColor: 'orange' }} className="circular" src={this.props.subs.profile_img} /></Label>
    );
  }
}
