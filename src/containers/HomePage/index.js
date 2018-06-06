import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Grid, Dimmer, Loader, Segment, Message } from 'semantic-ui-react';
import CourseItem from 'components/CourseItem';
import { fetchCourses } from '../CoursesPage/actions';
import { fetchCertificates } from '../CertificatesPage/actions';


class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchCourses();
    this.props.fetchCertificates();
  }

  renderCourses() {
    return (
      this.props.courses.map((certificate, index) => (
        <Grid.Column
          computer={4}
          largeScreen={4}
          widescreen={4}
          tablet={4}
          mobile={16}
          key={index}
        >
          <CourseItem certificate={certificate} isNotList key={index} />
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
      <Container>
        <Segment style={{ padding: '20px' }} >
          <Header style={{ textAlign: 'center' }} size="huge">Courses</Header>
          <Grid width={16}>
            { this.renderCourses() }
            <Dimmer active={this.props.isFetching} inverted>
              <Loader size="large">Loading</Loader>
            </Dimmer>
          </Grid>
        </Segment>
        <Segment style={{ padding: '20px', minHeight: '300px' }} >
          <Header style={{ textAlign: 'center' }} size="huge">Certificates</Header>
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
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    courses: state.courses.courses,
    isFetching: state.courses.isFetching,
    error: state.courses.error,
    next: state.courses.next,
    certificates: state.certificates.certificates,
    isFetchingCertificate: state.certificates.isFetching,
    errorCertificate: state.certificates.error,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCourses(url) {
      dispatch(fetchCourses('http://localhost:8000/api/v1/courses/?offset=4&limit=4'));
    },
    fetchCertificates() {
      dispatch(fetchCertificates());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
