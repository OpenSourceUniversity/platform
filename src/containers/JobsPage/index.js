import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Divider, Grid, Segment, Accordion, Menu, Icon, Form, Dimmer, Button, Loader } from 'semantic-ui-react';
import IndustryFilter from 'components/IndustryFilter';
import JobItem from 'components/JobItem';
import { fetchJobs } from './actions';
import search from '../../util/search/search';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import storeSearchType from '../../util/search/storeSearchType';

class JobsPage extends React.Component {
  state = { activeIndex: 0, activeItem: 'trending' }

  componentDidMount() {
    this.props.storeSearchType('jobs');
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
    const { activeIndex } = this.state;
    return (
      <Container>
        <Header>
          Jobs
        </Header>
        <Grid>
          <Grid.Column width={5}>
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

          <Grid.Column width={11}>
            <Segment padded>
              {this.renderSearch()}
            </Segment>
            <Divider clearing />
            {(() => {
              switch (this.state.activeItem) {
              default: return this.props.jobs.length ?
                this.renderJobs() :
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <p style={{ textAlign: 'center' }}>There are no job positions yet.</p>
                </div>;
              }
            })()}
            <Dimmer active={this.props.isFetching} inverted>
              <Loader size="large">Loading</Loader>
            </Dimmer>

            <div style={{ display: !this.props.next ? 'none' : 'block', marginTop: '20px', textAlign: 'center' }}>
              <Button
                onClick={() => { this.props.fetchJobs(this.props.next); }}
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
