import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Header, Divider, Grid, Sticky, Segment, List, Statistic, Dimmer, Loader, Message, Button } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import CertificateItem from 'components/CertificateItem';
import getProfileView from '../../util/profiles/getProfileView';
import openThread from '../../util/messaging/openThread';

/* eslint-disable camelcase */
class ViewLearnerProfile extends React.Component {
  componentDidMount() {
    this.props.getProfileView('learner', this.props.eth_address);
  }

  handleBack = () => this.props.history.push('/learners');

  openMessaging = (e, { name }) => {
    const threadData = {
      opponent_eth_address: name,
    };
    this.props.openThread(threadData);
  }

  isVerified(certificate) {
    for (let i = 0; i < certificate.verifications.length; i += 1) {
      if (certificate.verifications[i][certificate.verifications[i].length - 1].state === 'verified') {
        return true;
      }
    }
    return false;
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

  renderSkills() {
    const { certificates } = this.props;
    certificates.sort((a, b) => b.verified);
    let verifiedSkills = [];
    let notVerifiedSkills = [];
    const skills = [];
    for (let i = 0; i < certificates.length; i += 1) {
      if (this.isVerified(certificates[i])) {
        verifiedSkills = verifiedSkills.concat(certificates[i].skills);
      } else {
        notVerifiedSkills = notVerifiedSkills.concat(certificates[i].skills);
      }
    }
    verifiedSkills = [...new Set(verifiedSkills.map(e => e.name))];
    notVerifiedSkills = [...new Set(notVerifiedSkills.map(e => e.name))];
    notVerifiedSkills = notVerifiedSkills.filter(el => !verifiedSkills.includes(el));

    for (let i = 0; i < verifiedSkills.length; i += 1) {
      skills.push({
        have_icon: true, check: true, name: verifiedSkills[i], basic: true,
      });
    }
    for (let i = 0; i < notVerifiedSkills.length; i += 1) {
      skills.push({
        have_icon: true, check: false, name: notVerifiedSkills[i], basic: true,
      });
    }
    return skills.map((skill, index) => (
      <SkillItem skill={skill} key={index} />
    ));
  }

  render() {
    const avatarPlaceholder = 'data:image/jpeg;base64,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';
    const site = `${this.props.learner.learner_site}`;
    const phoneNumber = `tel:${this.props.learner.phone_number}`;
    return (
      <div>
        <Dimmer active={this.props.profileViewIsFetching} inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
        <Dimmer
          active={!!(this.props.profileViewError) || !(this.props.learner.full_name)}
          inverted
          onClickOutside={this.handleBack}
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
          <Button
            primary
            as={Link}
            to="/learners"
          >
            Back to Learners list
          </Button>
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
                      width: 175,
                      height: 175,
                      backgroundImage: `url(${this.props.learner.learner_avatar ? `https://ipfs.io/ipfs/${this.props.learner.learner_avatar}` : avatarPlaceholder})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center center',
                      borderWidth: 0,
                      cursor: 'auto',
                    }}
                  />
                  <Header size="large">
                    {this.props.learner.full_name}
                  </Header>
                  <Header size="small" color="grey">
                    {this.props.learner.learner_position ? this.props.learner.learner_position : '-'}
                  </Header>
                  <Button
                    primary
                    size="large"
                    className="fluid"
                    content="SEND MESSAGE"
                    name={this.props.eth_address.toLowerCase()}
                    icon="mail outline"
                    onClick={this.openMessaging}
                  />
                  <Header size="small" color="grey">
                    ETH Address:
                  </Header>
                  <p>{this.props.eth_address}</p>
                </Segment>
                <Segment>
                  <List>
                    <List.Item icon={{ name: 'users', style: { width: '22px' } }} content={this.props.learner.learner_specialisation ? this.props.learner.learner_specialisation : '-'} />
                    <List.Item icon={{ name: 'marker', style: { width: '22px' } }} content={this.props.learner.learner_country ? this.props.learner.learner_country : '-'} />
                    <List.Item icon={{ name: 'linkify', style: { width: '22px' } }} content={<a target="_blank" rel="noopener noreferrer" href={site}>{this.props.learner.learner_site ? this.props.learner.learner_site : '-'}</a>} />
                    <List.Item icon={{ name: 'phone', style: { width: '22px' } }} content={<a target="_blank" rel="noopener noreferrer" href={phoneNumber}>{this.props.learner.phone_number ? this.props.learner.phone_number : '-'}</a>} />
                  </List>
                </Segment>
                <Segment>
                  <Statistic.Group size="tiny" color="orange" horizontal>
                    <Statistic>
                      <Statistic.Value>
                        {this.props.certificates ? this.props.certificates.length : 0}
                      </Statistic.Value>
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
              <div style={{ whiteSpace: 'pre-line' }}>
                {this.props.learner.learner_about ? this.props.learner.learner_about : '-'}
              </div>
              <Header>
                Certificates
              </Header>
              <Grid width={16}>
                {
                  this.props.certificates.length ?
                    this.renderCertificates() :
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <p style={{ textAlign: 'center' }}>There are no any certificates yet.</p>
                    </div>
                }
              </Grid>
            </Segment>
            <Segment.Group size="large">
              <Segment>
                <Header>
                  Education
                </Header>
                {
                  this.props.certificates.length ?
                    this.renderSkills() :
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <p style={{ textAlign: 'center' }}>There are no any skills yet.</p>
                    </div>
                }
                <Divider clearing />
              </Segment>
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
    certificates: state.profiles.certificates,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    getProfileView(type, eth_address) {
      dispatch(getProfileView(type, eth_address));
    },
    openThread(threadData) {
      dispatch(openThread(threadData));
    },
  };
}
/* eslint-enable camelcase */

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewLearnerProfile));
