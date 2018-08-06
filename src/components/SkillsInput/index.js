import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import Config from '../../config';
import arrayUnique from '../../util/arrayUnique';


export default class SkillsInput extends Component {
  state = { options: [], currentValue: [] }

  handleAddition = (e, { value }) => {
    this.setState({
      currentValue: arrayUnique(this.state.currentValue.concat(value)),
    });
  }

  handleChange = (e, { value }) => {
    const normalizedCurrentValue = value.map(v => (
      { value: v, text: v }
    ));
    this.setState({
      currentValue: value,
      options: normalizedCurrentValue,
    });
  }

  handleSearchChange = (event) => {
    const query = event.target.value;
    const { bdnUrl } = Config.network;
    fetch(`${bdnUrl}api/v1/skills/autocomplete/?q=${query}`)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          return;
        }
        const skills = body.map(skill => ({ value: skill.name, text: skill.name }));
        const normalizedCurrentValue = this.state.currentValue.map(value => (
          { value, text: value }
        ));
        this.setState({
          options: arrayUnique(normalizedCurrentValue.concat(skills)),
        });
      });
  }

  render() {
    const { currentValue } = this.state;

    const dropdown = (
      <Form.Dropdown
        options={this.state.options}
        placeholder="Choose Skills"
        search
        selection
        fluid
        multiple
        allowAdditions
        value={currentValue}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
      />
    );
    return dropdown;
  }
}
