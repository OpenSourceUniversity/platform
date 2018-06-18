import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Segment, Button, Divider, Form, Input, Breadcrumb } from 'semantic-ui-react';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';


class CreateCoursePage extends React.Component {
  componentDidMount() {
    this.props.setSecondaryNav('academia');
  }

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
          <Breadcrumb.Section href="/#/courses">Courses</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Add course</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size="large" floated="left">
          Add course
        </Header>

        <Divider clearing />

        <Segment>
          <Form size="huge">
            <Form.Field>
              <label htmlFor="courseName">
                Course name
                <Input
                  id="courseName"
                  name="courseName"
                  iconPosition="left"
                  icon="idea"
                  placeholder="Course name"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="courseDates">
                Course dates
                <Input
                  id="courseDates"
                  name="courseDates"
                  iconPosition="left"
                  icon="calendar"
                  placeholder="Course dates"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="courseDuration">
                Course duration
                <Input
                  id="courseDuration"
                  name="courseDuration"
                  iconPosition="left"
                  icon="clock"
                  placeholder="Course duration"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="courseFee">
                Course fee
                <Input
                  id="courseFee"
                  name="courseFee"
                  iconPosition="left"
                  icon="money"
                  placeholder="Course fee"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="tutor">
                Tutor
                <Input
                  id="tutor"
                  name="tutor"
                  iconPosition="left"
                  icon="user outline"
                  placeholder="Tutor"
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
              <label htmlFor="level">
                Level
                <Input
                  id="level"
                  name="level"
                  iconPosition="left"
                  icon="signal"
                  placeholder="Level"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <Form.TextArea label="Reviews" placeholder="Reviews" />
            </Form.Field>
            <Form.Field>
              <Form.Dropdown label="Skills" placeholder="Select Skills" fluid multiple search selection options={skills} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="price">
                Price
                <Input
                  id="price"
                  name="price"
                  iconPosition="left"
                  icon="money"
                  placeholder="Price"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <Form.TextArea label="About" placeholder="About" />
            </Form.Field>
            <Form.Field>
              <Form.TextArea label="Entry Requirements" placeholder="Entry Requirements" />
            </Form.Field>
            <Form.Field>
              <Form.TextArea label="Reviews" placeholder="Reviews" />
            </Form.Field>
            <Button type="submit" primary size="huge">Submit</Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}

export default connect(mapDispatchToProps)(CreateCoursePage);
