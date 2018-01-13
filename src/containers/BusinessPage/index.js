import React from 'react';
import { Container, Header, Grid, Button, Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import BusinessItem from 'components/BusinessItem';


export default class BusinessPage extends React.Component {
  renderPeople() {
    const people = [

    ];
    return people.map((people, index) => (
      <Grid.Column
        computer={4}
        largeScreen={4}
        widescreen={4}
        tablet={8}
        mobile={16}
        key={index}
      >
        <BusinessItem people={people} key={index} />
      </Grid.Column>
    ));
  }

  render() {
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>People</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size="large" floated="left">
          People
        </Header>
        <Button icon labelPosition="left" positive floated="right" as={Link} to="/BusinessPeopleItem/add">
          <Icon name="plus" />
          Add Person
        </Button>

        <Divider clearing />

        <Grid>
          {this.renderPeople()}
        </Grid>

      </Container>
    );
  }
}
