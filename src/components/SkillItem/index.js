import React from 'react';
import { Icon, Label } from 'semantic-ui-react';


 export default class SkillItem extends React.Component {

  render() {
    const color = this.props.skill.check ? 'green' : 'orange';
    return (
      <Label basic={this.props.skill.basic}>
        
                    <Icon size='small' name={this.props.skill.check ? 'check' : 'warning sign'} color={color} />
        {this.props.skill.name}
      </Label>
    );
  }
}
