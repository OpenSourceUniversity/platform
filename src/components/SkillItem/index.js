import React from 'react';
import { Icon, Label } from 'semantic-ui-react';


export default class SkillItem extends React.Component {
  render() {
    const color = this.props.skill.check ? 'green' : 'orange';
    return (
      <Label
        basic={this.props.skill.basic}
        size={this.props.isCertificatePage ? 'huge' : null}
        style={{
          borderRadius: this.props.isCertificatePage ? '100px' : null,
          fontSize: this.props.isCertificatePage ? '1.2em' : null,
          borderWidth: this.props.isCertificatePage ? '2px' : null,
          color: this.props.color,
          borderColor: this.props.color,
        }}
      >
        {this.props.skill.have_icon ?
          <Icon size="small" name={this.props.skill.check ? 'check' : 'warning sign'} color={color} /> :
          null
        }
        {this.props.skill.name}
      </Label>
    );
  }
}
