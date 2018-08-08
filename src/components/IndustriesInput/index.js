import React from 'react';
import { Form } from 'semantic-ui-react';
import Config from '../../config';
import Industries from '../../data/industryList';

export default class IndustriesInput extends React.Component {
  state = { options: [], currentValue: [] }

  componentDidMount() {
    const { bdnUrl } = Config.network; 
    fetch(`${bdnUrl}api/v1/industries/`)
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          return;
        }
        const industries = body.map(industry => ({ value: industry.name, text: industry.name }));
        this.setState({
          options: industries,
        });
      });
  }

  handleChange = (e, { value }) => {
    this.setState({
      currentValue: value,
    });
  }

  render() {
    const { currentValue } = this.state;

    const dropdown = (
      <Form.Dropdown
        options={this.state.options}
        value={currentValue}
        placeholder="Choose industries"
        label="Industries"
        fluid
        search
        selection
        multiple
        defaultValue={this.props.defaultValue}
        onChange={this.handleChange}
        required
      />
   );
   return dropdown;
  }
}