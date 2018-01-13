import React from 'react';
import { Container, Header, Grid, Button, Message, Divider, Breadcrumb, Form, Input } from 'semantic-ui-react';


export default class AddPeopleToBusiness extends React.Component {
  render() {
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section href="/#/certificates">Business</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Add Person</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size="large" floated="left">
          Add certificate
        </Header>

        <Divider clearing />

        <Grid>
          <Grid.Column width={10}>
            <Form size="huge">
              <Form.Field>
                <label htmlFor="person Name">
                  Name
                  <Input id="personName" iconPosition="left" icon="User" placeholder="Name" />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="position">
                  Academy address
                  <Input id="position" iconPosition="left" icon="Industry" placeholder="Position" />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="dateIssued">
                  Issuing date
                  <Input id="dateIssued" iconPosition="left" icon="calendar check" placeholder="Issuing date" />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="skills">
                  Skills
                  <Input
                    id="skills"
                    icon="tags"
                    iconPosition="left"
                    placeholder="Skills"
                  />
                </label>
              </Form.Field>
              <Button type="submit" size="huge">Submit</Button>
            </Form>
          </Grid.Column>
        </Grid>

      </Container>
    );
  }
}
