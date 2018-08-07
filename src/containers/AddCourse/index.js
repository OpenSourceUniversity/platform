import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Button, Message, Divider, Breadcrumb, Form, Input, Grid, TextArea } from 'semantic-ui-react';
import { addCourse, getDefaultValues, editCourse } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import Industries from '../../data/industryList';
import Skills from '../../data/skillsList';


class AddCourse extends React.Component {
  componentDidMount() {
    this.props.setSecondaryNav('academia');
    if (this.props.match.params.id) {
      this.props.getDefaultValues(this.props.match.params.id);
    }
    document.title = 'Add Course | OS.University';
  }

  getSkills(obj) {
    const needle = this.props.courseDefault.skills;
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
    const needle = this.props.courseDefault.categories;
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
    for (let i = 0; i < (event.target.elements[5].parentElement.childElementCount - 5); i += 1) {
      categories.push(event.target.elements[5].parentElement.children[i].textContent);
    }

    for (let i = 0; i < (event.target.elements[2].parentElement.childElementCount - 5); i += 1) {
      skills.push(event.target.elements[2].parentElement.children[i].textContent);
    }
    const courseData = {
      title: event.target.elements.title.value,
      tutor: event.target.elements.tutor.value,
      description: event.target.elements.description.value,
      external_link: event.target.elements.external_link.value,
      categories,
      skills,
    };
    if (component.props.match.params.id) {
      component.props.editCourse(component.props.match.params.id, courseData);
    } else {
      component.props.addCourse(courseData);
    }
  }
  /* eslint-disable jsx-a11y/label-has-for */
  render() {
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section href="/#/academies">Academies</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Add Course</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size="large" floated="left">
          Add Course
        </Header>
        <Divider clearing />

        <Grid>
          <Grid.Column width={10}>
            <Form size="huge" onSubmit={(event) => { this.handleSubmit(event, this); }}>
              <Form.Field>
                <label htmlFor="title">
                  Course title
                  <Input
                    id="title"
                    name="title"
                    iconPosition="left"
                    icon="tag"
                    placeholder="Course name"
                    key={`title:${this.props.courseDefault.title || ''}`}
                    defaultValue={this.props.courseDefault.title ? this.props.courseDefault.title : ''}
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
                    icon="tag"
                    placeholder="Course tutor"
                    key={`tutor:${this.props.courseDefault.tutor || ''}`}
                    defaultValue={this.props.courseDefault.tutor ? this.props.courseDefault.tutor : ''}
                  />
                </label>
              </Form.Field>
              <Form.Dropdown
                id="skills"
                name="skills"
                placeholder="Course skills"
                label="Skills"
                fluid
                search
                multiple
                key={`skills:${this.props.courseDefault.skills || ''}`}
                defaultValue={this.getSkills(Skills.Skills)}
                options={Skills.Skills}
              />
              <Form.Field>
                <label htmlFor="description">
                  Description
                  <TextArea
                    id="description"
                    name="description"
                    placeholder="Full course description"
                    key={`description:${this.props.courseDefault.description || ''}`}
                    defaultValue={this.props.courseDefault.description ? this.props.courseDefault.description : ''}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="external_link">
                  Url to your course
                  <Input
                    id="external_link"
                    name="external_link"
                    iconPosition="left"
                    icon="tag"
                    placeholder="Url to your course"
                    type="url"
                    key={`external_link:${this.props.courseDefault.external_link || ''}`}
                    defaultValue={this.props.courseDefault.external_link ? this.props.courseDefault.external_link : ''}
                  />
                </label>
              </Form.Field>
              <Form.Dropdown
                id="categories"
                name="categories"
                placeholder="Your course categories"
                label="Course categories"
                fluid
                search
                multiple
                key={`categories:${this.props.courseDefault.categories || ''}`}
                defaultValue={this.getIndustries(Industries.Industries)}
                options={Industries.Industries}
              />
              <Button type="submit" size="huge">Submit</Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={6}>
            <Message positive>
              <Message.Header>
                  Adding Course
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
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
