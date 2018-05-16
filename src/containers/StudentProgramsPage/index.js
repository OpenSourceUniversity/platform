import React from 'react';
import { Container, Header, Divider, Grid, Segment, Input, Button, Form, Accordion, Menu, Icon, Dropdown } from 'semantic-ui-react';
import StudentProgramItem from 'components/StudentProgramItem';
import TopProgramsItem from 'components/TopProgramsItem';
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
  { key: 'all', text: 'All programs', value: 'programs' },
]

export default class StudenProgramsPage extends React.Component {
  state = { activeIndex: 0, activeItem: 'trending' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index

      this.setState({ activeIndex: newIndex })
    }

  renderPrograms() {
    const programs = [
      {
        title: 'Bachalor in science in Computer Science',
        overviewTitle: 'A cutting-edge Computer Science Master’s degree from America’s most innovative university.',
        overviewDescription: 'The Master of Computer Science (MCS) degree program from Arizona State University provides high-quality computer science.',
        objectiveTitle: 'Who is this degree for:',
        objectiveText: 'The Master of Computer Science program is designed for students with undergraduate degrees in computing or related areas who seek a deeper understanding of computing fundamentals as ...',
        language: 'English',
        duration: '4 weeks',
        rating: '4.5',
        location: 'Compleately online'
      },
      {
        title: 'Master of Applied Data Science',
        overviewTitle: 'Computer Data Science Master’s degree from America’s most innovative university.',
        overviewDescription: 'The Master of Computer Science (MCS) degree program from Arizona State University provides high-quality computer science.',
        objectiveTitle: 'Who is this degree for:',
        objectiveText: 'The Master of Computer Science program is designed for students with undergraduate degrees in computing or related areas who seek a deeper understanding of computing fundamentals as ...',
        language: 'English',
        duration: '10 weeks',
        rating: '4.1',
        location: 'Compleately online'
      },
    ];
    return programs.map((programs, index) => (
      <Grid.Column
        computer={8}
        largeScreen={8}
        widescreen={8}
        tablet={8}
        mobile={16}
        key={index}
      >
        <StudentProgramItem programe={programs} key={index} />
      </Grid.Column>));
  }

  renderTopAcademia() {
    const academias = [
       { title: 'Academy Name 1' },
       { title: 'Academy Name 2' },
       { title: 'Academy Name 3' },
       { title: 'Academy Name 4' },
       { title: 'Academy Name 5' },
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

  renderTopPrograms() {
    const programs = [
       { title: 'Program Name 1', description: 'Description' },
       { title: 'Program Name 2', description: 'Description' },
       { title: 'Program Name 3', description: 'Description' },
       { title: 'Program Name 4', description: 'Description' },
       { title: 'Program Name 5', description: 'Description' },
    ];
    return programs.map((program, index) => (
      <Grid.Column
        computer={8}
        largeScreen={8}
        widescreen={8}
        tablet={8}
        mobile={16}
        key={index}
      >
        <TopProgramsItem program={program} key={index} />
      </Grid.Column>));
  }

  render() {
    const { activeIndex, activeItem } = this.state
    return (
      <Container>
        <Header>
          Student Programs
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
                  label={<Dropdown defaultValue='programs' options={options} />}
                  labelPosition='left'
                  placeholder='Search by keyword...'
                  icon={{ name: 'search', circular: false, link: true, bordered: true }}
                  fluid
                />
                <Divider clearing />
                <Menu pointing secondary color='orange'>
                  <Menu.Item name='trending' active={activeItem === 'trending'} onClick={this.handleItemClick} />
                  <Menu.Item name='recommended' active={activeItem === 'recommended'} onClick={this.handleItemClick} />
                </Menu>
                {(() => {
                  switch(this.state.activeItem) {
                  case 'recommended': return 'Recommended page';
                  default: return this.renderPrograms();
                  }
                })()}
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
                Top Programs
              </Header>
              <Divider clearing />
              {this.renderTopPrograms()}
            </Segment>
          </Grid.Column>
        </Grid>

      </Container>
    );
  }
}
