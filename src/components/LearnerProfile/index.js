import React from 'react';
import { Header, Divider, Grid, Sticky, Segment, Image, List, Button, Statistic, Label } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';

const square = { width: 175, height: 175 };

export default class LearnerProfile extends React.Component {
  renderSkills() {
    const skills = [
      {
        have_icon: true, check: true, name: 'Python', basic: true,
      },
      {
        have_icon: true, check: false, name: 'Design', basic: true,
      },
      {
        have_icon: true, check: true, name: 'Software', basic: true,
      },
      {
        have_icon: true, check: true, name: 'Python', basic: true,
      },
      {
        have_icon: true, check: true, name: 'Python', basic: true,
      },
      {
        have_icon: true, check: true, name: 'Python', basic: true,
      },
      {
        have_icon: true, check: true, name: 'Python', basic: true,
      },
    ];
    return skills.map((course, index) => (
      <SkillItem skill={course} key={index} />
    ));
  }

  render() {
    const profilePicture = this.props.learner.profile_src;
    /* eslint-disable global-require */

    const token = require('../../icons/edu_token.svg');

    /* eslint-enable global-require */

    const email = `mailto:${this.props.learner.email}`;
    const site = `http://${this.props.learner.site}`;

    // name
    // position
    // email
    // site
    // certificates
    // courses
    // skills
    // reviews
    // introduction


    return (
      <div>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Sticky offset={150}>
              <Segment.Group className="profileSegment">
                <Segment textAlign="center">
                  <Segment textAlign="center" circular className="profilePicSegment" style={{ width: 175, height: 175, backgroundImage: 'url(' + profilePicture + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center center' }}/>
                  <Header size="large">
                    {this.props.learner.name}
                  </Header>
                  <Header size="small" color="grey">
                    {this.props.learner.position}
                  </Header>
                </Segment>
                <Segment>
                  <Button
                    primary
                    size="large"
                    className="fluid"
                    content="Contact"
                    icon="mail outline"
                    label={{
                      image: token, as: 'a', basic: true, pointing: 'right', content: `${this.props.learner.edu} EDU`,
                    }}
                    labelPosition="left"
                  />
                </Segment>
                <Segment>
                  <List>
                    <List.Item icon="users" content={this.props.learner.specialisation} />
                    <List.Item icon="marker" content={this.props.learner.location} />
                    <List.Item icon="mail" content={<a href={email}>{this.props.learner.email}</a>} />
                    <List.Item icon="linkify" content={<a href={site}>{this.props.learner.site}</a>} />
                  </List>
                </Segment>
                <Segment>
                  <Statistic.Group size="tiny" color="orange" horizontal>
                    <Statistic>
                      <Statistic.Value>{this.props.learner.certificates}</Statistic.Value>
                      <Statistic.Label>Certificates</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>{this.props.learner.courses}</Statistic.Value>
                      <Statistic.Label>Courses</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>{this.props.learner.skills}</Statistic.Value>
                      <Statistic.Label>Skills</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>{this.props.learner.reviews}</Statistic.Value>
                      <Statistic.Label>Reviews</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                </Segment>
              </Segment.Group>
            </Sticky>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={11}>
            <Segment size="large">
              <Header>
                Introduction
              </Header>
              <Divider clearing />
              {this.props.learner.introduction}
              <Header>
                Certificates
              </Header>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque ut nunc sed aliquet. Integer tellus libero, condimentum ut tincidunt et, varius quis tortor. In in turpis vel velit porta semper id eget lorem. Sed in nisl sed augue ornare dignissim. Nunc quis laoreet est. Sed iaculis ut odio nec vestibulum. Vivamus at lorem sapien. Praesent aliquam, magna eu dapibus pharetra, arcu erat dictum mauris, quis malesuada nisl odio porta lorem. Integer vel odio vel metus mattis maximus. Quisque fringilla nisi lacus, id pretium est tristique feugiat. Duis faucibus mauris vitae tellus porta gravida. Aenean tristique nisi magna, laoreet porta justo scelerisque ut. Duis interdum augue purus, eu iaculis metus ultricies nec. Vestibulum aliquam vulputate nisl ac gravida.
              <Divider clearing />

              <Header>
                Skills
              </Header>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque ut nunc sed aliquet. Integer tellus libero, condimentum ut tincidunt et, varius quis tortor. In in turpis vel velit porta semper id eget lorem. Sed in nisl sed augue ornare dignissim. Nunc quis laoreet est. Sed iaculis ut odio nec vestibulum. Vivamus at lorem sapien. Praesent aliquam, magna eu dapibus pharetra, arcu erat dictum mauris, quis malesuada nisl odio porta lorem. Integer vel odio vel metus mattis maximus. Quisque fringilla nisi lacus, id pretium est tristique feugiat. Duis faucibus mauris vitae tellus porta gravida. Aenean tristique nisi magna, laoreet porta justo scelerisque ut. Duis interdum augue purus, eu iaculis metus ultricies nec. Vestibulum aliquam vulputate nisl ac gravida.
              <Divider clearing />
              <Label.Group size="large">
                {this.renderSkills()}
              </Label.Group>
            </Segment>
            <Segment.Group size="large">
              <Segment>
                <Header>
                  Experience
                </Header>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque ut nunc sed aliquet. Integer tellus libero, condimentum ut tincidunt et, varius quis tortor. In in turpis vel velit porta semper id eget lorem. Sed in nisl sed augue ornare dignissim. Nunc quis laoreet est. Sed iaculis ut odio nec vestibulum. Vivamus at lorem sapien. Praesent aliquam, magna eu dapibus pharetra, arcu erat dictum mauris, quis malesuada nisl odio porta lorem. Integer vel odio vel metus mattis maximus. Quisque fringilla nisi lacus, id pretium est tristique feugiat. Duis faucibus mauris vitae tellus porta gravida. Aenean tristique nisi magna, laoreet porta justo scelerisque ut. Duis interdum augue purus, eu iaculis metus ultricies nec. Vestibulum aliquam vulputate nisl ac gravida.
                <Divider clearing />
              </Segment>
              <Segment>
                <Header>
                  Education
                </Header>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque ut nunc sed aliquet. Integer tellus libero, condimentum ut tincidunt et, varius quis tortor. In in turpis vel velit porta semper id eget lorem. Sed in nisl sed augue ornare dignissim. Nunc quis laoreet est. Sed iaculis ut odio nec vestibulum. Vivamus at lorem sapien. Praesent aliquam, magna eu dapibus pharetra, arcu erat dictum mauris, quis malesuada nisl odio porta lorem. Integer vel odio vel metus mattis maximus. Quisque fringilla nisi lacus, id pretium est tristique feugiat. Duis faucibus mauris vitae tellus porta gravida. Aenean tristique nisi magna, laoreet porta justo scelerisque ut. Duis interdum augue purus, eu iaculis metus ultricies nec. Vestibulum aliquam vulputate nisl ac gravida.
                <Divider clearing />
              </Segment>
            </Segment.Group>
            <Segment size="large">
              <Header>
                Reviews
              </Header>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque ut nunc sed aliquet. Integer tellus libero, condimentum ut tincidunt et, varius quis tortor. In in turpis vel velit porta semper id eget lorem. Sed in nisl sed augue ornare dignissim. Nunc quis laoreet est. Sed iaculis ut odio nec vestibulum. Vivamus at lorem sapien. Praesent aliquam, magna eu dapibus pharetra, arcu erat dictum mauris, quis malesuada nisl odio porta lorem. Integer vel odio vel metus mattis maximus. Quisque fringilla nisi lacus, id pretium est tristique feugiat. Duis faucibus mauris vitae tellus porta gravida. Aenean tristique nisi magna, laoreet porta justo scelerisque ut. Duis interdum augue purus, eu iaculis metus ultricies nec. Vestibulum aliquam vulputate nisl ac gravida.
              <Divider clearing />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
