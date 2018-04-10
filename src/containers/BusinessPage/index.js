import React from 'react';
import { Container, Header, Grid, Button, Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import BusinessItem from 'components/BusinessItem';


export default class BusinessPage extends React.Component {
  renderBusinesses() {
    const positions = [
      { title: 'Python Development' },
      { title: 'Scrum Master' },
      { title: 'Machine Learning' },
    ];
    return positions.map((position, index) => (
      <Grid.Column
        computer={4}
        largeScreen={4}
        widescreen={4}
        tablet={8}
        mobile={16}
        key={index}
      >
        <BusinessItem position={position} key={index} />
      </Grid.Column>
    ));
  }

  render() {
    return (
      <Container fluid>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Businesses</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size="large" floated="left">
          Businesses
        </Header>
        <Button icon labelPosition="left" positive floated="right" as={Link} to="/businesses/add">
          <Icon name="plus" />
          Add Position
        </Button>

        <Divider clearing />

        <Grid>
          {this.renderBusinesses()}
        </Grid>

      </Container>
    );
  }
}
