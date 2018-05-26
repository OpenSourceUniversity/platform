import React from 'react';
import { Grid, Image, Sticky } from 'semantic-ui-react';
import ProgramCourseItem from 'components/ProgramCourseItem';
import ProgramOverview from 'components/StudentProgramOverview';
import ProgramSlide from 'components/StudentProgramSlide';

export default class StudentProgram extends React.Component {
  state = { contextRef: '' }
  handleContextRef = contextRef => this.setState({ contextRef })

  renderCourses() {
    const courses = [
      {
        title: 'Algorithms, Part I',
        overview: 'This course covers the essential information that every serious programmer needs to know about algorithms and data structures, with emphasis on applications and scientific performance analysis of Java implementations. Part I covers elementary data structures, sorting, and searching algorithms. Part II focuses on graph- and string-processing algorithms.',
        language: 'English',
        hours: 5,
        priceEDU: 33,
        nrOfLearners: 1322,
        rating: 4.3,
        reviewers: 233,
        courseID: 'saDfInvi&5w0Sg62',
        verified: true,
      },
      {
        title: 'Algorithms, Part II',
        overview: 'Part II focuses on graph- and string-processing algorithms.',
        language: 'English',
        hours: 2,
        priceEDU: 52,
        nrOfLearners: 1322,
        rating: 4.1,
        reviewers: 33,
        courseID: 's885nvi&5wfsa2',
        verified: false,
      },
    ];
    return courses.map((course, index) => (
      <ProgramCourseItem course={course} key={index} />
    ));
  }

  renderProgramInfo() {
    const programVals = [{
      title: 'Master of Computer Science',
      secondaryTitle: 'A cutting-edge Computer Science Master’s degree from America’s most innovative university',
      overview: 'The Master of Computer Science (MCS) degree program from Arizona State University provides high-quality computer science instruction combined with real-world experience through applied projects. You’ll gain a deep understanding of cutting-edge topics like AI, cybersecurity, and big data while you develop interpersonal skills that help you succeed in any organization.',
      objectiveTitle: 'Who is this degree for',
      objectiveText: 'The Master of Computer Science program is designed for students with undergraduate degrees in computing or related areas who seek a deeper understanding of computing fundamentals as well as practical experience through real-world projects. Ranked in the Top 5 for graduate employment by The Wall Street Journal, a Master of Computer Science from ASU gives you the edge you need to launch a new career or move ahead in your current organization.',
    }];

    return programVals.map((val, index) => (
      <ProgramOverview info={val} key={index} />
    ));
  }

  renderProgramRightSlide() {
    const programSlide = [{
      issuerIcon: ['https://os.university/static/assets/icons/osu-logo.png'],
      rating: 3.5,
      industry: 'IT & Design',
      duration: '23.05.2018 - 23.06.2018',
      priceEDU: 1200,
      hoursPerWeek: 'N/A',
      durationInHours: 122,
      language: 'English',
      tutors: ['John Doe'],
      code: 'NF440F93Fkk34',
    }];

    return programSlide.map((val, index) => (
      <ProgramSlide info={val} key={index} />
    ));
  }


  render() {
    const { contextRef } = this.state;
    /* eslint-disable global-require */
    const headerImage = require('../../img/programHeader.jpg');
    /* eslint-enable global-require */

    return (
      <div className="program" ref={this.handleContextRef}>
        <Grid columns={2}>
          <Image fluid src={headerImage} />
          <Grid.Column width={13}>
            { this.renderProgramInfo() }
            { this.renderCourses() }
          </Grid.Column>
          <Grid.Column width={3}>
            <Sticky context={contextRef} offset={140}>
              { this.renderProgramRightSlide()}
            </Sticky>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
