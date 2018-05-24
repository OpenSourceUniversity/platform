import React from 'react';
import { Container, Header, Divider, Grid, Segment, Input, Form, Accordion, Menu, Icon, Dropdown } from 'semantic-ui-react';
import JobItem from 'components/JobItem';
import TopJobItem from 'components/TopJobItem';
import TopCompanyItem from 'components/TopCompanyItem';

const FilterForm = (
  <Form>
    <Form.Group grouped>
      <Form.Checkbox label="One" name="filter" value="one" />
      <Form.Checkbox label="Two" name="filter" value="two" />
      <Form.Checkbox label="Three" name="filter" value="three" />
    </Form.Group>
  </Form>
);

const options = [
  { key: 'one', text: 'One', value: '1' },
  { key: 'two', text: 'Two', value: '2' },
  { key: 'three', text: 'Three', value: '3' },
  { key: 'python', text: 'Python', value: 'Python' },
];

export default class JobsPage extends React.Component {
  state = { activeIndex: 0, activeItem: 'trending' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  renderJobs() {
    const jobs = [
      {
        title: 'Python Development', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Scrum Master', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Machine Learning', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Solidity Development', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Unit Testing', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
    ];
    return jobs.map((jobDetails, index) => (
      <Grid.Column
        computer={8}
        largeScreen={8}
        widescreen={8}
        tablet={8}
        mobile={16}
        key={index}
      >
        <JobItem job={jobDetails} key={index} />
      </Grid.Column>));
  }

  renderTopCompany() {
    const companies = [
      { title: 'Company Name' },
      { title: 'Company Name' },
      { title: 'Company Name' },
      { title: 'Company Name' },
      { title: 'Company Name' },
    ];
    return companies.map((companiesList, index) => (
      <Grid.Column
        computer={8}
        largeScreen={8}
        widescreen={8}
        tablet={8}
        mobile={16}
        key={index}
      >
        <TopCompanyItem companies={companiesList} key={index} />
      </Grid.Column>));
  }

  renderTopJobs() {
    const jobs = [
      { title: 'Job Name', description: 'Description' },
      { title: 'Job Name', description: 'Description' },
      { title: 'Job Name', description: 'Description' },
      { title: 'Job Name', description: 'Description' },
      { title: 'Job Name', description: 'Description' },
    ];
    return jobs.map((jobsList, index) => (
      <Grid.Column
        computer={8}
        largeScreen={8}
        widescreen={8}
        tablet={8}
        mobile={16}
        key={index}
      >
        <TopJobItem jobs={jobsList} key={index} />
      </Grid.Column>));
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
                  Advanced filter
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
                  <Accordion.Content active={activeIndex === 0} content={FilterForm} />
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
                  <Accordion.Content active={activeIndex === 1} content={FilterForm} />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={this.handleClick}
                  >
                    <Icon name="home" />
                    Work type
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 2} content={FilterForm} />
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
                  <Accordion.Content active={activeIndex === 3} content={FilterForm} />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 4}
                    index={4}
                    onClick={this.handleClick}
                  >
                    <Icon name="calendar" />
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
                    <Icon name="money" />
                    Salary
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 5} content={FilterForm} />
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
                  <Accordion.Content active={activeIndex === 6} content={FilterForm} />
                </Menu.Item>

                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 7}
                    index={7}
                    onClick={this.handleClick}
                  >
                    <Icon name="world" />
                    Location
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 7} content={FilterForm} />
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

          <Grid.Column width={3}>
            <Segment>
              <Header style={{ textAlign: 'center' }}>
                Top Companies
              </Header>
              <Divider clearing />
              {this.renderTopCompany()}
              <Header style={{ textAlign: 'center' }}>
                Top Jobs
              </Header>
              <Divider clearing />
              {this.renderTopJobs()}
            </Segment>
          </Grid.Column>
        </Grid>

      </Container>
    );
  }
}
