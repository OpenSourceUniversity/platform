import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import Config from '../../config';
import arrayUnique from '../../util/arrayUnique';


export default class SkillsInput extends Component {
  state = { options: [], currentValue: [], searchValue: '' }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.skills !== this.props.skills) {
      const needle = this.props.skills;
      const skills = [];
      if (!needle) {
        return null;
      }
      for (let i = 0; i < needle.length; i += 1) {
        skills.push(needle[i].name);
      }
      const normalizedSkillValue = skills.map(value => (
          { value, text: value }
        ));
      this.setState({
        currentValue: skills,
        options: normalizedSkillValue,
      });
    }
  }

  handleAddition = (e, { value }) => {
    this.setState({
      currentValue: arrayUnique(this.state.currentValue.concat(value)),
    });
  }

  handleChange = (event, { value }) => {
    const normalizedCurrentValue = value.map(v => (
      { value: v, text: v }
    ));
    this.setState({
      currentValue: value,
      options: normalizedCurrentValue,
    });
    this.setState({searchValue: ''})
  }

  handleSearchChange = (event) => {
    this.setState({searchValue: event.target.value})
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
        placeholder="Choose skills"
        label="Skills"
        search
        searchQuery={this.state.searchValue}
        selection
        fluid
        multiple
        allowAdditions
        required
        value={currentValue}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
      />
    );
    return dropdown;
  }
}
