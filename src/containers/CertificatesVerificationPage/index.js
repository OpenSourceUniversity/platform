import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Grid, Button, Icon, Divider, Checkbox, Breadcrumb, Loader, Message, Dimmer, Menu, Segment, Form, Input } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import SkillsInput from 'components/SkillsInput';
import IndustriesInput from 'components/IndustriesInput';
import fetchCertificates from '../../util/certificate/fetchCertificates';
import fetchCertificate from '../../util/certificate/fetchCertificate';
import updateCertificate from '../../util/certificate/updateCertificate';
import verifyCertificate from '../../util/verification/verifyCertificate';
import massVerification from '../../util/verification/massVerification';
import rejectCertificate from '../../util/verification/rejectCertificate';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import Config from '../../config';

const { bdnUrl } = Config.network;

class CertificatesVerificationPage extends React.Component {
  /* eslint-disable react/no-unused-state */
  state = { activeItem: null, verification: false }

  componentDidMount() {
    this.props.fetchCertificates(`${bdnUrl}api/v1/certificates/get_certificates_by_academy/`);
    this.props.setSecondaryNav('academia');
    document.title = 'Certificates Validation | OSU DApp';
  }

  massVerification() {
    this.props.massVerification(this.massVerifyIds);
    this.setState({ activeItem: null });
  }

  rejectCertificate() {
    this.props.rejectCertificate(this.state.activeItem);
    this.setState({ activeItem: null });
  }

  massVerifyIds = []

  handleSubmit(event, component) {
    event.preventDefault();
    const industries = this.industriesRef.state.currentValue;
    const skills = this.skillsRef.state.currentValue;
    const certificateData = {
      id: component.state.activeItem,
      academy_title: event.target.elements.academy_title.value,
      academy_link: event.target.elements.academy_link.value,
      program_title: event.target.elements.program_title.value,
      course_title: event.target.elements.course_title.value,
      course_link: event.target.elements.course_link.value,
      industries,
      skills,
      score: event.target.elements.score.value,
      duration: event.target.elements.duration.value,
      expiration_date: event.target.elements.expiration_date.value,
      ipfs_hash: component.props.certificate.ipfs_hash,
    };
    if (component.state.verification) {
      component.props.verifyCertificate(certificateData);
    } else {
      component.props.updateCertificate(certificateData);
    }
    component.setState({ verification: false });
    component.setState({ activeItem: null });
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.fetchCertificate(`${bdnUrl}api/v1/certificates/${name}/`);
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

  renderCertificatesMenu() {
    return this.props.certificates.map((certificate, index) => (
      <Menu.Item
        style={{ color: certificate.verified ? 'green' : 'orange' }}
        key={index}
        name={certificate.id}
        active={this.state.activeItem === certificate.id}
        onClick={this.handleItemClick}
      >
        {certificate.course_title}
        {certificate.verified ?
          null :
          <div style={{ float: 'right' }}>
            <Checkbox onChange={this.handleCheckboxClick} name={certificate.id} label="to verify" />
          </div>
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
          style={{ display: this.props.certificates.length > 0 ? null : 'none' }}
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
          style={{ display: this.props.certificates.length > 0 ? 'none' : null }}
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

        <Message info hidden={this.props.certificates.length > 0 || !!this.props.error}>
          <p>
            You do not have any certificates yet. Go ahead and add some.
          </p>
        </Message>


        <Grid>

          <Grid.Column width={4} style={{ display: this.props.certificates.length > 0 ? null : 'none' }}>
            <Menu fluid vertical pointing>
              {this.renderCertificatesMenu()}
            </Menu>
          </Grid.Column>
          <Grid.Column width={12} style={{ display: this.state.activeItem ? 'block' : 'none' }}>
            <Segment style={{ borderColor: this.props.certificate.verified ? 'green' : 'orange' }}>
              <Form size="huge" onSubmit={(event) => { this.handleSubmit(event, this); }}>
                <Dimmer active={this.props.isUpdating || this.props.isVerifying} page>
                  <Loader size="medium">
                    <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                      <image href={loader} x="0" y="0" width="100%" height="100%" />
                    </svg>
                    {this.props.isUpdating ? 'Updating the certificate...' : 'Verifying the certificate...'}
                  </Loader>
                </Dimmer>
                <Form.Field required>
                  <label htmlFor="academy_title">
                    Academy title
                    <Input
                      id="academy_title"
                      name="academy_title"
                      iconPosition="left"
                      icon="certificate"
                      placeholder="Oficial name of your academy"
                      key={`academy_title:${this.props.certificate.academy_title || ''}`}
                      defaultValue={this.props.certificate.academy_title ? this.props.certificate.academy_title : ''}
                      readOnly={this.props.certificate.verified}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="academy_address">
                    Academy ETH address (if have)
                    <Input
                      id="academy_address"
                      name="academy_address"
                      iconPosition="left"
                      icon="address card"
                      placeholder="ETH address of your academy"
                      key={`academy_address:${this.props.certificate.academy_address || ''}`}
                      defaultValue={this.props.certificate.academy_address ? this.props.certificate.academy_address : ''}
                      readOnly
                    />
                  </label>
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="academy_link">
                    Academy site
                    <Input
                      id="academy_link"
                      name="academy_link"
                      type="url"
                      iconPosition="left"
                      icon="address card"
                      placeholder="Site of academy"
                      key={`academy_link:${this.props.certificate.academy_link || ''}`}
                      defaultValue={this.props.certificate.academy_link ? this.props.certificate.academy_link : ''}
                      readOnly={this.props.certificate.verified}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="program_title">
                    Program title (if have)
                    <Input
                      id="program_title"
                      name="program_title"
                      iconPosition="left"
                      icon="address card"
                      placeholder="Name of program"
                      key={`program_title:${this.props.certificate.program_title || ''}`}
                      defaultValue={this.props.certificate.program_title ? this.props.certificate.program_title : ''}
                      readOnly={this.props.certificate.verified}
                    />
                  </label>
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="course_title">
                    Course title
                    <Input
                      id="course_title"
                      name="course_title"
                      iconPosition="left"
                      icon="address card"
                      placeholder="Oficial course title"
                      key={`course_title:${this.props.certificate.course_title || ''}`}
                      defaultValue={this.props.certificate.course_title ? this.props.certificate.course_title : ''}
                      readOnly={this.props.certificate.verified}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="course_link">
                    Course link (if have)
                    <Input
                      id="course_link"
                      name="course_link"
                      type="url"
                      iconPosition="left"
                      icon="address card"
                      placeholder="Link to your course"
                      key={`course_link:${this.props.certificate.course_link || ''}`}
                      defaultValue={this.props.certificate.course_link ? this.props.certificate.course_link : ''}
                      readOnly={this.props.certificate.verified}
                    />
                  </label>
                </Form.Field>
                {this.props.certificate.verified ?
                  <div>
                    <label>
                      <b>Course industries</b> <br /><br />
                    </label>
                    {this.renderSubjects()}
                    <br /><br />
                  </div> :
                  <IndustriesInput
                    ref={(arg) => { this.industriesRef = arg; }}
                    industries={this.props.certificate.industries}
                  />
                }
                {this.props.certificate.verified ?
                  <div>
                    <label>
                      <b>Recieved skills</b> <br /><br />
                    </label>
                    {this.renderSkills() }
                    <br /><br />
                  </div> :
                  <SkillsInput
                    ref={(arg) => { this.skillsRef = arg; }}
                    skills={this.props.certificate.skills}
                  />
                }
                <Form.Field required>
                  <label htmlFor="learner_eth_address">
                    Learner address
                    <Input
                      id="learner_eth_address"
                      name="learner_eth_address"
                      iconPosition="left"
                      icon="address card"
                      placeholder="ETH address of learner"
                      key={`learner_eth_address:${this.props.certificate.learner_eth_address || ''}`}
                      defaultValue={this.props.certificate.learner_eth_address ? this.props.certificate.learner_eth_address : ''}
                      readOnly
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="score">
                    Learner&apos;s score (if have)
                    <Input
                      id="score"
                      name="score"
                      type="number"
                      iconPosition="left"
                      icon="address card"
                      placeholder="Your score"
                      key={`score:${this.props.certificate.score || ''}`}
                      defaultValue={this.props.certificate.score ? this.props.certificate.score : ''}
                      readOnly={this.props.certificate.verified}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="duration">
                    Course duration in hours (if have)
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      iconPosition="left"
                      icon="address card"
                      placeholder="Course duration"
                      key={`duration:${this.props.certificate.duration || ''}`}
                      defaultValue={this.props.certificate.duration ? this.props.certificate.duration : ''}
                      readOnly={this.props.certificate.verified}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="expiration_date">
                    Certificate expiration date (if have)
                    <Input
                      id="expiration_date"
                      name="expiration_date"
                      iconPosition="left"
                      icon="address card"
                      type="date"
                      placeholder="Certificate expiration date"
                      key={`expiration_date:${this.props.certificate.expiration_date || ''}`}
                      defaultValue={this.props.certificate.expiration_date ? this.props.certificate.expiration_date.substr(0, 10) : ''}
                      readOnly={this.props.certificate.verified}
                    />
                  </label>
                </Form.Field>
                <label htmlFor="ipfsHash">
                  <b>Certificate file in PDF</b><br /><br />
                  <a id="ipfsHash" name="ipfsHash" href={`https://ipfs.io/ipfs/${this.props.certificate.ipfs_hash}`} target="_blank" rel="noopener noreferrer">
                    {this.props.certificate.ipfs_hash}
                  </a>
                </label>
                <div style={{ display: this.props.certificate.verified ? 'none' : null, paddingTop: '20px' }}>
                  <Button type="submit" color="green" size="huge" onClick={() => this.setState({ verification: true })}>Verify</Button>
                  <Button type="submit" primary size="huge">Save changed data</Button>
                  <Button color="red" floated="right" size="huge" onClick={() => this.rejectCertificate()}>Reject</Button>
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
    certificates: state.certificates.certificates,
    certificate: state.certificate.certificate,
    isFetchingList: state.certificates.isFetching,
    isFetching: state.certificate.isFetching,
    isUpdating: state.certificate.isUpdating,
    isVerifying: state.verification.isVerifying,
    error: state.certificates.error,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCertificates(url) {
      dispatch(fetchCertificates(url));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    fetchCertificate(url) {
      dispatch(fetchCertificate(url));
    },
    updateCertificate(data) {
      dispatch(updateCertificate(data));
    },
    verifyCertificate(data) {
      dispatch(verifyCertificate(data));
    },
    massVerification(ids) {
      dispatch(massVerification(ids));
    },
    rejectCertificate(id) {
      dispatch(rejectCertificate(id));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CertificatesVerificationPage);
