import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Grid, Button, Icon, Divider, Breadcrumb, Loader, Message, Dimmer } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CertificateItem from 'components/CertificateItem';
import { fetchCertificates } from './actions';


class CertificatesPage extends React.Component {
  componentDidMount() {
    this.props.fetchCertificates();
  }

  renderCertificates() {
    return this.props.certificates.map((certificate, index) => (
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

        <Dimmer active={this.props.isFetching} inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>

        <Message info hidden={this.props.certificates.length > 0}>
          <p>
            You do not have any certificates yet. Go ahead and add some.
          </p>
        </Message>

        <Grid>
          {this.renderCertificates()}
        </Grid>

      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    certificates: state.certificates.certificates,
    isFetching: state.certificates.isFetching,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCertificates() {
      dispatch(fetchCertificates());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CertificatesPage);
