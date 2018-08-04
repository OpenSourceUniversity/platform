import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Button, Message, Divider, Breadcrumb, Form, Input, Grid, TextArea } from 'semantic-ui-react';
import { addJobPosition, getDefaultValues, editJobPosition } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import Industries from '../../data/industryList';
import Skills from '../../data/skillsList';


class AddJobPosition extends React.Component {
  componentDidMount() {
    this.props.setSecondaryNav('business');
    if (this.props.match.params.id) {
      this.props.getDefaultValues(this.props.match.params.id);
    }
  }

  getSkills(obj) {
    const needle = this.props.jobDefault.skills;
    const skills = [];
    if (!needle) {
      return null;
    }
    for (let i = 0; i < needle.length; i += 1) {
      const result = obj.filter(skill => skill.text.toLowerCase() === needle[i].name);
      if (result.length) {
        skills.push(result[0].value);
      }
    }
    return skills;
  }

  getIndustries(obj) {
    const needle = this.props.jobDefault.categories;
    const categories = [];
    if (!needle) {
      return null;
    }
    for (let i = 0; i < needle.length; i += 1) {
      const result = obj.filter(skill => skill.text === needle[i].name);
      if (result.length) {
        categories.push(result[0].value);
      }
    }
    return categories;
  }

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
      languages: event.target.elements.languages.value.split(','),
    };
    if (component.props.match.params.id) {
      component.props.editJobPosition(component.props.match.params.id, jobData);
    } else {
      component.props.addJobPosition(jobData);
    }
  }
  /* eslint-disable jsx-a11y/label-has-for */
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
                    key={`title:${this.props.jobDefault.title || ''}`}
                    defaultValue={this.props.jobDefault.title ? this.props.jobDefault.title : ''}
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
                    key={`location:${this.props.jobDefault.location || ''}`}
                    defaultValue={this.props.jobDefault.location ? this.props.jobDefault.location : ''}
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
                    key={`salary:${this.props.jobDefault.salary || ''}`}
                    defaultValue={this.props.jobDefault.salary ? this.props.jobDefault.salary : ''}
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
                    key={`overview:${this.props.jobDefault.overview || ''}`}
                    defaultValue={this.props.jobDefault.overview ? this.props.jobDefault.overview : ''}
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
                key={`skills:${this.props.jobDefault.skills || ''}`}
                defaultValue={this.getSkills(Skills.Skills)}
                options={Skills.Skills}
              />
              <Form.Field>
                <label htmlFor="description">
                  Description
                  <TextArea
                    id="description"
                    name="description"
                    placeholder="Full position description"
                    key={`description:${this.props.jobDefault.description || ''}`}
                    defaultValue={this.props.jobDefault.description ? this.props.jobDefault.description : ''}
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
                    key={`external_link:${this.props.jobDefault.external_link || ''}`}
                    defaultValue={this.props.jobDefault.external_link ? this.props.jobDefault.external_link : ''}
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
                key={`categories:${this.props.jobDefault.categories || ''}`}
                defaultValue={this.getIndustries(Industries.Industries)}
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
                    key={`closes:${this.props.jobDefault.closes || ''}`}
                    defaultValue={this.props.jobDefault.closes ? this.props.jobDefault.closes : ''}
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
                    key={`experience:${this.props.jobDefault.experience || ''}`}
                    defaultValue={this.props.jobDefault.experience ? this.props.jobDefault.experience : ''}
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
                    key={`hours:${this.props.jobDefault.hours || ''}`}
                    defaultValue={this.props.jobDefault.hours ? this.props.jobDefault.hours : ''}
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
                    key={`job_type:${this.props.jobDefault.job_type || ''}`}
                    defaultValue={this.props.jobDefault.job_type ? this.props.jobDefault.job_type : ''}
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
                    key={`languages:${this.props.jobDefault.languages || ''}`}
                    defaultValue={this.props.jobDefault.languages ? this.props.jobDefault.languages : ''}
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
    jobDefault: state.addJob.jobDefault,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    addJobPosition(jobData) {
      dispatch(addJobPosition(jobData));
    },
    getDefaultValues(id) {
      dispatch(getDefaultValues(id));
    },
    editJobPosition(id, jobData) {
      dispatch(editJobPosition(id, jobData));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddJobPosition);
