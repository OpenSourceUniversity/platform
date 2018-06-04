import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Button, Container, Header, Divider, Grid, Segment, Input, Accordion, Menu, Icon, Dropdown } from 'semantic-ui-react';
import CourseItem from 'components/CourseItem';
import TopCoursesItem from 'components/TopCoursesItem';
import TopAcademiaItem from 'components/TopAcademiaItem';
import CoursesFilterList from '../../data/filtersCourses';
import { fetchCourses } from './actions';

const options = [
  { key: 'courses', text: 'Courses', value: 'courses' },
];


class CoursesPage extends React.Component {
  state = { activeIndex: 0, activeItem: 'trending' }

  componentDidMount() {
    this.props.fetchCourses();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  renderCourses() {
    return (
      this.props.courses.map((certificate, index) => (
        <Grid.Column
          computer={8}
          largeScreen={8}
          widescreen={8}
          tablet={8}
          mobile={16}
          key={index}
        >
          <CourseItem certificate={certificate} key={index} />
        </Grid.Column>))
    );
  }

  renderTopAcademia() {
    const academias = [
<<<<<<< HEAD
      { title: 'Academy Name 1' },
      { title: 'Academy Name 2' },
      { title: 'Academy Name 3' },
      { title: 'Academy Name 4' },
      { title: 'Academy Name 5' },
=======
      { title: 'Academy Name' },
>>>>>>> master
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

  renderSearch() {
    const courses = [
      { value: '1', text: 'Course title 1' },
      { value: '2', text: 'Course title 2' },
    ];

    return (
       <Form.Field>
         <Form.Dropdown
         label="Serch"
         placeholder="Search by keyword ..."
         fluid
         multiple
         search
         selection
         options={courses}
         />
       </Form.Field>
    );
  }

  renderTopCourses() {
    const courses = [
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
    const { activeIndex, activeItem } = this.state;
    return (
      <Container>
        <Header>
          Courses
        </Header>
        <Grid>
          <Grid.Column width={3}>
            <Segment>
              <Accordion as={Menu} vertical>
                <Header style={{ textAlign: 'center', paddingTop: '10px' }}>
                  Advanced filter
                </Header>
                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                  >
                    <Icon name="block layout" />
                    Categories
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 0}
                    content={CoursesFilterList.CoursesFilterList.categories}
                  />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={this.handleClick}
                  >
                    <Icon name="graduation" />
                    Qualification
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 1}
                    content={CoursesFilterList.CoursesFilterList.qualification}
                  />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={this.handleClick}
                  >
                    <Icon name="home" />
                    Study type
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 2}
                    content={CoursesFilterList.CoursesFilterList.studyType}
                  />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 3}
                    index={3}
                    onClick={this.handleClick}
                  >
                    <Icon name="time" />
                    Duration
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 3}
                    content={CoursesFilterList.CoursesFilterList.duration}
                  />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick} >
                    <Icon name="calendar" />
                    Dates
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 4}
                    content={CoursesFilterList.CoursesFilterList.dates}
                  />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 5}
                    index={5}
                    onClick={this.handleClick}
                  >
                    <Icon name="money" />
                    Price
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 5}
                    content={CoursesFilterList.CoursesFilterList.price}
                  />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 6}
                    index={6}
                    onClick={this.handleClick}
                  >
                    <Icon name="signal" />
                    Level
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 6}
                    content={CoursesFilterList.CoursesFilterList.level}
                  />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 7}
                    index={7}
                    onClick={this.handleClick}
                  >
                    <Icon name="world" />
                    Language
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 7}
                    content={CoursesFilterList.CoursesFilterList.language}
                  />
                </Menu.Item>
              </Accordion>
            </Segment>
          </Grid.Column>

          <Grid.Column width={10}>
            <Segment>

              {this.renderSearch()}

              <Divider clearing />
              {/*
              <Menu pointing secondary color="orange">
                <Menu.Item name="trending" active={activeItem === 'trending'}
                  onClick={this.handleItemClick} />
                <Menu.Item name="recommended" active={activeItem === 'recommended'}
                  onClick={this.handleItemClick} />
              </Menu>
              */}

              {(() => {
                switch (this.state.activeItem) {
                case 'recommended': return 'Recommended page';
                default: return this.renderCourses();
                }
              })()}

              <Dimmer active={this.props.isFetching} inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>

              <div style={{ display: !this.props.next ? 'none' : 'block', marginTop: '20px', textAlign: 'center' }}>
                <Button
                  onClick={() => { this.props.fetchCourses(this.props.next); }}
                  icon
                  labelPosition="left"
                >
                  <Icon
                    name={!this.props.isFetching ? 'arrow down' : 'spinner'}
                    loading={this.props.isFetching}
                  />
                  Load More
                </Button>
              </div>

            </Segment>
          </Grid.Column>

          <Grid.Column width={3}>
            <Segment hidden>
              <Header style={{ textAlign: 'center' }}>
                Top Academia
              </Header>
              <Divider clearing />
              {this.renderTopAcademia()}
              <Header style={{ textAlign: 'center' }}>
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


function mapStateToProps(state) {
  return {
    courses: state.courses.courses,
    isFetching: state.courses.isFetching,
    error: state.courses.error,
    next: state.courses.next,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCourses(url) {
      dispatch(fetchCourses(url));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
