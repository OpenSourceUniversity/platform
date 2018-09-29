import React from 'react';
import { connect } from 'react-redux';
import { Form, Dimmer, Loader, Button, Container, Header, Divider, Grid, Segment, Accordion, Menu, Icon } from 'semantic-ui-react';
import CourseItem from 'components/CourseItem';
import TopCoursesItem from 'components/TopCoursesItem';
import TopAcademiaItem from 'components/TopAcademiaItem';
import IndustryFilter from 'components/IndustryFilter';
import { fetchCourses, resetCourses } from './actions';
import search from '../../util/search/search';
import storeSearchType from '../../util/search/storeSearchType';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';


class CoursesPage extends React.Component {
  state = { activeIndex: 0, activeItem: 'trending' }

  componentDidMount() {
    this.props.setSecondaryNav('academia');
    this.props.storeSearchType('courses');
    const params = new URLSearchParams(this.props.location.search);
    const searchQuery = params.get('q');
    if (searchQuery) {
      this.props.search(searchQuery);
    } else {
      this.props.fetchCourses();
    }
    document.title = 'Courses';
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
      this.props.courses.map((course, index) => (
        <Grid.Column
          computer={8}
          largeScreen={8}
          widescreen={8}
          tablet={8}
          mobile={16}
          key={index}
        >
          <CourseItem course={course} key={index} />
        </Grid.Column>))
    );
  }

  renderTopAcademia() {
    const academias = [
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

  renderSearch() {
    return (
      <Form onSubmit={event => this.props.search(event.currentTarget.elements.query.value)}>
        <Form.Field>
          <Form.Input
            label="Search"
            placeholder="Search courses"
            name="query"
            fluid
          />
        </Form.Field>
      </Form>
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
    const { activeIndex } = this.state;
    return (
      <Container className="courses-page">
        <Header>
          Courses
        </Header>
        <Grid>
          <Grid.Column width={3}>
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
                  Industries
                </Accordion.Title>
                <Accordion.Content
                  active={activeIndex === 0}
                  content={<IndustryFilter filterType="courses" />}
                />
              </Menu.Item>
            </Accordion>
          </Grid.Column>

          <Grid.Column width={10}>
            <Segment>

              {this.renderSearch()}

              <Divider clearing />
              {(() => {
                switch (this.state.activeItem) {
                default: return this.props.courses.length ?
                  this.renderCourses() :
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <p style={{ textAlign: 'center' }}>There are no courses yet.</p>
                  </div>;
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
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    storeSearchType(searchType) {
      dispatch(storeSearchType(searchType));
    },
    search(query) {
      dispatch(search(query));
    },
    resetCourses() {
      dispatch(resetCourses());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
