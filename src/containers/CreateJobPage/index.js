import React from 'react';
import { Container, Header, Segment, Button, Divider, Form, Input, Breadcrumb } from 'semantic-ui-react';


export default class CreateJobPage extends React.Component {
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
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section href="/#/jobs">Job list</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Add job position</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size="large" floated="left">
          Add job position
        </Header>

        <Divider clearing />

        <Segment>

          <Form size="huge">
            <Form.Field>
              <label htmlFor="jobTitle">
                Job title
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  iconPosition="left"
                  icon="address card outline"
                  placeholder="Job title"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="location">
                Location
                <Input
                  id="location"
                  name="location"
                  iconPosition="left"
                  icon="location arrow"
                  placeholder="Location"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="industry">
                Industry
                <Input
                  id="industry"
                  name="industry"
                  iconPosition="left"
                  icon="industry"
                  placeholder="Industry"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="closes">
                Closes
                <Input
                  id="closes"
                  name="closes"
                  iconPosition="left"
                  icon="delete calendar"
                  placeholder="Closes"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="experience">
                Experience level
                <Input
                  id="experience"
                  name="experience"
                  iconPosition="left"
                  icon="book"
                  placeholder="Experience level"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="hours">
                Hours
                <Input
                  id="hours"
                  name="hours"
                  iconPosition="left"
                  icon="hourglass full"
                  placeholder="Hours"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="type">
                Job type
                <Input
                  id="type"
                  name="type"
                  iconPosition="left"
                  icon="lab"
                  placeholder="Job type"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="language">
                Language
                <Input
                  id="language"
                  name="language"
                  iconPosition="left"
                  icon="world"
                  placeholder="Language"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="salary">
                Salary
                <Input
                  id="salary"
                  name="salary"
                  iconPosition="left"
                  icon="money"
                  placeholder="Salary"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <Form.TextArea label="Overview" placeholder="Overview" />
            </Form.Field>
            <Form.Field>
              <Form.Dropdown label="Skills" placeholder="Select Skills" fluid multiple search selection options={skills} />
            </Form.Field>
            <Form.Field>
              <Form.TextArea label="Job description" placeholder="Job description" />
            </Form.Field>
            <Form.Field>
              <Form.TextArea label="Responsobilities" placeholder="Responsobilities" />
            </Form.Field>
            <Form.Field>
              <Form.TextArea label="Qualifications" placeholder="Qualifications" />
            </Form.Field>
            <Form.Field>
              <Form.TextArea label="We offer" placeholder="We offer" />
            </Form.Field>
            <Button type="submit" primary size="huge">Submit</Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}
