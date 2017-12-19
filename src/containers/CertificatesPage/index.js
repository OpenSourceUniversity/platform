import React from 'react';
import { Container, Header, Grid, Segment, Button, Icon, Divider } from 'semantic-ui-react';
import CertificateItem from 'components/CertificateItem';


export default class CertificatesPage extends React.Component {
  render() {
    return (
      <Container>
        <Header size='large' floated='left'>
          Certificates
        </Header>
        <Button icon labelPosition='left' positive floated='right'>
          <Icon name='plus' />
          Add Certificate
        </Button>

        <Divider clearing />

        <Grid>
            {this.renderCertificates()}
        </Grid>

      </Container>
    )
  }

  renderCertificates() {
    const certificates = [
      {title: 'Python Development', verified: true, grade: 90},
      {title: 'Scrum Master', verified: true, grade: 80},
      {title: 'Machine Learning', verified: false, grade: 100},
      {title: 'Solidity Development', verified: true, grade: 75},
      {title: 'Unit Testing', verified: true, grade: 90},
      {title: 'Computer Vision', verified: true, grade: 100},
    ];
    return certificates.map((certificate, index) => {
      return (<Grid.Column computer={4} largeScreen={4} widescreen={4} tablet={8} mobile={8} key={index}>
        <CertificateItem certificate={certificate} />
      </Grid.Column>)
    });
  }

}
