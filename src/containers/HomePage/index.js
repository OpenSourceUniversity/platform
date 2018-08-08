import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Grid, Dimmer, Loader, Segment, Message, Button, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CourseItem from 'components/CourseItem';
import CertificateItem from 'components/CertificateItem';
import { fetchFeaturedCourses } from './actionsFeatured';
import fetchCertificates from '../../util/certificate/fetchCertificates';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';


class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchCertificates();
    this.props.fetchFeaturedCourses();
    this.props.setSecondaryNav(null);
    document.title = 'Home | OS.University';
  }

  renderFeaturedCourses() {
    return (
      this.props.courses.map((course, index) => (
        <Grid.Column
          computer={4}
          largeScreen={4}
          widescreen={4}
          tablet={4}
          mobile={16}
          key={index}

        >
          <CourseItem course={course} isNotList key={index} />
        </Grid.Column>))
    );
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
      <Container className="home-page">
        <Segment style={{ padding: '2em', minHeight: '20em' }} >
          <Header style={{ textAlign: 'center' }} size="huge">Certificates</Header>
          <Button style={{ marginBottom: '1em' }} icon labelPosition="left" positive floated="right" as={Link} to="/certificates/add">
            <Icon name="plus" />
            Add Certificate
          </Button>

          <Divider clearing />
          <Dimmer active={this.props.isFetching} inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>

          <Message error hidden={!this.props.error}>
            <p>
              {this.props.error}
            </p>
          </Message>

          <Message info hidden={this.props.certificates.length > 0 || !!this.props.error}>
            <p>
              You do not have any certificates yet. Go ahead and add some.
            </p>
          </Message>
          <Grid width={16}>
            { this.renderCertificates() }
          </Grid>
        </Segment>
        <div>
          <Header style={{ textAlign: 'center' }} size="huge">Courses</Header>
          <Grid width={16}>
            { this.renderFeaturedCourses() }
          </Grid>
          <Divider style={{ marginTop: '3em' }} clearing />
          <div style={{ textAlign: 'center' }}>
            <Button primary style={{ margin: '1em' }}as={Link} to="/courses">
              Explore all courses
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    courses: state.courses.courses,
    isFetchingCourses: state.courses.isFetching,
    errorCourses: state.courses.error,
    certificates: state.certificates.certificates,
    isFetchingCertificate: state.certificates.isFetching,
    errorCertificate: state.certificates.error,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCertificates() {
      dispatch(fetchCertificates());
    },
    fetchFeaturedCourses() {
      dispatch(fetchFeaturedCourses());
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
