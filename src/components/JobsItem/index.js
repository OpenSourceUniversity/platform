import React from 'react';
import { Button, Icon, Item, Label, Divider} from 'semantic-ui-react';


export default class JobsItem extends React.Component {
  renderLabels() {
    return this.props.jobs.labels.map((label, index) => {
      return <Label key={index}>{label}</Label>
    });
  }
  render() {
    return (
      <Item>
       <Item.Content>
         <Item.Header as='a'>{this.props.jobs.title}</Item.Header>
         <Item.Meta>
           {this.props.jobs.firm} {this.props.jobs.location}
         </Item.Meta>
         <Item.Description>{this.props.jobs.salary}</Item.Description>
         <Item.Description>{this.props.jobs.description}</Item.Description>
         <Item.Extra>
           <Button primary floated='right'>
             Job details
             <Icon name='right chevron' />
           </Button>
           {this.renderLabels()}
         </Item.Extra>
       </Item.Content>
       <Divider clearing />
     </Item>
    );
  }
}
