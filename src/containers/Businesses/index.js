import React from 'react';
import { connect } from 'react-redux';
import { Form, Dimmer, Loader, Button, Container, Header, Divider, Grid, Segment, Accordion, Menu, Icon } from 'semantic-ui-react';
import BusinessItem from 'components/BusinessItem';
import { fetchBusinesses } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';


class BusinessesPage extends React.Component {
  state = { activeIndex: 0, activeItem: 'trending' }

  componentDidMount() {
    this.props.fetchBusinesses();
    this.props.setSecondaryNav('business');
  }

  categories = [
    {
      name: 'Company',
      id: '1',
    },
    {
      name: 'Freelance',
      id: '2',
    },
  ]

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  renderCategories() {
    return this.categories.map(category => (
      <Form.Checkbox
        label={category.name}
        name={category.id}
        key={category.id}
        value={category.name}
      />));
  }

  renderCategoryGroup() {
    return (
      <Form>
        <Form.Group grouped>
          {this.renderCategories()}
        </Form.Group>
      </Form>
    );
  }

  renderBusinesses() {
    return (
      this.props.businesses.map((business, index) => (
        <Grid.Column
          computer={8}
          largeScreen={8}
          widescreen={8}
          tablet={8}
          mobile={16}
          key={index}
        >
          <BusinessItem business={business} key={index} />
        </Grid.Column>))
    );
  }

  renderSearch() {
    const academies = [
      { value: '1', text: 'Academy title 1' },
      { value: '2', text: 'Academy title 2' },
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
          options={academies}
        />
      </Form.Field>
    );
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
                    content={this.renderCategoryGroup()}
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
                default: return this.renderBusinesses();
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
        </Grid>

      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    businesses: state.businesses.businesses,
    isFetching: state.businesses.isFetching,
    error: state.businesses.error,
    next: state.businesses.next,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchBusinesses(url) {
      dispatch(fetchBusinesses(url));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(BusinessesPage);
