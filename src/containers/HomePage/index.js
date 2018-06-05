import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Grid, Segment, Image } from 'semantic-ui-react';
import CourseItem from 'components/CourseItem';
import StudentProgramItem from 'components/StudentProgramItem';


class HomePage extends React.Component {
  renderCourses() {
    const courses = [
      {
        title: 'Python Development', imgSrc: '', isList: false, categories: [{ name: 'test' }], level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Scrum Master', isList: false, categories: [{ name: 'test' }], level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Machine Learning', isList: false, categories: [{ name: 'test' }], level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
      {
        title: 'Solidity Development', isList: false, categories: [{ name: 'test' }], level: 'Beginer', language: 'English', duration: '4 weeks', rating: '4.5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet vulputate risus. Suspendisse iaculis consectetur metus. Orci varius natoque penatibus et magnis dis parturient',
      },
    ];
    return courses.map((certificate, index) => (
      <Grid.Column
        computer={4}
        largeScreen={4}
        widescreen={4}
        tablet={4}
        mobile={8}
        key={index}
      >
        <CourseItem style={{ textAlign: 'center' }} certificate={certificate} key={index} />
      </Grid.Column>));
  }

  renderPrograms() {
    const programsInfo = [
      {
        title: 'Bachalor in science in Computer Science',
        overviewTitle: 'A cutting-edge Computer Science Master’s degree from America’s most innovative university.',
        overviewDescription: 'The Master of Computer Science (MCS) degree program from Arizona State University provides high-quality computer science.',
        objectiveTitle: 'Who is this degree for:',
        objectiveText: 'The Master of Computer Science program is designed for students with undergraduate degrees in computing or related areas who seek a deeper understanding of computing fundamentals as ...',
        language: 'English',
        duration: '4 weeks',
        rating: '4.5',
        location: 'Compleately online',
      },
      {
        title: 'Master of Applied Data Science',
        overviewTitle: 'Computer Data Science Master’s degree from America’s most innovative university.',
        overviewDescription: 'The Master of Computer Science (MCS) degree program from Arizona State University provides high-quality computer science.',
        objectiveTitle: 'Who is this degree for:',
        objectiveText: 'The Master of Computer Science program is designed for students with undergraduate degrees in computing or related areas who seek a deeper understanding of computing fundamentals as ...',
        language: 'English',
        duration: '10 weeks',
        rating: '4.1',
        location: 'Compleately online',
      },
      {
        title: 'Bachalor in science in Computer Science',
        overviewTitle: 'A cutting-edge Computer Science Master’s degree from America’s most innovative university.',
        overviewDescription: 'The Master of Computer Science (MCS) degree program from Arizona State University provides high-quality computer science.',
        objectiveTitle: 'Who is this degree for:',
        objectiveText: 'The Master of Computer Science program is designed for students with undergraduate degrees in computing or related areas who seek a deeper understanding of computing fundamentals as ...',
        language: 'English',
        duration: '4 weeks',
        rating: '4.5',
        location: 'Compleately online',
      },
      {
        title: 'Master of Applied Data Science',
        overviewTitle: 'Computer Data Science Master’s degree from America’s most innovative university.',
        overviewDescription: 'The Master of Computer Science (MCS) degree program from Arizona State University provides high-quality computer science.',
        objectiveTitle: 'Who is this degree for:',
        objectiveText: 'The Master of Computer Science program is designed for students with undergraduate degrees in computing or related areas who seek a deeper understanding of computing fundamentals as ...',
        language: 'English',
        duration: '10 weeks',
        rating: '4.1',
        location: 'Compleately online',
      },
    ];
    return programsInfo.map((programs, index) => (
      <Grid.Column
        computer={4}
        largeScreen={4}
        widescreen={4}
        tablet={4}
        mobile={8}
        key={index}
      >
        <StudentProgramItem programe={programs} key={index} />
      </Grid.Column>));
  }

  render() {
    /* eslint-disable global-require */
    const RigaTU = require('../../img/university1.png');
    const BrnoTU = require('../../img/university2.png');
    const SofiaSU = require('../../img/university4.png');
    const SofiaEco = require('../../img/university5.png');
    const NBU = require('../../img/university6.png');
    const SofiaTU = require('../../img/tu-sofia.png');
    const LondonUni = require('../../img/london-ac.png');
    const ADA = require('../../img/ada-ac.png');
    // const TsinghuaUni = require('../../img/tsinghua.png');
    return (
      <Container>
        <Header size="huge">Home</Header>
        <Header style={{ textAlign: 'center' }} size="huge">Universities</Header>
        <Grid width={16}>
          <Grid.Column
            computer={2}
            largeScreen={2}
            widescreen={2}
            tablet={2}
            mobile={2}
          >
            <Segment>
              <Image as="a" href="#" target="_blank" style={{ width: '100%', height: '98px' }} alt="" src={RigaTU} />
            </Segment>
          </Grid.Column>
          <Grid.Column
            computer={2}
            largeScreen={2}
            widescreen={2}
            tablet={2}
            mobile={2}
          >
            <Segment>
              <Image as="a" href="#" target="_blank" style={{ width: '100%', height: '98px' }} alt="" src={BrnoTU} />
            </Segment>
          </Grid.Column>
          <Grid.Column
            computer={2}
            largeScreen={2}
            widescreen={2}
            tablet={2}
            mobile={2}
          >
            <Segment>
              <Image as="a" href="#" target="_blank" style={{ width: '100%', height: '98px' }} alt="" src={SofiaSU} />
            </Segment>
          </Grid.Column>
          <Grid.Column
            computer={2}
            largeScreen={2}
            widescreen={2}
            tablet={2}
            mobile={2}
          >
            <Segment>
              <Image as="a" href="#" target="_blank" style={{ width: '100%', height: '98px' }} alt="" src={SofiaEco} />
            </Segment>
          </Grid.Column>
          <Grid.Column
            computer={2}
            largeScreen={2}
            widescreen={2}
            tablet={2}
            mobile={2}
          >
            <Segment>
              <Image as="a" href="#" target="_blank" style={{ width: '100%', height: '98px' }} alt="" src={NBU} />
            </Segment>
          </Grid.Column>
          <Grid.Column
            computer={2}
            largeScreen={2}
            widescreen={2}
            tablet={2}
            mobile={2}
          >
            <Segment>
              <Image as="a" href="#" target="_blank" style={{ width: '100%', height: '98px' }} alt="" src={SofiaTU} />
            </Segment>
          </Grid.Column>
          <Grid.Column
            computer={2}
            largeScreen={2}
            widescreen={2}
            tablet={2}
            mobile={2}
          >
            <Segment>
              <Image as="a" href="#" target="_blank" style={{ width: '100%', height: '98px' }} alt="" src={LondonUni} />
            </Segment>
          </Grid.Column>

          <Grid.Column
            computer={2}
            largeScreen={2}
            widescreen={2}
            tablet={2}
            mobile={2}
          >
            <Segment>
              <Image as="a" href="#" target="_blank" style={{ width: '100%', height: '98px' }} alt="" src={ADA} />
            </Segment>
          </Grid.Column>
        </Grid>
        <Header style={{ textAlign: 'center' }} size="huge">Top Courses</Header>
        <Grid width={16}>
          { this.renderCourses() }
        </Grid>
        <Header style={{ textAlign: 'center' }} size="huge">Top Programs</Header>
        <Grid width={16}>
          { this.renderPrograms() }
        </Grid>
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
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCourses(url) {
      dispatch(fetchCourses(url));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
