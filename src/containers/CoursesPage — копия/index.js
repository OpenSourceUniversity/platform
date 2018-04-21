import React from 'react';
import { Container, Header, Divider, Grid, Segment, Input, Button, Form, Accordion, Menu, Icon, Dropdown } from 'semantic-ui-react';
import CourseItem from 'components/CourseItem';
import TopCoursesItem from 'components/TopCoursesItem';
import TopAcademiaItem from 'components/TopAcademiaItem';

const FilterForm = (
  <Form>
    <Form.Group grouped>
      <Form.Checkbox label='One' name='filter' value='one' />
      <Form.Checkbox label='Two' name='filter' value='two' />
      <Form.Checkbox label='Three' name='filter' value='three' />
    </Form.Group>
  </Form>
)

const options = [
  { key: 'one', text: 'One', value: '1' },
  { key: 'two', text: 'Two', value: '2' },
  { key: 'three', text: 'Three', value: '3' },
  { key: 'courses', text: 'Courses', value: 'courses' },
]

export default class CoursesPage extends React.Component {
  state = { activeIndex: 0, activeItem: 'trending' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index

      this.setState({ activeIndex: newIndex })
    }

  renderCourses() {
    const courses = [
      { title: 'Python Development', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Scrum Master', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Machine Learning', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Solidity Development', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah'},
      { title: 'Unit Testing', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
      { title: 'Computer Vision', level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
    ];
    return courses.map((certificate, index) => (
      <Grid.Column
        computer={8}
        largeScreen={8}
        widescreen={8}
        tablet={8}
        mobile={16}
        key={index}
      >
        <CourseItem certificate={certificate} key={index} />
      </Grid.Column>));
  }

  renderTopAcademia() {
    const academias = [
       { title: 'Academy Name' },
       { title: 'Academy Name' },
       { title: 'Academy Name' },
       { title: 'Academy Name' },
       { title: 'Academy Name' },
    ];
    return academias.map((academia, index) => (
      <Grid.Column
        computer={8}
        largeScreen={8}
        widescreen={8}
        tablet={8}
        mobile={16}
        key={index}
      >
        <TopAcademiaItem academia={academia} key={index} />
      </Grid.Column>));
  }

  renderTopCourses() {
    const courses = [
       { title: 'Academy Name', description: 'Description' },
       { title: 'Academy Name', description: 'Description' },
       { title: 'Academy Name', description: 'Description' },
       { title: 'Academy Name', description: 'Description' },
       { title: 'Academy Name', description: 'Description' },
    ];
    return courses.map((course, index) => (
      <Grid.Column
        computer={8}
        largeScreen={8}
        widescreen={8}
        tablet={8}
        mobile={16}
        key={index}
      >
        <TopCoursesItem course={course} key={index} />
      </Grid.Column>));
  }

  render() {
    const { activeIndex, activeItem } = this.state
    return (
      <Container>
        <Header>
          Courses
        </Header>
        <Grid>
          <Grid.Column width={3}>
            <Segment>
              <Accordion as={Menu} vertical>
                <Header>
                  Advanced filter
                </Header>
                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                  >
                    <Icon name='block layout' />
                    Categories
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 0} content={FilterForm} />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={this.handleClick}
                  >
                    <Icon name='graduation' />
                    Qualification
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 1} content={FilterForm} />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={this.handleClick}
                  >
                    <Icon name='home' />
                    Study type
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 2} content={FilterForm} />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 3}
                    index={3}
                    onClick={this.handleClick}
                  >
                    <Icon name='time' />
                    Duration
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 3} content={FilterForm} />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 4}
                    index={4}
                    onClick={this.handleClick}
                  >
                    <Icon name='calendar' />
                    Dates
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 4} content={FilterForm} />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 5}
                    index={5}
                    onClick={this.handleClick}
                  >
                    <Icon name='money' />
                    Price
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 5} content={FilterForm} />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 6}
                    index={6}
                    onClick={this.handleClick}
                  >
                    <Icon name='signal' />
                    Level
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 6} content={FilterForm} />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 7}
                    index={7}
                    onClick={this.handleClick}
                  >
                    <Icon name='world' />
                    Language
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 7} content={FilterForm} />
                </Menu.Item>
              </Accordion>
            </Segment>
          </Grid.Column>

          <Grid.Column width={10}>
            <Segment>
                <Input
                  label={<Dropdown defaultValue='courses' options={options} />}
                  labelPosition='left'
                  placeholder='Search by keyword...'
                  icon={{ name: 'search', circular: false, link: true }}
                  fluid
                />
                <Divider clearing />
                <Menu pointing secondary>
                  <Menu.Item name='trending' active={activeItem === 'trending'} onClick={this.handleItemClick} />
                  <Menu.Item name='recommended' active={activeItem === 'recommended'} onClick={this.handleItemClick} />
                </Menu>
                {this.renderCourses()}
            </Segment>
          </Grid.Column>

          <Grid.Column width={3}>
            <Segment>
              <Header>
                Top Academia
              </Header>
              <Divider clearing />
              {this.renderTopAcademia()}
              <Header>
                Top Courses
              </Header>
              <Divider clearing />
              {this.renderTopCourses()}
            </Segment>
          </Grid.Column>
        </Grid>

      </Container>
    );
  }
}
