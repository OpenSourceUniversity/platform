import React from 'react';
import { connect } from 'react-redux';
import { Form, Dimmer, Loader, Button, Container, Header, Divider, Grid, Segment, Accordion, Menu, Icon } from 'semantic-ui-react';
import LearnerItem from 'components/LearnerItem';
import { fetchLearners } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import search from '../../util/search/search';
import storeSearchType from '../../util/search/storeSearchType';


class LearnersPage extends React.Component {
  state = { activeIndex: 0, activeItem: 'trending' }

  componentDidMount() {
    this.props.setSecondaryNav('academia');
    this.props.storeSearchType('learners');
    const params = new URLSearchParams(this.props.location.search);
    const searchQuery = params.get('q');
    if (searchQuery) {
      this.props.search(searchQuery);
    } else {
      this.props.fetchLearners();
    }
    document.title = 'Learners';
  }

  industries = [
    {
      name: 'Learner',
      id: '1',
    },
  ]

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  renderIndustries() {
    return this.industries.map(industry => (
      <Form.Checkbox
        label={industry.name}
        name={industry.id}
        key={industry.id}
        value={industry.name}
      />));
  }

  renderIndustryGroup() {
    return (
      <Form>
        <Form.Group grouped>
          {this.renderIndustries()}
        </Form.Group>
      </Form>
    );
  }

  renderLearners() {
    return (
      this.props.learners.map((learner, index) => (
        <Grid.Column
          computer={8}
          largeScreen={8}
          widescreen={8}
          tablet={8}
          mobile={16}
          key={index}
        >
          <LearnerItem learner={learner} key={index} />
        </Grid.Column>))
    );
  }

  renderSearch() {
    return (
      <Form onSubmit={event => this.props.search(event.currentTarget.elements.query.value)}>
        <Form.Field>
          <Form.Input
            label="Search"
            placeholder="Search learners"
            name="query"
            fluid
          />
        </Form.Field>
      </Form>
    );
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <Container className="courses-page">
        <Header>
          Learners
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
                    Type
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 0}
                    content={this.renderIndustryGroup()}
                  />
                </Menu.Item>
              </Accordion>
            </Segment>
          </Grid.Column>

          <Grid.Column width={10}>
            <Segment>

              {this.renderSearch()}

              <Divider clearing />
              {(() => {
                switch (this.state.activeItem) {
                default: return this.props.learners.length ?
                  this.renderLearners() :
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <p style={{ textAlign: 'center' }}>There are no learners yet.</p>
                  </div>;
                }
              })()}

              <Dimmer active={this.props.isFetching} inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>

              <div style={{ display: !this.props.next ? 'none' : 'block', marginTop: '20px', textAlign: 'center' }}>
                <Button
                  onClick={() => { this.props.fetchLearners(this.props.next); }}
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
        </Grid>

      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    learners: state.learners.learners,
    isFetching: state.learners.isFetching,
    error: state.learners.error,
    next: state.learners.next,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchLearners(url) {
      dispatch(fetchLearners(url));
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


export default connect(mapStateToProps, mapDispatchToProps)(LearnersPage);
