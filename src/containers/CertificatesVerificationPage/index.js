import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Grid, Button, Icon, Divider, Checkbox, Breadcrumb, Loader, Message, Dimmer, Menu, Segment, Form } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import fetchVerifications from '../../util/verification/fetchVerifications';
import fetchVerification from '../../util/verification/fetchVerification';
import updateCertificate from '../../util/certificate/updateCertificate';
import verify from '../../util/verification/verify';
import massVerification from '../../util/verification/massVerification';
import rejectVerification from '../../util/verification/rejectVerification';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import Config from '../../config';

const { bdnUrl } = Config.network;

class CertificatesVerificationPage extends React.Component {
  /* eslint-disable react/no-unused-state */
  state = { activeVerificationId: null }

  componentDidMount() {
    if (this.props.match.params.id) {
      const verificationId = this.props.match.params.id;
      this.state.activeVerificationId = verificationId;
      this.props.fetchVerification(`${bdnUrl}api/v1/verifications/${verificationId}/`);
    }
    this.props.fetchVerifications();
    this.props.setSecondaryNav('academia');
    document.title = 'Certificates Validation';
  }

  massVerification() {
    this.props.massVerification(this.massVerifyIds);
    this.setState({ activeVerificationId: null });
  }

  rejectVerification() {
    this.props.rejectVerification(this.state.activeVerificationId);
    this.setState({ activeVerificationId: null });
  }

  massVerifyIds = []

  handleSubmit(event, component) {
    event.preventDefault();
    component.props.verify(component.props.verification);
    component.setState({ activeVerificationId: null });
  }

  showVerification = (verificationId) => {
    this.setState({ activeVerificationId: verificationId });
    this.props.history.push(`/verifications/${verificationId}/`);
    this.props.fetchVerification(`${bdnUrl}api/v1/verifications/${verificationId}/`);
  }

  handleCheckboxClick =(e, { name }) => {
    if (e.target.parentElement.children[0].checked) {
      this.massVerifyIds.splice(name, 1);
    } else {
      this.massVerifyIds.push(name);
    }
  }

  renderSkills() {
    const skillsArr = this.props.certificate.skills;
    const skills = [];
    try {
      for (let i = 0; i < skillsArr.length; i += 1) {
        skills.push({
          have_icon: false, check: true, name: skillsArr[i].name, basic: false,
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
    const industriesArr = this.props.certificate.industries;
    const industries = [];
    try {
      for (let i = 0; i < industriesArr.length; i += 1) {
        industries.push({
          have_icon: false, check: true, name: industriesArr[i].name, basic: false,
        });
      }
      return industries.map((industry, index) => (
        <SkillItem skill={industry} key={index} />
      ));
    } catch (e) {
      return null;
    }
  }

  renderVerificationsMenu() {
    const { verifications } = this.props;
    return verifications.map((verification, index) => (
      <Menu.Item
        style={(() => {
          if (verification.state === 'pending') {
            return { color: 'blue' };
          } else if (verification.state === 'verified') {
            return { color: 'green' };
          } else if (verification.state === 'rejected' || verification.state === 'revoked') {
            return { color: 'red' };
          }
          return { color: 'orange' };
        })()}
        key={index}
        active={this.state.activeVerificationId === verification.id}
        onClick={() => this.showVerification(verification.id)}
      >
        {verification.certificate.certificate_title}
        {verification.state === 'open' || verification.state === 'requested' ?
          <div style={{ float: 'right' }}>
            <Checkbox onChange={this.handleCheckboxClick} name={verification.id} label="to verify" />
          </div> :
          null
        }
      </Menu.Item>
    ));
  }
  /* eslint-disable jsx-a11y/label-has-for */
  render() {
    /* eslint-disable global-require */
    const loader = require('../../icons/osu-loader.svg');
    /* eslint-enable global-require */

    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Certificates</Breadcrumb.Section>
        </Breadcrumb>
        <Divider clearing />
        <Header size="large" floated="left">
          Certificates verification list
        </Header>
        <Button
          style={{ display: this.props.verifications.length > 0 ? null : 'none' }}
          icon
          labelPosition="left"
          positive
          floated="right"
          onClick={() => { this.massVerification(); }}
          disabled={!this.massVerifyIds.length}
        >
          <Icon name="checkmark" />
          Verify all selected certificates
        </Button>
        <Button
          style={{ display: this.props.verifications.length > 0 ? 'none' : null }}
          icon
          labelPosition="left"
          positive
          floated="right"
          as={Link}
          to="/certificates/add"
        >
          <Icon name="plus" />
          Add Certificate
        </Button>
        <Divider clearing />
        <Message error hidden={!this.props.error}>
          <p>
            {this.props.error}
          </p>
        </Message>
        <Message info hidden={this.props.verifications.length > 0 || !!this.props.error}>
          <p>
            You do not have any verifications yet. Go ahead and add some certificate.
          </p>
        </Message>
        <Grid>
          <Grid.Column width={4} style={{ display: this.props.verifications.length > 0 ? null : 'none' }}>
            <Menu fluid vertical pointing>
              {this.renderVerificationsMenu()}
            </Menu>
          </Grid.Column>
          <Grid.Column width={12} style={{ display: this.state.activeVerificationId ? 'block' : 'none' }}>
            <Segment style={(() => {
              if (this.props.verification.state === 'pending') {
                return { borderColor: 'blue' };
              } else if (this.props.verification.state === 'verified') {
                return { borderColor: 'green' };
              } else if (this.props.verification.state === 'rejected' || this.props.verification.state === 'revoked') {
                return { borderColor: 'red' };
              }
              return { borderColor: 'orange' };
            })()}
            >
              <p>Verification status: {this.props.verification.state}</p>
              <Form size="big" onSubmit={(event) => { this.handleSubmit(event, this); }}>
                <Dimmer active={this.props.isUpdating || this.props.isVerifying} page>
                  <Loader size="medium">
                    <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                      <image href={loader} x="0" y="0" width="100%" height="100%" />
                    </svg>
                    {this.props.isUpdating ? 'Updating the certificate...' : 'Verifying the certificate...'}
                  </Loader>
                </Dimmer>
                Academy title:
                <p>{this.props.certificate.institution_title ? this.props.certificate.institution_title : '-'}</p>
                <Divider clearing />
                Academy site:
                <p>{this.props.certificate.institution_link ? this.props.certificate.institution_link : '-'}</p>
                <Divider clearing />
                Program title:
                <p>{this.props.certificate.program_title ? this.props.certificate.program_title : '-'}</p>
                <Divider clearing />
                Course title:
                <p>{this.props.certificate.certificate_title ? this.props.certificate.certificate_title : '-'}</p>
                <Divider clearing />
                Course link:
                <p>{this.props.certificate.course_link ? this.props.certificate.course_link : '-'}</p>
                <Divider clearing />
                <p>Course industries:</p>
                <div>{this.renderSubjects()}</div>
                <Divider clearing />
                <p>Recieved skills:</p>
                <div>{this.renderSkills()}</div>
                <Divider clearing />
                Learner address:
                <p>{this.props.certificate.holder_eth_address ? this.props.certificate.holder_eth_address : '-'}</p>
                <Divider clearing />
                Learner&apos;s score:
                <p>{this.props.certificate.score ? this.props.certificate.score : '-'}</p>
                <Divider clearing />
                Course duration in hours:
                <p>{this.props.certificate.duration ? this.props.certificate.duration : '-'}</p>
                <Divider clearing />
                Certificate expiration date:
                <p>{this.props.certificate.expiration_date ? this.props.certificate.expiration_date.substr(0, 10) : '-'}</p>
                <Divider clearing />
                <label htmlFor="ipfsHash">
                  <b>Certificate file in PDF</b><br /><br />
                  <a id="ipfsHash" name="ipfsHash" href={`https://ipfs.io/ipfs/${this.props.certificate.ipfs_hash}`} target="_blank" rel="noopener noreferrer">
                    {this.props.certificate.ipfs_hash}
                  </a>
                </label>
                <div style={{ display: this.props.verification.state === 'requested' || this.props.verification.state === 'open' ? null : 'none', paddingTop: '20px' }}>
                  <Button type="submit" color="green" size="huge">Verify</Button>
                  <Button type="button" color="red" floated="right" size="huge" onClick={() => this.rejectVerification()}>Reject</Button>
                </div>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    verifications: state.verifications.verifications,
    certificate: state.verification.verification.certificate,
    verification: state.verification.verification,
    isFetchingList: state.verifications.isFetching,
    isFetching: state.certificate.isFetching,
    isUpdating: state.certificate.isUpdating,
    isVerifying: state.verification.isVerifying,
    error: state.verifications.error,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchVerifications() {
      dispatch(fetchVerifications());
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    fetchVerification(url) {
      dispatch(fetchVerification(url));
    },
    updateCertificate(data) {
      dispatch(updateCertificate(data));
    },
    verify(data) {
      dispatch(verify(data));
    },
    massVerification(ids) {
      dispatch(massVerification(ids));
    },
    rejectVerification(id) {
      dispatch(rejectVerification(id));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CertificatesVerificationPage);
