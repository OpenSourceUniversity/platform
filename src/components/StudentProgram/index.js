import React from 'react';
import { Button, List, Header, Divider, Label, Segment, Grid, Menu, Icon, Image, Sticky, Rail } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import SubscriberItem from 'components/SubscriberItem';
import ProgramCourseItem from 'components/ProgramCourseItem';

export default class StudentProgram extends React.Component {
  renderSkills() {
    const skills = [
      {
        have_icon: false, check: true, name: 'Python', basic: true,
      },
      {
        have_icon: true, check: false, name: 'Design', basic: true,
      },
      {
        have_icon: false, check: true, name: 'Software', basic: false,
      },
      {
        have_icon: false, check: true, name: 'Python', basic: false,
      },
      {
        have_icon: false, check: true, name: 'Python', basic: false,
      },
      {
        have_icon: false, check: true, name: 'Python', basic: false,
      },
      {
        have_icon: false, check: true, name: 'Python', basic: false,
      },
    ];
    return skills.map((skill, index) => (
      <SkillItem skill={skills} key={index} />
    ));
  }


  renderCourses() {
    const courses = [
      {
        title: 'Algorithms, Part I',
        overview: 'This course covers the essential information that every serious programmer needs to know about algorithms and data structures, with emphasis on applications and scientific performance analysis of Java implementations. Part I covers elementary data structures, sorting, and searching algorithms. Part II focuses on graph- and string-processing algorithms.',
        language: 'English',
        hours: '5',
        priceEDU: '33',
        nrOfLearners: '1322',
        rating: '4.3',
        reviewers: '233',
        courseID: 'saDfInvi&5w0Sg62',
        verified: true,
      },
      {
        title: 'Algorithms, Part II',
        overview: 'Part II focuses on graph- and string-processing algorithms.',
        language: 'English',
        hours: '2',
        priceEDU: '52',
        nrOfLearners: '1322',
        rating: '4.1',
        reviewers: '33',
        courseID: 'saDfInvi&5w0Sg62',
        verified: false,
      },
    ];
    return courses.map((course, index) => (
      <ProgramCourseItem course={course} key={index} />
    ));
  }

  renderSubs() {
    const subscribers = [
      { profile_img: 'https://scontent-otp1-1.xx.fbcdn.net/v/t1.0-9/23794775_1773532865993174_3507148716845877184_n.jpg?_nc_cat=0&oh=6fe2cdd0e25bf92dc8e006f135b9622a&oe=5B5E9AB1', link: '#' },
      { profile_img: 'https://scontent-otp1-1.xx.fbcdn.net/v/t1.0-9/22688522_10213663105509248_2925755588528489151_n.jpg?_nc_cat=0&oh=58a5f70ab63bc298d6bd64b0acd56762&oe=5B9449D0', link: '#' },
      { profile_img: 'https://scontent-otp1-1.xx.fbcdn.net/v/t1.0-9/29496083_2072749406302649_5385916209195252970_n.jpg?_nc_cat=0&oh=9bd64cd534a9141a54cedbb90040f6d8&oe=5B59CE27', link: '#' },
    ];
    return subscribers.map((sub, index) => (
      <SubscriberItem subs={sub} key={index} />
    ));
  }

  renderRating(rating) {
    rating = Math.round(rating * 2) / 2;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating - i == 0.5) {
        stars.push({ name: 'star half full' });
      } else if (rating - i > 0) {
        stars.push({ name: 'star' });
      } else {
        stars.push({ name: 'empty star' });
      }
    }

    return stars.map((star, index) => (
      <Icon name={star.name} key={index} />
    ));
  }

  state = { activeItem: 'about', contextRef: '' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleContextRef = contextRef => this.setState({ contextRef })
  render() {
    const program_vals = {
      title: 'Master of Computer Science',
      secondaryTitle: 'A cutting-edge Computer Science Master’s degree from America’s most innovative university.',
      overview: 'The Master of Computer Science (MCS) degree program from Arizona State University provides high-quality computer science instruction combined with real-world experience through applied projects. You’ll gain a deep understanding of cutting-edge topics like AI, cybersecurity, and big data while you develop interpersonal skills that help you succeed in any organization.',
      objectiveTitle: 'Who is this degree for:',
      objectiveText: 'The Master of Computer Science program is designed for students with undergraduate degrees in computing or related areas who seek a deeper understanding of computing fundamentals as well as practical experience through real-world projects. Ranked in the Top 5 for graduate employment by The Wall Street Journal, a Master of Computer Science from ASU gives you the edge you need to launch a new career or move ahead in your current organization.',
      priceEDU: 1200,
      hoursPerWeek: 'N/A',
      durationInHours: 122,
      language: 'English',
      tutors: ['John Doe'],
      code: 'NF440F93Fkk34',
      nrOfLearners: 3455,
    };

    const review = '..........................';
    const vals = {
      course_title: 'Course name',
      review,
      interested: '12, 400 ',
      price: '1000 EDU',
      reviews: 1923,
      about: 'About blah blah blah',
      e_req: 'Entry Requirements blah blah blah',
      reviews: 'Reviews blah blah blah',
      link: '#',
      icon: 'https://os.university/static/assets/icons/osu-logo.png',
      rating: 3.5,
      industry: 'IT & Design',
      dates: '23.05.2018 - 23.06.2018',
      duration: '1 monnth and 2 week(s)',
      fee: '$250 or 1000 EDU tokens',
      tutor: 'blah blah',
      level: 'Beginer',
      lang: 'English',
      code: 'NF440F93Fkk34',
    };
    const { activeItem, contextRef } = this.state;
    const link_plus = '#';
    const share = '#';
    const header_img = require('../../img/programHeader.jpg');
    return (
      <div className="program" ref={this.handleContextRef}>
        <Grid columns={2}>
          <Image fluid src={header_img} />


          <Grid.Column width={13}>
            {this.renderCourses()}

            <Segment>
              <span style={{ float: 'right' }}>
                <a href={link_plus}>
                  <Icon color="black" name="plus" />
                </a>
                <a href={share}>
                  <Icon color="black" name="share alternate" />
                </a>
              </span>
              <Header>
                Reviews
              </Header>
              <span>
                {vals.review}
              </span>
              <Header>
                Skills
              </Header>
              <Label.Group size="medium">
                {this.renderSkills()}
              </Label.Group>
              <Divider hidden />
              <Label.Group circular>
                {this.renderSubs()}
                <span>
                  <span>
                    {vals.interested}
                  </span>
                  students interested
                </span>
              </Label.Group>
              <Divider hidden />
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <span>
                      Price
                    </span>
                    <br />
                    <span>
                      {vals.price}
                    </span>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Button as="a" color="green">BUY COURSE</Button>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    Reviews (<span>{vals.reviews}</span> ratings) <br />
                    {this.renderRating(vals.rating)}
                    <span>{vals.rating}</span>/5
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider hidden />
              <Menu pointing secondary color="orange">
                <Menu.Item name="about" active={activeItem === 'about'} onClick={this.handleItemClick} />
                <Menu.Item name="entry requirements" active={activeItem === 'entry requirements'} onClick={this.handleItemClick} />
                <Menu.Item name="reviews" active={activeItem === 'reviews'} onClick={this.handleItemClick} />
              </Menu>
              <div>
                {(() => {
                  switch (this.state.activeItem) {
                  case 'entry requirements': return vals.e_req;
                  case 'reviews': return vals.reviews;
                  default: return vals.about;
                  }
                })()}
              </div>
            </Segment>

            <Segment>
              <span style={{ float: 'right' }}>
                <a href={link_plus}>
                  <Icon color="black" name="plus" />
                </a>
                <a href={share}>
                  <Icon color="black" name="share alternate" />
                </a>
              </span>
              <Header>
                Reviews
              </Header>
              <span>
                {vals.review}
              </span>
              <Header>
                Skills
              </Header>
              <Label.Group size="medium">
                {this.renderSkills()}
              </Label.Group>
              <Divider hidden />
              <Label.Group circular>
                {this.renderSubs()}
                <span>
                  <span>
                    {vals.interested}
                  </span>
                  students interested
                </span>
              </Label.Group>
              <Divider hidden />
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <span>
                      Price
                    </span>
                    <br />
                    <span>
                      {vals.price}
                    </span>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Button as="a" color="green">BUY COURSE</Button>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    Reviews (<span>{vals.reviews}</span> ratings) <br />
                    {this.renderRating(vals.rating)}
                    <span>{vals.rating}</span>/5
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider hidden />
              <Menu pointing secondary color="orange">
                <Menu.Item name="about" active={activeItem === 'about'} onClick={this.handleItemClick} />
                <Menu.Item name="entry requirements" active={activeItem === 'entry requirements'} onClick={this.handleItemClick} />
                <Menu.Item name="reviews" active={activeItem === 'reviews'} onClick={this.handleItemClick} />
              </Menu>
              <div>
                {(() => {
                  switch (this.state.activeItem) {
                  case 'entry requirements': return vals.e_req;
                  case 'reviews': return vals.reviews;
                  default: return vals.about;
                  }
                })()}
              </div>
            </Segment>
          </Grid.Column>


          <Grid.Column width={3}>
            <Sticky context={contextRef} offset={140}>
              <Segment>
                <Header>
                Providers
                </Header>
                <Image centered src={vals.icon} />
                <Divider clearing />
                <span>
                  <Grid columns={2}>
                    <Grid.Column>
                      <Button as="a" color="yellow">Subscribe</Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button as="a" color="green">BUY</Button>
                    </Grid.Column>
                  </Grid>
                </span>
                <Divider clearing />
                <Header>
                Start dates
                </Header>
                <Icon name="calendar" />
                <span>
                  {vals.dates}
                </span>
                <Divider clearing />
                <Header>
                Duration
                </Header>
                <Icon name="clock" />
                <span>
                  {vals.duration}
                </span>
                <Divider clearing />
                <Header>
                Program fee
                </Header>
                <Icon name="rub" />
                <span>
                  {vals.fee}
                </span>
                <Divider clearing />
                <Header>
                Tutor
                </Header>
                <Icon name="user outline" />
                <span>
                  {vals.tutor}
                </span>
                <Divider clearing />
                <Header>
                Language
                </Header>
                <Icon name="world" />
                <span>
                  {vals.lang}
                </span>
                <Divider clearing />
                <Header>
                Program code
                </Header>
                <span>
                  {vals.code}
                </span>
              </Segment>
            </Sticky>
          </Grid.Column>


        </Grid>
      </div>
    );
  }
}
