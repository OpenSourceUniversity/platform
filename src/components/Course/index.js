import React from 'react';
import { Button, Header, Divider, Label, Segment, Grid, Menu, Icon, Container } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import SubscriberItem from 'components/SubscriberItem';

export default class Course extends React.Component {
  state = { activeItem: 'about' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderSkills() {
    const skills = [
      {
        have_icon: false, check: true, name: 'Python', basic: false,
      },
      {
        have_icon: false, check: false, name: 'Design', basic: false,
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
    return skills.map((course, index) => (
      <SkillItem skill={course} key={index} />
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

  renderRating(ratingNumb) {
    return (
      <div className="ui accurate star widget inline" style={{ marginRight: '10px' }}>
        <div className="highlight" style={{ width: `${(ratingNumb / 5) * 100}%` }} />
      </div>);
  }

  render() {
    const vals =
      {
        course_title: 'Course name',
        review: 'About Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at est eleifend, aliquam mi non, consequat lacus. Duis eu nisi leo. Nullam consectetur sodales arcu vel egestas. In quis nulla vitae est tincidunt vehicula. Nulla vulputate ipsum nec elit accumsan, vitae bibendum nisi tempor. Nunc scelerisque justo arcu, in vestibulum.',
        interested: '12, 400 ',
        price: '1000 EDU',
        reviews_numb: 1923,
        about: 'About Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at est eleifend, aliquam mi non, consequat lacus. Duis eu nisi leo. Nullam consectetur sodales arcu vel egestas. In quis nulla vitae est tincidunt vehicula. Nulla vulputate ipsum nec elit accumsan, vitae bibendum nisi tempor. Nunc scelerisque justo arcu, in vestibulum.',
        e_req: 'Entry Requirements Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at est eleifend, aliquam mi non, consequat lacus. Duis eu nisi leo. Nullam consectetur sodales arcu vel egestas. In quis nulla vitae est tincidunt vehicula. Nulla vulputate ipsum nec elit accumsan, vitae bibendum nisi tempor. Nunc scelerisque justo arcu, in vestibulum.',
        reviews: 'Reviews Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at est eleifend, aliquam mi non, consequat lacus. Duis eu nisi leo. Nullam consectetur sodales arcu vel egestas. In quis nulla vitae est tincidunt vehicula. Nulla vulputate ipsum nec elit accumsan, vitae bibendum nisi tempor. Nunc scelerisque justo arcu, in vestibulum.',
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
    const { activeItem } = this.state;
    const linkPlus = '#';
    const share = '#';
    return (
      <div className="course">
        <Header style={{ fontSize: '1.7em' }}>
          {vals.course_title}
        </Header>
        <Grid>
          <Grid.Column width={11}>
            <Segment style={{ padding: '40px' }}>
              <Header>
                Reviews
                <span style={{ float: 'right' }}>
                  <a href={linkPlus}>
                    <Icon color="grey" name="plus" />
                  </a>
                  <a href={share}>
                    <Icon color="grey" name="share alternate" />
                  </a>
                </span>
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
              <Label.Group>
                {this.renderSubs()}
                <span style={{
                  position: 'relative', top: '-1.4em', fontSize: '1.1rem', marginLeft: '1.3em',
                }}
                >
                  <span style={{ fontSize: '1.5rem' }}>
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
                      <b>{vals.price}</b>
                    </span>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Button as="a" color="green">BUY COURSE</Button>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    Reviews (<span><b>{vals.reviews_numb}</b></span> ratings) <br />
                    {this.renderRating(vals.rating)}
                    <span>{vals.rating}</span>/5
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider hidden />
              <Menu pointing secondary color="orange">
                <Menu.Item style={{ fontSize: '1.3em' }} name="about" active={activeItem === 'about'} onClick={this.handleItemClick} />
                <Menu.Item style={{ fontSize: '1.3em' }} name="entry requirements" active={activeItem === 'entry requirements'} onClick={this.handleItemClick} />
                <Menu.Item style={{ fontSize: '1.3em' }} name="reviews" active={activeItem === 'reviews'} onClick={this.handleItemClick} />
              </Menu>
              <Container style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                {(() => {
                  switch (this.state.activeItem) {
                  case 'entry requirements': return vals.e_req;
                  case 'reviews': return vals.reviews;
                  default: return vals.about;
                  }
                })()}
              </Container>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment style={{ padding: '40px' }}>
              <div style={{ textAlign: 'center' }}>
                <Header style={{ fontSize: '1.5em' }}>
                  Provider
                </Header>
                <Label
                  as="a"
                  href={vals.link}
                  circular
                  style={{
                    boxShadow: '2px 6px 20px 0 #bcbdbd, 0 1px 21px 1px #d4d4d5', width: '8em', height: '8em', backgroundColor: 'white', backgroundImage: `url(${vals.icon})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '80%',
                  }}
                />
              </div>
              <Divider clearing />
              <Header style={{ fontSize: '1.5em', marginBottom: '5px' }}>
                Course dates
              </Header>
              <Icon name="calendar" />
              <span style={{ color: 'grey' }} >
                {vals.dates}
              </span>
              <Divider clearing />
              <Header style={{ fontSize: '1.5em', marginBottom: '5px' }}>
                Course duration
              </Header>
              <Icon name="clock" />
              <span style={{ color: 'grey' }} >
                {vals.duration}
              </span>
              <Divider clearing />
              <Header style={{ fontSize: '1.5em', marginBottom: '5px' }}>
                Course fee
              </Header>
              <Icon name="rub" />
              <span style={{ color: 'grey' }} >
                {vals.fee}
              </span>
              <Divider clearing />
              <Header style={{ fontSize: '1.5em', marginBottom: '5px' }}>
                Tutor
              </Header>
              <Icon name="user outline" />
              <span style={{ color: 'grey' }} >
                {vals.tutor}
              </span>
              <Divider clearing />
              <Header style={{ fontSize: '1.5em', marginBottom: '5px' }}>
                Language
              </Header>
              <Icon name="world" />
              <span style={{ color: 'grey' }} >
                {vals.lang}
              </span>
              <Divider clearing />
              <Header style={{ fontSize: '1.5em', marginBottom: '5px' }}>
                Level
              </Header>
              <Icon name="signal" />
              <span style={{ color: 'grey' }} >
                {vals.level}
              </span>
              <Divider clearing />
              <Header style={{ fontSize: '1.5em', marginBottom: '5px' }}>
                Course code
              </Header>
              <span style={{ color: 'grey' }} >
                {vals.code}
              </span>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
