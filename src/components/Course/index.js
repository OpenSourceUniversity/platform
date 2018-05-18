import React from 'react';
import { Button, Header, Divider, Label, Segment, Grid, Menu, Icon, Image } from 'semantic-ui-react';
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
    const rating = Math.round(ratingNumb * 2) / 2;
    const stars = [];
    for (let i = 0; i < 5; i += 1) {
      if (rating - i === 0.5) {
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

  render() {
    const review = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et egestas leo. Aliquam ultricies libero orci, quis malesuada massa posuere quis. Mauris eget ullamcorper elit, et faucibus sem. Aliquam maximus.';
    const vals =
      {
        course_title: 'Course name',
        review,
        interested: '12, 400 ',
        price: '1000 EDU',
        reviews_numb: 1923,
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
    const { activeItem } = this.state;
    const linkPlus = '#';
    const share = '#';
    return (
      <div className="course">
        <Header>
          {vals.course_title}
        </Header>
        <Grid>
          <Grid.Column width={11}>
            <Segment>
              <span style={{ float: 'right' }}>
                <a href={linkPlus}>
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
                    Reviews (<span>{vals.reviews_numb}</span> ratings) <br />
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
          <Grid.Column width={5}>
            <Segment>
              <Header>
                Provider
              </Header>
              <Divider hidden />
              <Image src={vals.icon} as="a" href={vals.link} />
              <Divider clearing />
              <Header>
                Course dates
              </Header>
              <Icon name="calendar" />
              <span>
                {vals.dates}
              </span>
              <Divider clearing />
              <Header>
                Course duration
              </Header>
              <Icon name="clock" />
              <span>
                {vals.duration}
              </span>
              <Divider clearing />
              <Header>
                Course fee
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
                Level
              </Header>
              <Icon name="signal" />
              <span>
                {vals.level}
              </span>
              <Divider clearing />
              <Header>
                Course code
              </Header>
              <span>
                {vals.code}
              </span>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
