import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Grid, Dimmer, Loader, Segment, Message, Button, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CourseItem from 'components/CourseItem';
import CertificateItem from 'components/CertificateItem';
import { fetchCertificates } from '../CertificatesPage/actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';


class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchCertificates();
    this.props.setSecondaryNav(null);
  }

  renderCourses() {
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
            <Grid.Column
              computer={4}
              largeScreen={4}
              widescreen={4}
              tablet={4}
              mobile={16}
            >
              <CourseItem
                course={{
                  imgSrc: 'https://www.edx.org/sites/default/files/course/image/promoted/haskell_home_378x225.jpg',
                  language: 'English',
                  title: 'Introduction to Functional Programming',
                  categories: [{ name: 'Programming' }],
                  duration: '7 weeks',
                  rating: 5.0,
                  tutor: 'Erik Meijer',
                  avatarSrc: 'https://www.edx.org/sites/default/files/person/image/erik_meijer_110p.jpg',
                  id: 'fc01f5ba-c59f-49a2-b75b-4cd9f0d86b02',
                }}
                isNotList
              />
            </Grid.Column>
            <Grid.Column
              computer={4}
              largeScreen={4}
              widescreen={4}
              tablet={4}
              mobile={16}
            >
              <CourseItem
                course={{
                  imgSrc: 'https://udemy-images.udemy.com/course/240x135/857744_1928_2.jpg',
                  language: 'English',
                  title: 'Business Growth Strategy',
                  categories: [{ name: 'Business' }],
                  duration: '4 weeks',
                  rating: 4.7,
                  tutor: 'Michael J. Lenox',
                  avatarSrc: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/34/398f9bb4f08c2b978affd9f8d04e19/Mike-Lenox__F3B3111.jpg?auto=format%2Ccompress&dpr=1&w=88&h=88&fit=crop',
                  id: 'fbf60904-ed6f-4674-a086-ce877a810795',
                }}
                isNotList
              />
            </Grid.Column>
            <Grid.Column
              computer={4}
              largeScreen={4}
              widescreen={4}
              tablet={4}
              mobile={16}
            >
              <CourseItem
                course={{
                  imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1FU-b5cSchtA33cnDhAoDQHnGRRaskw2kVJ00RNL_D039SliZSQ',
                  language: 'English',
                  title: 'Research Report: Delivering Insights',
                  categories: [{ name: 'Business' }],
                  duration: '4 weeks',
                  rating: 3.6,
                  tutor: 'Robin Boyar',
                  avatarSrc: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/73/2879507de311e7ad16ffc81e5225aa/robinsquare.jpg?auto=format%2Ccompress&dpr=1&w=88&h=88&fit=crop',
                  id: 'fb0fd7d8-4569-4b98-8d29-9a5e1a67f759',
                }}
                isNotList
              />
            </Grid.Column>
            <Grid.Column
              computer={4}
              largeScreen={4}
              widescreen={4}
              tablet={4}
              mobile={16}
            >
              <CourseItem
                course={{
                  imgSrc: 'data:image/jpeg;base64,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',
                  language: 'English',
                  title: 'Mastering the Software Engineering Interview',
                  categories: [{ name: 'Programming' }],
                  duration: '4 weeks',
                  rating: 4.6,
                  tutor: 'Mia Minnes',
                  avatarSrc: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/e7/806b403d2711e5b44f752682341f65/Headshot.jpg?auto=format%2Ccompress&dpr=1&w=88&h=88&fit=crop',
                  id: 'fb0c5ac7-76c7-4574-b5f9-0a8c230b3304',
                }}
                isNotList
              />
            </Grid.Column>
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
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
