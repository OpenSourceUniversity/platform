import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Grid, Sticky, Segment, List, Statistic, Dimmer, Loader, Message } from 'semantic-ui-react';
import getProfileView from '../../util/profiles/getProfileView';

/* eslint-disable camelcase */
class ViewLearnerProfile extends React.Component {
  componentDidMount() {
    this.props.getProfileView('learner', this.props.eth_address);
  }

  render() {
    const avatarPlaceholder = 'data:image/jpeg;base64,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';
    const email = `mailto:${this.props.learner.learner_email}`;
    const site = `${this.props.learner.learner_site}`;
    const phoneNumber = `tel:${this.props.learner.phone_number}`;
    return (
      <div>
        <Dimmer active={this.props.profileViewIsFetching} inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
        <Dimmer
          active={!!(this.props.profileViewError) || !(this.props.learner.first_name)}
          inverted
        >
          {this.props.isPublic ?
            (
              <Message negative>
                <Message.Header>Can&apos;t load this profile</Message.Header>
                <p>Please, check the ETH address</p>
              </Message>)
            :
            (
              <Message warning>
                <Message.Header>This profile is private</Message.Header>
                <p>*Some info*</p>
              </Message>)
          }
        </Dimmer>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Sticky offset={150}>
              <Segment.Group className="profileSegment">
                <Segment textAlign="center">
                  <Segment
                    textAlign="center"
                    circular
                    className="profilePicSegment"
                    style={{
                      width: 175, height: 175, backgroundImage: `url(${this.props.learner.lerner_avatar ? this.props.learner.lerner_avatar : avatarPlaceholder})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center center',
                    }}
                  />
                  <Header size="large">
                    {this.props.learner.first_name} {this.props.learner.last_name}
                  </Header>
                  <Header size="small" color="grey">
                    {this.props.learner.learner_position ? this.props.learner.learner_position : '-'}
                  </Header>
                  <Header size="small" color="grey">
                    ETH Address:
                  </Header>
                  <p>{this.props.eth_address}</p>
                </Segment>
                <Segment>
                  <List>
                    <List.Item icon={{ name: 'users', style: { width: '22px' } }} content={this.props.learner.learner_specialisation ? this.props.learner.learner_specialisation : '-'} />
                    <List.Item icon={{ name: 'marker', style: { width: '22px' } }} content={this.props.learner.learner_country ? this.props.learner.learner_country : '-'} />
                    <List.Item icon={{ name: 'mail', style: { width: '22px' } }} content={<a target="_blank" rel="noopener noreferrer" href={email}>{this.props.learner.learner_email ? this.props.learner.learner_email : '-'}</a>} />
                    <List.Item icon={{ name: 'linkify', style: { width: '22px' } }} content={<a target="_blank" rel="noopener noreferrer" href={site}>{this.props.learner.learner_site ? this.props.learner.learner_site : '-'}</a>} />
                    <List.Item icon={{ name: 'phone', style: { width: '22px' } }} content={<a target="_blank" rel="noopener noreferrer" href={phoneNumber}>{this.props.learner.phone_number ? this.props.learner.phone_number : '-'}</a>} />
                  </List>
                </Segment>
                <Segment>
                  <Statistic.Group size="tiny" color="orange" horizontal>
                    <Statistic>
                      <Statistic.Value>{this.props.certificates_count}</Statistic.Value>
                      <Statistic.Label>Certificates</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                </Segment>
              </Segment.Group>
            </Sticky>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={11}>
            <Segment style={{ paddingBottom: '2em' }} size="large">
              <Header>
                Introduction
              </Header>
              <Divider clearing />
              {this.props.learner.learner_about ? this.props.learner.learner_about : '-'}
            </Segment>
            <Segment.Group size="large">
              <Segment>
                <Header>
                  Experience
                </Header>
                <Segment style={{
                  textAlign: 'center', background: '#7f8fa6', color: '#fff', borderRadius: '10px', opacity: 0.7,
                }}
                >
                    Coming in Beta
                </Segment>
                <Divider clearing />
              </Segment>
              <Segment>
                <Header>
                  Education
                </Header>
                <Segment style={{
                  textAlign: 'center', background: '#7f8fa6', color: '#fff', borderRadius: '10px', opacity: 0.7,
                }}
                >
                    Coming in Beta
                </Segment>
                <Divider clearing />
              </Segment>
            </Segment.Group>
            <Segment size="large">
              <Header>
                Reviews
              </Header>
              <Segment style={{
                textAlign: 'center', background: '#7f8fa6', color: '#fff', borderRadius: '10px', opacity: 0.7,
              }}
              >
                  Coming in Beta
              </Segment>
              <Divider clearing />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    learner: state.profiles.profileView,
    certificates_count: state.profiles.certificates_count,
    profileViewIsFetching: state.profiles.profileViewIsFetching,
    profileViewError: state.profiles.profileViewError,
    isPublic: state.profiles.isPublic,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    getProfileView(type, eth_address) {
      dispatch(getProfileView(type, eth_address));
    },
  };
}
/* eslint-enable camelcase */

export default connect(mapStateToProps, mapDispatchToProps)(ViewLearnerProfile);