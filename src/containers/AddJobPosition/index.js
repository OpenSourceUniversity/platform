import React from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Header, Button, Message, Divider, Breadcrumb, Form, Input, Grid, TextArea, Dimmer, Loader } from 'semantic-ui-react';
import SkillsInput from 'components/SkillsInput';
import IndustriesInput from 'components/IndustriesInput';
import { getDefaultValues, resetAddJobProps } from './actions';
import addJobPosition from '../../util/job/addJobPosition';
import editJobPosition from '../../util/job/editJobPosition';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';


class AddJobPosition extends React.Component {
  state = {}
  componentDidMount() {
    this.props.setSecondaryNav('business');
    if (this.props.match.params.id) {
      this.props.getDefaultValues(this.props.match.params.id);
    } else {
      this.props.resetAddJobProps();
    }
    document.title = 'Add Job Position';
  }

  componentDidUpdate(prevProps) {
    /* eslint-disable react/no-did-update-set-state */
    if (prevProps.jobDefault !== this.props.jobDefault) {
      if (this.props.jobDefault.title) {
        this.setState({ title: this.props.jobDefault.title });
      }
      if (this.props.jobDefault.location) {
        this.setState({ location: this.props.jobDefault.location });
      }
      if (this.props.jobDefault.overview) {
        this.setState({ overview: this.props.jobDefault.overview });
      }
      if (this.props.jobDefault.description) {
        this.setState({ description: this.props.jobDefault.description });
      }
    }
  }

  handleSubmit(event, component) {
    event.preventDefault();
    const industries = this.industriesRef.state.currentValue;
    const skills = this.skillsRef.state.currentValue;
    const languages = event.target.elements.languages.value.replace(/\s+/g, '');
    const jobData = {
      title: event.target.elements.title.value,
      location: event.target.elements.location.value,
      salary: event.target.elements.salary.value,
      overview: event.target.elements.overview.value,
      description: event.target.elements.description.value,
      industries,
      skills,
      closes: event.target.elements.closes.value,
      experience: event.target.elements.experience.value,
      hours: event.target.elements.hours.value,
      languages: languages.split(/[,\s]/),
    };
    if (component.props.match.params.id) {
      component.props.editJobPosition(component.props.match.params.id, jobData);
    } else {
      component.props.addJobPosition(jobData);
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  validation = () => !this.state.title
        || !this.state.location || !this.state.overview
        || !this.state.description
  /* eslint-disable jsx-a11y/label-has-for */
  render() {
    /* eslint-disable global-require */
    const loader = require('../../icons/osu-loader.svg');
    /* eslint-enable global-require */
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section href="/#/businesses">Business</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Add Position</Breadcrumb.Section>
        </Breadcrumb>

        <Divider hidden />

        <Message success hidden={!this.props.isAdded}>
          <p>Job {this.props.match.params.id ? 'edited' : 'added'} successfully.</p>
        </Message>

        <Message error hidden={!this.props.error}>
          <p>{this.props.error}</p>
        </Message>

        <Header size="large" floated="left">
          Add Position
        </Header>
        <Divider clearing />

        <Grid style={{ display: this.props.isAdded ? 'none' : 'block' }}>
          <Grid.Column width={10}>
            <Segment padded="very">
              <Dimmer className="belowNavBar" active={this.props.isAdding} inverted>
                <Loader size="medium">
                  <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                    <image href={loader} x="0" y="0" width="100%" height="100%" />
                  </svg>
                  Adding job position...
                </Loader>
              </Dimmer>
              <Form size="large" onSubmit={(event) => { this.handleSubmit(event, this); }}>
                <Form.Field required>
                  <label htmlFor="title">
                    Position name
                  </label>
                  <Input
                    id="title"
                    name="title"
                    maxLength={130}
                    iconPosition="left"
                    icon="tag"
                    placeholder="Position name"
                    onChange={this.handleChange}
                    key={`title:${this.props.jobDefault.title || ''}`}
                    defaultValue={this.props.jobDefault.title ? this.props.jobDefault.title : ''}
                  />
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="location">
                    Location
                  </label>
                  <Input
                    id="location"
                    name="location"
                    maxLength={130}
                    iconPosition="left"
                    icon="tag"
                    placeholder="Location"
                    onChange={this.handleChange}
                    key={`location:${this.props.jobDefault.location || ''}`}
                    defaultValue={this.props.jobDefault.location ? this.props.jobDefault.location : ''}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="salary">
                    Salary
                  </label>
                  <Input
                    id="salary"
                    name="salary"
                    maxLength={130}
                    iconPosition="left"
                    icon="tag"
                    placeholder="Salary with currency"
                    key={`salary:${this.props.jobDefault.salary || ''}`}
                    defaultValue={this.props.jobDefault.salary ? this.props.jobDefault.salary : ''}
                  />
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="overview">
                    Overview
                  </label>
                  <TextArea
                    id="overview"
                    name="overview"
                    maxLength={5000}
                    placeholder="Short position overview"
                    onChange={this.handleChange}
                    key={`overview:${this.props.jobDefault.overview || ''}`}
                    defaultValue={this.props.jobDefault.overview ? this.props.jobDefault.overview : ''}
                  />
                </Form.Field>
                <SkillsInput
                  ref={(arg) => { this.skillsRef = arg; }}
                  skills={this.props.jobDefault.skills}
                />
                <Form.Field required>
                  <label htmlFor="description">
                    Description
                  </label>
                  <TextArea
                    id="description"
                    name="description"
                    maxLength={5000}
                    placeholder="Full position description"
                    onChange={this.handleChange}
                    key={`description:${this.props.jobDefault.description || ''}`}
                    defaultValue={this.props.jobDefault.description ? this.props.jobDefault.description : ''}
                  />
                </Form.Field>
                <IndustriesInput
                  ref={(arg) => { this.industriesRef = arg; }}
                  industries={this.props.jobDefault.industries}
                />
                <Form.Field>
                  <label htmlFor="closes">
                    Offer closes
                  </label>
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
                </Form.Field>
                <Form.Field>
                  <label htmlFor="experience">
                    Required experience
                  </label>
                  <Input
                    id="experience"
                    name="experience"
                    maxLength={130}
                    iconPosition="left"
                    icon="tag"
                    placeholder="Required experience"
                    key={`experience:${this.props.jobDefault.experience || ''}`}
                    defaultValue={this.props.jobDefault.experience ? this.props.jobDefault.experience : ''}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="hours">
                    Working hours
                  </label>
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
                </Form.Field>
                <Form.Field>
                  <label htmlFor="languages">
                    Languages
                  </label>
                  <Input
                    id="languages"
                    name="languages"
                    maxLength={130}
                    iconPosition="left"
                    icon="tag"
                    placeholder="Languages"
                    key={`languages:${this.props.jobDefault.languages || ''}`}
                    defaultValue={this.props.jobDefault.languages ? this.props.jobDefault.languages : ''}
                  />
                </Form.Field>
                <Button type="submit" primary disabled={this.validation()} size="huge">Submit</Button>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Message positive={!this.props.match.params.id} warning={!!this.props.match.params.id}>
              <Message.Header>
                {this.props.match.params.id ? 'Editing' : 'Adding'} Job Position
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
    resetAddJobProps() {
      dispatch(resetAddJobProps());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddJobPosition);
