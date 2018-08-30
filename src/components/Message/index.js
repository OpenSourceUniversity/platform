import React from 'react';
import { Card, Image } from 'semantic-ui-react';


export default class Message extends React.Component {
  render() {
    return (
      <div style={this.props.opponent ? { textAlign: 'left' } : { textAlign: 'right' }} >
        {this.props.opponent ?
          <Image style={{ display: 'inline-flex' }} avatar src={`https://ipfs.io/ipfs/${this.props.opponent.learner_avatar}`} /> :
          null
        }
        <Card style={{ display: 'inline-flex', whiteSpace: 'pre-line' }}>
          {this.props.message.text}
        </Card>
      </div>
    );
  }
}
