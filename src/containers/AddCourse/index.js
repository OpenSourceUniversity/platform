import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Button, Message, Divider, Breadcrumb, Form, Input, Grid, TextArea, Loader, Dimmer } from 'semantic-ui-react';
import SkillsInput from '../../components/SkillsInput';
import IndustriesInput from '../../components/IndustriesInput';
import { addCourse, getDefaultValues, editCourse, resetAddCourseProps } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';


class AddCourse extends React.Component {
  state = {}

  componentDidMount() {
    this.props.setSecondaryNav('academia');
    if (this.props.match.params.id) {
      this.props.getDefaultValues(this.props.match.params.id);
    } else {
      this.props.resetAddCourseProps();
    }
    document.title = 'Add Course';
  }

  componentDidUpdate(prevProps) {
    /* eslint-disable react/no-did-update-set-state */
    if (prevProps.courseDefault !== this.props.courseDefault) {
      if (this.props.courseDefault.title) {
        this.setState({ title: this.props.courseDefault.title });
      }
      if (this.props.courseDefault.description) {
        this.setState({ description: this.props.courseDefault.description });
      }
      if (this.props.courseDefault.external_link) {
        this.setState({ external_link: this.props.courseDefault.external_link });
      }
    }
  }

  handleSubmit(event, component) {
    event.preventDefault();
    const industries = this.industriesRef.state.currentValue;
    const skills = this.skillsRef.state.currentValue;
    let externalLink = event.target.elements.external_link.value;
    if (!!externalLink && externalLink.indexOf('http') !== 0) {
      externalLink = `http://${externalLink}`;
    }
    const courseData = {
      title: event.target.elements.title.value,
      program_title: event.target.elements.program_title.value,
      tutor: event.target.elements.tutor.value,
      description: event.target.elements.description.value,
      external_link: externalLink,
      industries,
      skills,
    };
    if (event.target.elements.duration.value) {
      courseData.duration = event.target.elements.duration.value;
    }
    if (component.props.match.params.id) {
      component.props.editCourse(component.props.match.params.id, courseData);
    } else {
      component.props.addCourse(courseData);
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  validation = () => !this.state.title
        || !this.state.description || !this.state.external_link
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
          <Breadcrumb.Section href="/#/academies">Academies</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Add Course</Breadcrumb.Section>
        </Breadcrumb>

        <Divider hidden />

        <Message success hidden={!this.props.isAdded}>
          <p>Course {this.props.match.params.id ? 'edited' : 'added'} successfully.</p>
        </Message>

        <Message error hidden={!this.props.error}>
          <p>{this.props.error}</p>
        </Message>

        <Header size="large" floated="left">
          Add Course
        </Header>
        <Divider clearing />

        <Grid style={{ display: this.props.isAdded ? 'none' : 'block' }}>
          <Grid.Column width={10}>
            <Dimmer className="belowNavBar" active={this.props.isAdding} inverted>
              <Loader size="medium">
                <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                  <image href={loader} x="0" y="0" width="100%" height="100%" />
                </svg>
                Adding course...
              </Loader>
            </Dimmer>
            <Form size="large" onSubmit={(event) => { this.handleSubmit(event, this); }}>
              <Form.Field required>
                <label htmlFor="title">
                  Course title
                </label>
                <Input
                  id="title"
                  name="title"
                  maxLength={130}
                  iconPosition="left"
                  icon="tag"
                  placeholder="Course name"
                  onChange={this.handleChange}
                  key={`title:${this.props.courseDefault.title || ''}`}
                  defaultValue={this.props.courseDefault.title ? this.props.courseDefault.title : ''}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="program_title">
                  Program title (if any)
                </label>
                <Input
                  id="program_title"
                  name="program_title"
                  maxLength={130}
                  iconPosition="left"
                  icon="list"
                  placeholder="Name of program"
                  key={`title:${this.props.courseDefault.program_title || ''}`}
                  defaultValue={this.props.courseDefault.program_title ? this.props.courseDefault.program_title : ''}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="tutor">
                  Tutor
                </label>
                <Input
                  id="tutor"
                  name="tutor"
                  maxLength={270}
                  iconPosition="left"
                  icon="tag"
                  placeholder="Course tutor"
                  key={`tutor:${this.props.courseDefault.tutor || ''}`}
                  defaultValue={this.props.courseDefault.tutor ? this.props.courseDefault.tutor : ''}
                />
              </Form.Field>
              <IndustriesInput
                ref={(arg) => { this.industriesRef = arg; }}
                industries={this.props.courseDefault.industries}
              />
              <SkillsInput
                ref={(arg) => { this.skillsRef = arg; }}
                skills={this.props.courseDefault.skills}
              />
              <Form.Field required>
                <label htmlFor="description">
                  Description
                </label>
                <TextArea
                  id="description"
                  name="description"
                  maxLength={5000}
                  placeholder="Full course description"
                  onChange={this.handleChange}
                  key={`description:${this.props.courseDefault.description || ''}`}
                  defaultValue={this.props.courseDefault.description ? this.props.courseDefault.description : ''}
                />
              </Form.Field>
              <Form.Field required>
                <label htmlFor="external_link">
                  Url to your course
                </label>
                <Input
                  id="external_link"
                  name="external_link"
                  label="http://"
                  labelPosition="left"
                  placeholder="Url to your course"
                  onChange={this.handleChange}
                  key={`external_link:${this.props.courseDefault.external_link || ''}`}
                  defaultValue={
                    (() => {
                      if (this.props.courseDefault.external_link) {
                        const url = this.props.courseDefault.external_link;
                        if (url.indexOf('http://') === 0) {
                          return url.slice(7);
                        }
                        if (url.indexOf('https://') === 0) {
                          return url.slice(8);
                        }
                        return url;
                      }
                      return '';
                    })()
                  }
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="duration">
                  Course duration in hours (if any)
                </label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  iconPosition="left"
                  icon="time"
                  placeholder="Course duration"
                  key={`duration:${this.props.courseDefault.duration || ''}`}
                  defaultValue={this.props.courseDefault.duration ? this.props.courseDefault.duration : ''}
                />
              </Form.Field>
              <Button type="submit" disabled={this.validation()} primary size="huge">Submit</Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={6}>
            <Message positive={!this.props.match.params.id} warning={!!this.props.match.params.id}>
              <Message.Header>
                {this.props.match.params.id ? 'Editing' : 'Adding'} Course
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
    isAdding: state.addCourse.isAdding,
    error: state.addCourse.error,
    isAdded: state.addCourse.isAdded,
    courseDefault: state.addCourse.courseDefault,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    addCourse(courseData) {
      dispatch(addCourse(courseData));
    },
    getDefaultValues(id) {
      dispatch(getDefaultValues(id));
    },
    editCourse(id, courseData) {
      dispatch(editCourse(id, courseData));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    resetAddCourseProps() {
      dispatch(resetAddCourseProps());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
