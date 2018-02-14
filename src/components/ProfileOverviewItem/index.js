import React from 'react';
import {Icon, List} from 'semantic-ui-react';

export default class OverviewItem extends React.Component {
  render() {
    return (
      <List.Item>
        <Icon name='graduation'/>
        <List.Content>
          <List.Header>{this.props.overview.title}</List.Header>
        </List.Content>
      </List.Item>
    );
  }
}
