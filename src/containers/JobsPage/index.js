import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Divider, Grid, Segment, Input, Accordion, Menu, Icon, Dropdown } from 'semantic-ui-react';
import CoursesCategoryFilter from 'components/CoursesCategoryFilter';
import JobItem from 'components/JobItem';
import { fetchJobs } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';

const options = [
  { key: 'one', text: 'One', value: '1' },
  { key: 'two', text: 'Two', value: '2' },
  { key: 'three', text: 'Three', value: '3' },
  { key: 'python', text: 'Python', value: 'Python' },
];

class JobsPage extends React.Component {
  state = { activeIndex: 0, activeItem: 'trending' }

  componentDidMount() {
    this.props.fetchJobs();
    this.props.setSecondaryNav('business');
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  renderJobs() {
    return (
      this.props.jobs.map((job, index) => (
        <Grid.Column
          computer={8}
          largeScreen={8}
          widescreen={8}
          tablet={8}
          mobile={16}
          key={index}
        >
          <JobItem job={job} key={index} />
        </Grid.Column>))
    );
  }

  render() {
    const { activeIndex, activeItem } = this.state;
    return (
      <Container>
        <Header>
          Jobs
        </Header>
        <Grid>
          <Grid.Column width={3}>
            <Segment>
              <Accordion as={Menu} vertical>
                <Header style={{ textAlign: 'center', paddingTop: '10px' }}>
                  Idustries
                </Header>
                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                  >
                    <Icon name="block layout" />
                    Industry
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 0}
                    content={<CoursesCategoryFilter filterType="jobs" />}
                  />
                </Menu.Item>
              </Accordion>
            </Segment>
          </Grid.Column>

          <Grid.Column width={10}>
            <Segment>
              <Input
                label={<Dropdown defaultValue="Python" options={options} />}
                labelPosition="left"
                placeholder="Search by keyword..."
                icon={{
                  name: 'search', circular: false, link: true, bordered: true,
                }}
                fluid
              />
              <Divider clearing />
              <Menu pointing secondary color="orange">
                <Menu.Item name="trending" active={activeItem === 'trending'} onClick={this.handleItemClick} />
                <Menu.Item name="recommended" active={activeItem === 'recommended'} onClick={this.handleItemClick} />
              </Menu>
              {(() => {
                switch (this.state.activeItem) {
                case 'recommended': return 'Recommended page';
                default: return this.renderJobs();
                }
              })()}
            </Segment>
          </Grid.Column>
        </Grid>

      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    jobs: state.jobs.jobs,
    isFetching: state.jobs.isFetching,
    error: state.jobs.error,
    next: state.jobs.next,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchJobs(url) {
      dispatch(fetchJobs(url));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsPage);
