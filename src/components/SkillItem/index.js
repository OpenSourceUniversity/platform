import React from 'react';
import { Icon, Label } from 'semantic-ui-react';


 export default class SkillItem extends React.Component {

  render() {
    const color = this.props.skill.check ? 'green' : 'orange';
    return (
      <Label basic={this.props.skill.basic}>
        {this.props.skill.have_icon ?
                    <Icon size='small' name={this.props.skill.check ? 'check' : 'warning sign'} color={color} /> :
                    null
                  }
        {this.props.skill.name}
      </Label>
    );
  }
}
