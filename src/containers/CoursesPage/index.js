import React from 'react';
import { Container, Header, Breadcrumb, Divider, Grid, Segment, Form, Input, Button, Sticky } from 'semantic-ui-react';
import CourseItem from 'components/CourseItem';


export default class CoursesPage extends React.Component {
  render() {
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href='/#/'>Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section active>Courses</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />

        <Header size='large' floated='left'>
          Courses
        </Header>

        <Divider clearing />

        <Grid reversed='mobile'>
          <Grid.Column width={10}>
            <Grid>
                {this.renderCourses()}
            </Grid>
          </Grid.Column>

          <Grid.Column width={6}>
            <Sticky>
              <Segment>
                <Header>
                  Filter
                </Header>
                <Form>
                  <Form.Field>
                    <label>Name</label>
                    <Input placeholder='Name' />
                  </Form.Field>
                  <Form.Field>
                    <label>Subject</label>
                    <Input placeholder='Subject' />
                  </Form.Field>
                  <Button type='submit'>Filter</Button>
                </Form>
              </Segment>
            </Sticky>
          </Grid.Column>
        </Grid>

      </Container>
    )
  }

  renderCourses() {
    const courses = [
      {title: 'Python Development', verified: true, grade: 90},
      {title: 'Scrum Master', verified: true, grade: 80},
      {title: 'Machine Learning', verified: false, grade: 100},
      {title: 'Solidity Development', verified: true, grade: 75},
      {title: 'Unit Testing', verified: true, grade: 90},
      {title: 'Computer Vision', verified: true, grade: 100},
      {title: 'Computer Vision', verified: true, grade: 100},
      {title: 'Computer Vision', verified: true, grade: 100},
      {title: 'Computer Vision', verified: true, grade: 100},
      {title: 'Computer Vision', verified: true, grade: 100},
      {title: 'Computer Vision', verified: true, grade: 100},
      {title: 'Computer Vision', verified: true, grade: 100},
      {title: 'Computer Vision', verified: true, grade: 100},
      {title: 'Computer Vision', verified: true, grade: 100},
    ];
    return courses.map((certificate, index) => {
      return (<Grid.Column computer={8} largeScreen={8} widescreen={8} tablet={8} mobile={16} key={index}>
        <CourseItem certificate={certificate} />
      </Grid.Column>)
    });
  }
}
