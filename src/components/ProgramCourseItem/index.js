import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, List, Header, Divider, Label, Segment, Grid, Menu, Icon, Image, Sticky, Rail, Container } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import SubscriberItem from 'components/SubscriberItem';

export default class ProgramCourseItem extends React.Component {

  renderSkills() {
    const skills = [
      { have_icon: false, check: true, name: 'Python', basic: false },
      { have_icon: false, check: false, name: 'Design', basic: false },
      { have_icon: false, check: true, name: 'Java', basic: false },
      { have_icon: false, check: true, name: 'Ruby', basic: false },
    ];

    return skills.map((course, index) => (
        <SkillItem skill={course} key={index} />
    ));
  }

  renderRating(rating) {
    rating = Math.round(rating*2)/2;
    var stars = [];
    for (var i = 0; i < 5; i++) {
      if(rating - i == 0.5) {
        stars.push({name: 'star half full'});
      } else if (rating - i > 0) {
        stars.push({name: 'star'});
      } else {
        stars.push({name: 'empty star'});
      }
    }

    return stars.map((star, index) => (
        <Icon name={star.name} key={index} />
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



  render() {
    return (

              <Segment>

                <Grid.Row>
                  <Label color={ this.props.course.verified ? 'green' : 'orange' } ribbon>
                    { this.props.course.verified ? 'Verified' : 'Not verified' }
                  </Label>
                  <Label color='blue' corner='right' icon='heart' />
                  <Header as='h2' textAlign='center' color='orange'>
                    { this.props.course.title }
                    <Divider fitted />
                  </Header>
                </Grid.Row>

                <Header as='h3'>
                  Overview
                </Header>
                <span>
                  { this.props.course.overview }
                </span>
                <Header as='h5'>
                  Skills
                </Header>
                <Label.Group size='medium'>
                  {this.renderSkills()}
                </Label.Group>
                <br/>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={6} centered>
                      <Header as='h5'>
                        Learners
                        { ' ( ' + this.props.course.nrOfLearners + ' )'}
                      </Header>
                      <Label.Group circular>
                        { this.renderSubs() }
                      </Label.Group>
                    </Grid.Column>
                    <Grid.Column width={6} >
                      <Header as='h5'>
                        Reviews
                        { ' ( ' + this.props.course.reviewers + ' raitings) '}
                      </Header>
                      {this.renderRating(this.props.course.rating)}
                      <span>{this.props.course.rating}</span>/5
                    </Grid.Column>
                    <Grid.Column width={4} centered>
                      <Header as='h5'>
                        Price
                      </Header>
                      <span>
                        { this.props.course.priceEDU + ' EDU'}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>




              </Segment>


    );
  }
}

// title: 'Algorithms, Part II',
//         overview: 'Part II focuses on graph- and string-processing algorithms.',
//         language: 'English',
//         hours: '2',
//         priceEDU: '52',
//         nrOfLearners: '1322',
//         rating: '4.1' ,
//         reviewers: '33',
//         courseID: 'saDfInvi&5w0Sg62'



// class ProgramCourseItemWithoutRouter extends React.Component {
//
//   render() {
//     // const level = this.props.certificate.level;
//     // const language = this.props.certificate.language;
//     // const duration = this.props.certificate.duration;
//     // const rating = this.props.certificate.rating;
//     // const description = this.props.certificate.description;
//     // let profile = require('../../icons/account_profile.svg');
//     return (
//       // <Segment>
//         <Header>
//           Fucking shit
//           // { this.props.course.title }
//         </Header>
//       //   <span>
//       //     {vals.review}
//       //   </span>
//       //   <Header>
//       //     Skills
//       //   </Header>
//       //   <Label.Group size='medium'>
//       //     {this.renderSkills()}
//       //   </Label.Group>
//       //   <Divider hidden />
//       //   <Label.Group circular>
//       //     {this.renderSubs()}
//       //     <span>
//       //       <span>
//       //         {vals.interested}
//       //       </span>
//       //       students interested
//       //     </span>
//       //   </Label.Group>
//       //   <Divider hidden />
//       //   <Grid>
//       //     <Grid.Row>
//       //       <Grid.Column width={4}>
//       //         <span>
//       //           Price
//       //         </span>
//       //         <br/>
//       //         <span>
//       //           {vals.price}
//       //         </span>
//       //       </Grid.Column>
//       //       <Grid.Column width={6}>
//       //         <Button as='a' color='green'>BUY COURSE</Button>
//       //       </Grid.Column>
//       //       <Grid.Column width={6}>
//       //         Reviews (<span>{vals.reviews}</span> ratings) <br/>
//       //         {this.renderRating(vals.rating)}
//       //         <span>{vals.rating}</span>/5
//       //       </Grid.Column>
//       //     </Grid.Row>
//       //   </Grid>
//       //   <Divider hidden />
//       //   <div>
//       //    {(() => {
//       //     switch(this.state.activeItem) {
//       //     case 'entry requirements': return vals.e_req;
//       //     case 'reviews': return vals.reviews;
//       //     default: return vals.about;
//       //     }
//       //   })()}
//       //   </div>
//       // </Segment>
//
//
//     );
//   }
// }
//
// const ProgramCourseItem = withRouter(ProgramCourseItemWithoutRouter);
//
// export default ProgramCourseItem;
