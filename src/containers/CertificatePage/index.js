import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Divider, Segment, Container, Dimmer, Loader, Breadcrumb, Grid, Modal, Button, Icon, Form, Input, Message } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import fetchCertificate from '../../util/certificate/fetchCertificate';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import Config from '../../config';
import { requireVerification } from '../../util/verification/verificationRequest';
import deleteCertificate from '../../util/certificate/deleteCertificate';
import { getProfileTypeName } from '../../util/activeAccount';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const { etherscanUrl } = Config.network;

class CertificatePage extends React.Component {
  state = { modalOpen: false }
  componentDidMount() {
    const { bdnUrl } = Config.network;
    this.props.fetchCertificate(`${bdnUrl}api/v1/certificates/${this.props.match.params.id}/`);
    this.props.setSecondaryNav('academia');
    document.title = 'Certificate';
  }

  handleSubmit(event, component) {
    event.preventDefault();
    const STATES = { Learner: 1, Academy: 2, Business: 3 };
    const certificateData = {
      certificate: component.props.match.params.id,
      verifier: event.target.elements.verifier_eth_address.value,
      verifier_type: event.target.elements.verifierType.value,
      granted_to_type: STATES[component.props.activeAccount],

    };
    component.props.requireVerification(certificateData);
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

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

  renderStatus() {
    if (this.props.certificate.is_expired) {
      return 'expired';
    }
    if (!this.props.certificate.verifications) {
      return 'not verified';
    }
    for (let i = 0; i < this.props.certificate.verifications.length; i += 1) {
      if (this.props.certificate.verifications[i].pop().state === 'verified') {
        return 'verified';
      }
    }
    return 'revoked';
  }

  renderVerifications() {
    const verifications = [];
    for (let i = 0; i < this.props.certificate.verifications.length; i += 1) {
      verifications.push(this.props.certificate.verifications[i].map((verification, index) => (
        <div key={index}>
          <Divider clearing />
          <p>
            <a
              href={`${etherscanUrl}${verification.tx_hash}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {capitalizeFirstLetter(verification.state)}
            </a> by {getProfileTypeName(verification.verifier_type)}&nbsp;
            <Link
              to={`/view-profile/${getProfileTypeName(verification.verifier_type).toLowerCase()}/${verification.verifier_eth_address}/`}
              href={`/view-profile/${getProfileTypeName(verification.verifier_type).toLowerCase()}/${verification.verifier_eth_address}/`}
            >
              {verification.verifier_name}
            </Link>
          </p>
          <Divider clearing />
        </div>
      )));
    }
    return verifications;
  }

  // renderRating(ratingNumb) {
  //   return (
  //     <div className="ui accurate star widget inline" style={{ marginRight: '10px' }}>
  //       <div className="highlight" style={{ width: `${(ratingNumb / 5) * 100}%` }} />
  //     </div>);
  // }

  render() {
    const status = this.renderStatus();
    function getColor() {
      switch (status) {
      case 'verified':
        return 'green';
      case 'revoked':
        return 'red';
      case 'expired':
        return 'blue';
      default:
        return 'yellow';
      }
    }
    const color = getColor();
    /* eslint-disable global-require */
    const loader = require('../../icons/osu-loader.svg');
    /* eslint-enable global-require */
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
                <Loader size="large">
                  <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                    <image href={loader} x="0" y="0" width="100%" height="100%" />
                  </svg>
                </Loader>
              </Dimmer>
              {this.props.address.toLowerCase() === this.props.certificate.learner_eth_address ?
                <Modal open={this.state.modalOpen} onClose={this.handleClose} trigger={<Button floated="left" onClick={this.handleOpen} color="red">Delete</Button>} basic size="small">
                  <Header icon="archive" content="Delete course confirmation" />
                  <Modal.Content>
                    <Dimmer active={this.props.isDeleting} page>
                      <Loader size="medium">
                        <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                          <image href={loader} x="0" y="0" width="100%" height="100%" />
                        </svg>
                      </Loader>
                    </Dimmer>
                    <Message error hidden={!this.props.error}>
                      <p>
                        {this.props.error}
                      </p>
                    </Message>
                    <p>
                    You want to delete youre certificate, named: {this.props.certificate.course_title}.
                    </p>
                    <p>
                    Please, confirm this action.
                    </p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button onClick={this.handleClose} floated="left" basic color="grey" inverted>
                      <Icon name="remove" /> Cancel
                    </Button>
                    <Button basic color="red" inverted onClick={() => { this.props.deleteCertificate(this.props.match.params.id); }}>
                      <Icon name="remove" /> Delete
                    </Button>
                  </Modal.Actions>
                </Modal> :
                null
              }
              <Modal trigger={
                <Button icon labelPosition="left" positive floated="right">
                  <Icon name="checkmark" />
                  Verifiy Certificate
                </Button>
              }
              >
                <Modal.Header>Verification Request</Modal.Header>
                <Modal.Content>
                  <Dimmer active={this.props.requestSending} page>
                    <Loader size="medium">
                      <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                        <image href={loader} x="0" y="0" width="100%" height="100%" />
                      </svg>
                    </Loader>
                  </Dimmer>
                  <Message error hidden={!this.props.requestError}>
                    <p>
                      {this.props.requestError}
                    </p>
                  </Message>
                  <Message positive hidden={!this.props.requestSuccess}>
                    <p>
                      Success message.
                    </p>
                  </Message>
                  <Form size="large" onSubmit={(event) => { this.handleSubmit(event, this); }}>
                    <Form.Field required>
                      <label htmlFor="verifier_eth_address">
                        Please, enter instance ETH address
                      </label>
                      <Input
                        id="verifier_eth_address"
                        name="verifier_eth_address"
                        iconPosition="left"
                        icon="file"
                        placeholder="ETH address"
                      />
                    </Form.Field>
                    <Form.Field id="verifierType" name="verifierType" label="Type of verifier" control="select">
                      <option value={2}>Academy</option>
                      <option value={3}>Business</option>
                    </Form.Field>
                    <Button type="submit" primary size="huge">Submit</Button>
                  </Form>
                </Modal.Content>
              </Modal>
              <Divider hidden />
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
                  <Segment color={color} className="certificateCard">
                    <Header style={{ fontSize: '1.7em' }}>
                      Certificate Status
                    </Header>
                    <Divider clearing />
                    <Header style={{ fontSize: '1.7em' }}>
                    Status: {capitalizeFirstLetter(status)}<br />
                      {this.props.certificate.verifications ?
                        <Modal trigger={
                          <Button positive >
                            <Icon name="checkmark" />
                            Verification History
                          </Button>
                        }
                        >
                          <Modal.Header>Verifications History</Modal.Header>
                          <Modal.Content>
                            {this.renderVerifications()}
                          </Modal.Content>
                        </Modal>
                        : (capitalizeFirstLetter(status))}
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
    isDeleting: state.certificate.isDeleting,
    error: state.certificate.error,
    requestSuccess: state.verificationRequest.requestSuccess,
    requestSending: state.verificationRequest.requestSending,
    requestError: state.verificationRequest.requestError,
    activeAccount: state.activeAccount.activeAccount,
    address: state.auth.address,
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
    requireVerification(certificateData) {
      dispatch(requireVerification(certificateData));
    },
    deleteCertificate(id) {
      dispatch(deleteCertificate(id));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CertificatePage);
