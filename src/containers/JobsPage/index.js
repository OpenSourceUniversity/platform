import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Divider, Grid, Segment, Input, Accordion, Menu, Icon, Dropdown, Form } from 'semantic-ui-react';
import IndustryFilter from 'components/IndustryFilter';
import JobItem from 'components/JobItem';
import { fetchJobs } from './actions';
import search from '../../util/search/search';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import storeSearchType from '../../util/search/storeSearchType';

const options = [
  { key: 'one', text: 'One', value: '1' },
  { key: 'two', text: 'Two', value: '2' },
  { key: 'three', text: 'Three', value: '3' },
  { key: 'python', text: 'Python', value: 'Python' },
];

class JobsPage extends React.Component {
  state = { activeIndex: 0, activeItem: 'trending' }

  componentDidMount() {
    // this.props.fetchJobs();
    this.props.setSecondaryNav('business');
    const params = new URLSearchParams(this.props.location.search);
    const searchQuery = params.get('q');
    if (searchQuery) {
      this.props.search(searchQuery);
    } else {
      this.props.fetchJobs();
    }
    document.title = 'Jobs';
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  renderSearch() {
    return (
      <Form onSubmit={event => this.props.search(event.currentTarget.elements.query.value)}>
        <Form.Field>
          <Form.Input
            label="Search"
            placeholder="Search jobs"
            name="query"
            fluid
          />
        </Form.Field>
      </Form>
    );
  }

  renderJobs() {
    this.props.storeSearchType('jobs');
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
                  content={<IndustryFilter filterType="jobs" />}
                />
              </Menu.Item>
            </Accordion>
          </Grid.Column>

          <Grid.Column width={10}>
            <Segment>
              {this.renderSearch()}
              <Divider clearing />
              <Menu pointing secondary color="orange">
                <Menu.Item name="trending" active={activeItem === 'trending'} onClick={this.handleItemClick} />
              </Menu>
              {(() => {
                switch (this.state.activeItem) {
                default: return this.props.jobs.length ?
                  this.renderJobs() :
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <p style={{ textAlign: 'center' }}>There are no job positions yet.</p>
                  </div>;
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
    storeSearchType(searchType) {
      dispatch(storeSearchType(searchType));
    },
    search(query) {
      dispatch(search(query));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsPage);
