import React from 'react';
import { Container, Header, Grid, Button, Message, Divider, Breadcrumb, Form } from 'semantic-ui-react';
import CertificateItem from 'components/CertificateItem';


export default class AddCertificatePage extends React.Component {
  render() {
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href='/#/'>Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section href='/#/certificates'>Certificates</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section active>Add certificate</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size='large' floated='left'>
          Add certificate
        </Header>

        <Divider clearing />


        <Grid>
          <Grid.Column width={10}>
            <Form size='huge'>
              <Form.Field>
                <label>Certificate name</label>
                <input placeholder='Certificate name' />
              </Form.Field>
              <Form.Field>
                <label>Academy address</label>
                <input placeholder='Academy address' />
              </Form.Field>
              <Form.Field>
                <label>Issuing date</label>
                <input placeholder='Issuing date' />
              </Form.Field>
              <Form.Field>
                <label>Expiration date</label>
                <input placeholder='Expiration date' />
              </Form.Field>
              <Form.Field>
                <label>Skills</label>
                <input placeholder='Skills' />
              </Form.Field>
              <Button type='submit' size='huge'>Submit</Button>
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
    )
  }

}
