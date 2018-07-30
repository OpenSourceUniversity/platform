import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Segment, Button, Message, Divider, Breadcrumb, Form, Input, Dimmer, Loader, Grid, TextArea } from 'semantic-ui-react';
import { addJobPosition } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import Industries from '../../data/industryList';
import Skills from '../../data/skillsList';


class AddJobPosition extends React.Component {

   handleSubmit(event, component) {
    event.preventDefault();
    const categories = [];
    const skills = [];
    for (let i = 0; i < (event.target.elements[7].parentElement.childElementCount - 5); i += 1) {
      categories.push(event.target.elements[7].parentElement.children[i].textContent);
    }

    for (let i = 0; i < (event.target.elements[4].parentElement.childElementCount - 5); i += 1) {
      skills.push(event.target.elements[4].parentElement.children[i].textContent);
    }
    const jobData = {
      title: event.target.elements.title.value,
      location: event.target.elements.location.value,
      salary: event.target.elements.salary.value,
      overview: event.target.elements.overview.value,
      description: event.target.elements.description.value,
      external_link: event.target.elements.external_link.value,
      categories,
      skills,
      closes: event.target.elements.closes.value,
      experience: event.target.elements.experience.value,
      hours: event.target.elements.hours.value,
      job_type: event.target.elements.job_type.value,
      languages: event.target.elements.languages.value.split(","),
    };
    component.props.addJobPosition(jobData);
  }

  render() {
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section href="/#/business">Business</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Add Position</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size="large" floated="left">
          Add Position
        </Header>
        <Divider clearing />

        <Grid>
          <Grid.Column width={10}>
            <Form size="huge" onSubmit={(event) => { this.handleSubmit(event, this); }}>
              <Form.Field>
                <label htmlFor="title">
                  Position name
                  <Input
                    id="title"
                    name="title"
                    iconPosition="left"
                    icon="tag"
                    placeholder="Position name"
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
                    icon="tag"
                    placeholder="Location"
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
                    icon="tag"
                    placeholder="Salary with currency"
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="overview">
                  Overview
                  <TextArea
                    id="overview"
                    name="overview"
                    placeholder="Short position overview"
                  />
                </label>
              </Form.Field>
              <Form.Dropdown
                id="skills"
                name="skills"
                placeholder="Required skills"
                label="Skills"
                fluid
                search
                multiple
                options={Skills.Skills}
              />
              <Form.Field>
                <label htmlFor="description">
                  Description
                  <TextArea
                    id="description"
                    name="description"
                    placeholder="Full position description"
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="external_link">
                  Url to your position
                  <Input
                    id="external_link"
                    name="external_link"
                    iconPosition="left"
                    icon="tag"
                    placeholder="Url to your position"
                    type="url"
                  />
                </label>
              </Form.Field>
              <Form.Dropdown
                id="industries"
                name="industries"
                placeholder="Your job position industries"
                label="Job industries"
                fluid
                search
                multiple
                options={Industries.Industries}
              />
              <Form.Field>
                <label htmlFor="closes">
                  Offer closes
                  <Input
                    id="closes"
                    name="closes"
                    iconPosition="left"
                    icon="tag"
                    placeholder="Offer closes"
                    type="date"
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="experience">
                  Required experience
                  <Input
                    id="experience"
                    name="experience"
                    iconPosition="left"
                    icon="tag"
                    placeholder="Required experience"
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="hours">
                  Working hours
                  <Input
                    id="hours"
                    name="hours"
                    iconPosition="left"
                    icon="tag"
                    placeholder="Working hours"
                    type="number"
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="job_type">
                  Job type
                  <Input
                    id="job_type"
                    name="job_type"
                    iconPosition="left"
                    icon="tag"
                    placeholder="Contract type"
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="languages">
                  Languages
                  <Input
                    id="languages"
                    name="languages"
                    iconPosition="left"
                    icon="tag"
                    placeholder="Languages"
                  />
                </label>
              </Form.Field>
              <Button type="submit" size="huge">Submit</Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={6}>
            <Message positive>
              <Message.Header>
                  Adding Position
              </Message.Header>
            </Message>
          </Grid.Column>
        </Grid>

      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAdding: state.addJob.isAdding,
    error: state.addJob.error,
    isAdded: state.addJob.isAdded,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    addJobPosition(jobData) {
      dispatch(addJobPosition(jobData));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddJobPosition);