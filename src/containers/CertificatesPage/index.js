import React from 'react';
import { Container, Header, Grid, Button, Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CertificateItem from 'components/CertificateItem';


export default class CertificatesPage extends React.Component {
  renderCertificates() {
    const certificates = [
      { title: 'Python Development', verified: true, grade: 90 },
      { title: 'Scrum Master', verified: true, grade: 80 },
      { title: 'Machine Learning', verified: false, grade: 100 },
      { title: 'Solidity Development', verified: true, grade: 75 },
      { title: 'Unit Testing', verified: true, grade: 90 },
      { title: 'Computer Vision', verified: true, grade: 100 },
    ];
    return certificates.map((certificate, index) => (
      <Grid.Column
        computer={4}
        largeScreen={4}
        widescreen={4}
        tablet={8}
        mobile={16}
        key={index}
      >
        <CertificateItem certificate={certificate} key={index} />
      </Grid.Column>
    ));
  }

  render() {
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Certificates</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size="large" floated="left">
          Certificates
        </Header>
        <Button icon labelPosition="left" positive floated="right" as={Link} to="/certificates/add">
          <Icon name="plus" />
          Add Certificate
        </Button>

        <Divider clearing />

        <Grid>
          {this.renderCertificates()}
        </Grid>

      </Container>
    );
  }
}
