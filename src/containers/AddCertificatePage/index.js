import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Grid, Button, Message, Divider, Breadcrumb, Form, Input } from 'semantic-ui-react';
import { addCertificate } from './actions';


class AddCertificatePage extends React.Component {
  constructor(props) {
    super(props);

    /* eslint-disable */
    this.state = {
      certificateName: '',
      academyAddress: '',
      dateIssued: '',
      expirationDate: '',
      skills: '',
    };
    /* eslint-enable */

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addCertificate(this.state);
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

        <Message error hidden={!this.props.error}>
          <p>{this.props.error}</p>
        </Message>

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


function mapStateToProps(state) {
  return {
    isAdding: state.addCertificate.isAdding,
    error: state.addCertificate.error,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    addCertificate(state) {
      dispatch(addCertificate(state));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCertificatePage);
