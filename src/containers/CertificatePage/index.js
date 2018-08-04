import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Segment, Container, Dimmer, Loader, Breadcrumb, Grid } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import { fetchCertificate } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import Config from '../../config';

class CertificatePage extends React.Component {
  componentWillMount() {
    const { bdnUrl } = Config.network;
    this.props.fetchCertificate(`${bdnUrl}api/v1/certificates/${this.props.match.params.id}/`);
    this.props.setSecondaryNav('academia');
  }

  renderSkills() {
    const skillsArr = this.props.certificate.skills;
    const skills = [];
    try {
      for (let i = 0; i < skillsArr.length; i += 1) {
        skills.push({
          have_icon: false, check: true, name: skillsArr[i], basic: false,
        });
      }
      return skills.map((skill, index) => (
        <SkillItem skill={skill} key={index} />
      ));
    } catch (e) {
      return null;
    }
  }

  renderSubjects() {
    const subjectsArr = this.props.certificate.subject;
    const subjects = [];
    try {
      for (let i = 0; i < subjectsArr.length; i += 1) {
        subjects.push({
          have_icon: false, check: true, name: subjectsArr[i], basic: false,
        });
      }
      return subjects.map((subject, index) => (
        <SkillItem skill={subject} key={index} />
      ));
    } catch (e) {
      return null;
    }
  }
  // renderRating(ratingNumb) {
  //   return (
  //     <div className="ui accurate star widget inline" style={{ marginRight: '10px' }}>
  //       <div className="highlight" style={{ width: `${(ratingNumb / 5) * 100}%` }} />
  //     </div>);
  // }

  render() {
    return (
      <div className="certificate">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section href="/#/certificates">Certificates</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section active>Certificate Description</Breadcrumb.Section>
          </Breadcrumb>
          <Divider hidden />
          <div className="course">
            <Segment style={{ textAlign: 'center' }}>
              <Dimmer active={this.props.certificate.isFetching} inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
              <Header style={{ fontSize: '1.7em' }}>
                Certificate Information
              </Header>
              <Header style={{ fontSize: '1.7em' }}>
                {this.props.certificate.course_title}
              </Header>
              <Divider clearing />
              <Grid>
                <Grid.Column width={8}>
                  <Segment color="orange" className="certificateCard">
                    <Header style={{ fontSize: '1.7em' }}>
                      Academy Information
                    </Header>
                    <Divider clearing />
                    <Header style={{ fontSize: '1.7em' }}>
                      Academy Title:
                    </Header>
                    <span>{this.props.certificate.academy_title}</span>
                    <Header style={{ fontSize: '1.7em' }}>
                      Academy ETH Address:
                    </Header>
                    <a rel="noopener noreferrer" target="_blank" href={`https://etherscan.io/address/${this.props.certificate.academy_address}`}>{this.props.certificate.academy_address}</a>
                    <Header style={{ fontSize: '1.7em' }}>
                      Academy Site:
                    </Header>
                    <a rel="noopener noreferrer" target="_blank" href={this.props.certificate.academy_link}>{this.props.certificate.academy_link}</a>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Segment color="orange" className="certificateCard">
                    <Header style={{ fontSize: '1.7em' }}>
                      Course Information
                    </Header>
                    <Divider clearing />
                    <Header style={{ fontSize: '1.7em' }}>
                      Program Title:
                    </Header>
                    <span>{this.props.certificate.program_title}</span>
                    <Header style={{ fontSize: '1.7em' }}>
                      Course Link:
                    </Header>
                    <a rel="noopener noreferrer" target="_blank" href={this.props.certificate.course_link}>{this.props.certificate.course_link}</a>
                    <Header style={{ fontSize: '1.7em' }}>
                      Subject:
                    </Header>
                    <span>
                      {this.renderSubjects()}
                    </span>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Segment color="orange" className="certificateCard">
                    <Header style={{ fontSize: '1.7em' }}>
                      Learner Information
                    </Header>
                    <Divider clearing />
                    <Header style={{ fontSize: '1.7em' }}>
                      Skills:
                    </Header>
                    <span>
                      {this.renderSkills()}
                    </span>
                    <Header style={{ fontSize: '1.7em' }}>
                      Learner ETH Address:
                    </Header>
                    <a rel="noopener noreferrer" target="_blank" href={`https://etherscan.io/address/${this.props.certificate.learner_eth_address}`}>{this.props.certificate.learner_eth_address}</a>
                    <Header style={{ fontSize: '1.7em' }}>
                      Score:
                    </Header>
                    <span>{this.props.certificate.score}</span>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Segment color={this.props.certificate.verified ? 'green' : 'red'} className="certificateCard">
                    <Header style={{ fontSize: '1.7em' }}>
                      Certificate Status
                    </Header>
                    <Divider clearing />
                    <Header style={{ fontSize: '1.7em' }}>
                      {this.props.certificate.verified ?
                        (<a rel="noopener noreferrer" target="_blank" href={`https://etherscan.io/tx/${this.props.certificate.ipfs_hash}`}>Verified</a>)
                        : ('Not Verified')}
                    </Header>
                    <Header style={{ fontSize: '1.7em' }}>
                      Duration:
                    </Header>
                    <span>{this.props.certificate.duration}</span>
                    <Header style={{ fontSize: '1.7em' }}>
                      Expiration date:
                    </Header>
                    <span>{this.props.certificate.expiration_date ? this.props.certificate.expiration_date : '-'}</span>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Segment>
          </div>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    certificate: state.certificate.certificate,
    isFetching: state.certificate.isFetching,
    error: state.certificate.error,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCertificate(url) {
      dispatch(fetchCertificate(url));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CertificatePage);
