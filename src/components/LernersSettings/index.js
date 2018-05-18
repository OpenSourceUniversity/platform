import React from 'react';
import { Form, Button, Checkbox, Header, Divider } from 'semantic-ui-react';
import StaticData from '../../data/staticdata';

export default class LernersSettings extends React.Component {
  render() {
    const skills = [
      { key: 'angular', text: 'Angular', value: 'angular' },
      { key: 'css', text: 'CSS', value: 'css' },
      { key: 'design', text: 'Graphic Design', value: 'design' },
      { key: 'ember', text: 'Ember', value: 'ember' },
      { key: 'html', text: 'HTML', value: 'html' },
      { key: 'ia', text: 'Information Architecture', value: 'ia' },
      { key: 'javascript', text: 'Javascript', value: 'javascript' },
      { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
      { key: 'meteor', text: 'Meteor', value: 'meteor' },
      { key: 'node', text: 'NodeJS', value: 'node' },
      { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
      { key: 'python', text: 'Python', value: 'python' },
      { key: 'rails', text: 'Rails', value: 'rails' },
      { key: 'react', text: 'React', value: 'react' },
      { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
      { key: 'ruby', text: 'Ruby', value: 'ruby' },
      { key: 'ui', text: 'UI Design', value: 'ui' },
      { key: 'ux', text: 'User Experience', value: 'ux' },
    ];

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
          <Form.Dropdown label="Skills" placeholder="Select Skills" fluid multiple search selection options={skills} />
          <Form.TextArea label="About" placeholder="Tell us more about you..." />
          <Checkbox label="Make my profile paid" toggle defaultChecked />
        </Form>
        <Divider hidden />
        <Button>Connect LincedIn</Button>
        <Button>Connect GitHub</Button>
        <Header>
          Contact Information
        </Header>
        <Divider clearing />
        <Form>
          <Form.Field disabled label="Email" control="input" type="email" defaultValue="Email@gmail.com" style={{ opacity: 1, color: 'black' }} className="disabled-email" />
          <Form.Field label="Phone number" autoComplete="tel" control="input" type="tel" placeholder="Phone number" />
          <Form.Dropdown placeholder="Select Country" label="Country" fluid search selection options={StaticData.Countries} />
          <Divider hidden />
          <Button type="submit">Save Profile Settings</Button>
        </Form>
      </div>
    );
  }
}
