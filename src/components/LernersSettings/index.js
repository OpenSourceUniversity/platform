import React from 'react';
import { Form, Button, Header, Divider } from 'semantic-ui-react';
import Countries from '../../data/countriesList';

export default class LernersSettings extends React.Component {
  render() {
    return (
      <div>
        <Header>
          Personal Information
        </Header>
        <Divider clearing />
        <Form>
          <Form.Group widths="equal">
            <Form.Field label="First name" control="input" placeholder="First name" />
            <Form.Field label="Last name" control="input" placeholder="Last name" />
          </Form.Group>
          <Form.TextArea label="About" placeholder="Tell us more about you..." />
          <Divider hidden />
          <Header>
            Contact Information
          </Header>
          <Divider clearing />
          <Form.Field label="Email" control="input" type="email" defaultValue="Email@gmail.com" style={{ opacity: 1, color: 'black' }} className="disabled-email" />
          <Form.Field label="Phone number" autoComplete="tel" control="input" type="tel" placeholder="Phone number" />
          <Form.Dropdown placeholder="Select Country" label="Country" fluid search selection options={Countries.Countries} />
          <Divider hidden />
          <Button primary type="submit">Save Profile Settings</Button>
        </Form>
      </div>
    );
  }
}
