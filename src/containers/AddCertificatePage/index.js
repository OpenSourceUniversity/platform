import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Segment, Button, Message, Divider, Breadcrumb, Form, Input, Dimmer, Loader } from 'semantic-ui-react';
import { addCertificate } from './actions';


class AddCertificatePage extends React.Component {
  constructor(props) {
    super(props);

    /* eslint-disable */
    this.state = {
      certificateName: '',
      issuer: '',
      recipient: '',
      file: '',
    };
    /* eslint-enable */

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;

    let value;

    switch (target.type) {
    case 'checkbox':
      value = target.checked;
      break;
    case 'file':
      [value] = target.files;
      break;
    default:
      value = { target };
    }

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
      <Container fluid>
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

        <Message success hidden={!this.props.isAdded}>
          <p>Certificate added successfully.</p>
        </Message>

        <Message error hidden={!this.props.error}>
          <p>{this.props.error}</p>
        </Message>

        <Segment style={{ display: this.props.isAdded ? 'none' : 'block' }}>
          <Dimmer active={this.props.isAdding} inverted>
            <Loader size="medium">
              Adding certificate...
            </Loader>
          </Dimmer>

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
              <label htmlFor="issuer">
                Issuer
                <Input
                  id="issuer"
                  name="issuer"
                  iconPosition="left"
                  icon="address card"
                  placeholder="Issuer address"
                  onChange={this.handleInputChange}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="recipient">
                Recipient
                <Input
                  id="recipient"
                  name="recipient"
                  iconPosition="left"
                  icon="address card"
                  placeholder="Recipient ETH address"
                  onChange={this.handleInputChange}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="certificateFile">
                Certificate
                <Input
                  id="file"
                  iconPosition="left"
                  icon="address card"
                  type="file"
                  name="file"
                  placeholder="Certificate File"
                  onChange={this.handleInputChange}
                />
              </label>
            </Form.Field>
            <Button type="submit" size="huge">Submit</Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    isAdding: state.addCertificate.isAdding,
    error: state.addCertificate.error,
    isAdded: state.addCertificate.isAdded,
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
