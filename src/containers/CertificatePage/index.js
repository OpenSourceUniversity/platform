import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Divider, Label, Segment, Grid, Menu, Icon, Container, Dimmer, Loader, Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SkillItem from 'components/SkillItem';
import { fetchCertificate } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';

class CertificatePage extends React.Component {
  state = { activeItem: 'about' }
  componentDidMount() {
    this.props.fetchCertificate(`http://localhost:8000/api/v1/certificates/${this.props.match.params.id}/`);
    this.props.setSecondaryNav('academia');
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderSkills() {
    const skillsJSON = this.props.course.skills;
    let skillsJSONLength = 0;
    skillsJSONLength = !skillsJSON ? 0 : skillsJSON.length;
    const skills = [];
    for (let i = 0; i < skillsJSONLength; i += 1) {
      skills.push({
        have_icon: false, check: true, name: skillsJSON[i].name, basic: false,
      });
    }
    return skills.map((skill, index) => (
      <SkillItem skill={skill} key={index} />
    ));
  }
  // renderRating(ratingNumb) {
  //   return (
  //     <div className="ui accurate star widget inline" style={{ marginRight: '10px' }}>
  //       <div className="highlight" style={{ width: `${(ratingNumb / 5) * 100}%` }} />
  //     </div>);
  // }

  render() {
    const { activeItem } = this.state;
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
              <Divider clearing />
              <Header style={{ fontSize: '1.7em' }}>
                {this.props.certificate.name}
              </Header>
              <Header style={{ fontSize: '1.7em' }}>
                Academy:
              </Header>
              <span>{this.props.certificate.academy}</span>
              <Header style={{ fontSize: '1.7em' }}>
                Course: 
              </Header>
              <span>{this.props.certificate.course}</span>
              <Header style={{ fontSize: '1.7em' }}>
                Learner: 
              </Header>
              <a target="_blank" href={'https://etherscan.io/address/' + this.props.certificate.learner}>{this.props.certificate.learner}</a>
              <Header style={{ fontSize: '1.7em' }}>
                Subject: 
              </Header>
              <span>{this.props.certificate.subject}</span>
              <Header style={{ fontSize: '1.7em' }}>
                {this.props.certificate.verified ?
                  (<a target="_blank" href={'https://etherscan.io/tx/' + this.props.certificate.tx}>Verified</a>)
                : ('Not Verified')}
              </Header>
              <Header style={{ fontSize: '1.7em' }}>
                Score: 
              </Header>
              <span>{this.props.certificate.score}</span>
              <Header style={{ fontSize: '1.7em' }}>
                Creator: 
              </Header>
              <a target="_blank" href={'https://etherscan.io/address/' + this.props.certificate.creator}>{this.props.certificate.creator}</a>
              <Header style={{ fontSize: '1.7em' }}>
                Expiration date: 
              </Header>
              <span>{this.props.certificate.expiration_date}</span>
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
