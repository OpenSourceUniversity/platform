import React from 'react';
import { Container, Header, Grid, Button, Message, Divider, Breadcrumb, Form, Input } from 'semantic-ui-react';
import { addCertificate } from './actions';


export default class AddCertificatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateName: '',
      academyAddress: '',
      dateIssued: '',
      expirationDate: '',
      skills: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    addCertificate(this.state);
  }

  render() {
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section href="/#/certificates">Certificates</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Add certificate</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size="large" floated="left">
          Add certificate
        </Header>

        <Divider clearing />

        <Grid>
          <Grid.Column width={10}>
            <Form size="huge" onSubmit={this.handleSubmit}>
              <Form.Field>
                <label htmlFor="certificateName">
                  Certificate name
                  <Input
                    id="certificateName"
                    name="certificateName"
                    iconPosition="left"
                    icon="certificate"
                    placeholder="Certificate name"
                    onChange={this.handleInputChange}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="academyAddress">
                  Academy address
                  <Input
                    id="academyAddress"
                    name="academyAddress"
                    iconPosition="left"
                    icon="address card"
                    placeholder="Academy address"
                    onChange={this.handleInputChange}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="dateIssued">
                  Issuing date
                  <Input
                    id="dateIssued"
                    name="dateIssued"
                    iconPosition="left"
                    icon="calendar check"
                    placeholder="Issuing date"
                    onChange={this.handleInputChange}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="expirationDate">
                  Expiration date
                  <Input
                    id="expirationDate"
                    name="expirationDate"
                    iconPosition="left"
                    icon="calendar times"
                    placeholder="Expiration date"
                    onChange={this.handleInputChange}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="skills">
                  Skills
                  <Input
                    id="skills"
                    name="skills"
                    icon="tags"
                    iconPosition="left"
                    placeholder="Skills"
                    onChange={this.handleInputChange}
                  />
                </label>
              </Form.Field>
              <Button type="submit" size="huge">Submit</Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={6}>
            <Message positive>
              <Message.Header>
                  Adding certificate
              </Message.Header>
              <Message.Content>
                  Use this screen to add your certificates. Once you add a certificate,
                  academia will have the opportunity to verify it.
              </Message.Content>
            </Message>
          </Grid.Column>
        </Grid>

      </Container>
    );
  }
}
