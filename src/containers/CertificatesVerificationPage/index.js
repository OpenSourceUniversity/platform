import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Grid, Button, Icon, Divider, Checkbox, Breadcrumb, Loader, Message, Dimmer, Menu, Segment, Form, Responsive, Sidebar, Image } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import fetchVerifications from '../../util/verification/fetchVerifications';
import fetchVerification from '../../util/verification/fetchVerification';
import updateCertificate from '../../util/certificate/updateCertificate';
import verify from '../../util/verification/verify';
import rejectVerification from '../../util/verification/rejectVerification';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import Config from '../../config';
import { decrypt } from '../../util/privacy';
import resetCertificateVerificationsProps from './actions';

const { bdnUrl } = Config.network;
const LIMIT_PAGINATION = 20;

class CertificatesVerificationPage extends React.Component {
  /* eslint-disable react/no-unused-state */
  state = {
    activeVerificationId: null,
    isFetching: false,
    visibleVerifications: true,
  }

  componentDidMount() {
    this.props.resetCertificateVerificationsProps();
    if (this.props.match.params.id) {
      const verificationId = this.props.match.params.id;
      this.state.activeVerificationId = verificationId;
      this.props.fetchVerification(`${bdnUrl}api/v1/verifications/${verificationId}/`);
      this.state.isFetching = true;
    }
    if (this.props.match.params.type === 'academy') {
      this.props.fetchVerifications(`${bdnUrl}api/v1/verifications/?active_profile=Academy&offset=0&limit=${LIMIT_PAGINATION}`);
    } else {
      this.props.fetchVerifications(`${bdnUrl}api/v1/verifications/?active_profile=Business&offset=0&limit=${LIMIT_PAGINATION}`);
    }
    this.props.setSecondaryNav('academia');
    document.title = 'Certificates Validation';
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.type !== prevProps.match.params.type) {
      this.props.resetCertificateVerificationsProps();
      if (this.props.match.params.type === 'academy') {
        this.props.fetchVerifications(`${bdnUrl}api/v1/verifications/?active_profile=Academy&offset=0&limit=${LIMIT_PAGINATION}`);
      } else {
        this.props.fetchVerifications(`${bdnUrl}api/v1/verifications/?active_profile=Business&offset=0&limit=${LIMIT_PAGINATION}`);
      }
    }
    if (this.props.certificate !== prevProps.certificate && this.props.match.params.id) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ isFetching: true });
      const mimtypes = {
        '89504E47': 'image/png',
        47494638: 'image/gif',
        25504446: 'application/pdf',
        FFD8FFDB: 'image/jpeg',
        FFD8FFE0: 'image/jpeg',
        FFD8FFE1: 'image/jpeg',
      };
      if (this.props.certificate.checksum_hash) {
        /* eslint-disable global-require */
        const hdkey = require('ethereumjs-wallet/hdkey');
        const bip39 = require('bip39');
        const mnemonic = bip39.entropyToMnemonic(this.props.certificate.checksum_hash);
        const seed = bip39.mnemonicToSeed(mnemonic);
        const hdKeyInstance = hdkey.fromMasterSeed(seed);
        const walletInstance = hdKeyInstance.getWallet();
        const privateKey = walletInstance.getPrivateKey();
        fetch(`https://ipfs.io/ipfs/${this.props.certificate.ipfs_hash}`)
          .then(response => response.arrayBuffer().then((buffer) => {
            const encryptedBuffer = Buffer.from(buffer);
            const decryptedBuffer = decrypt(privateKey, encryptedBuffer);
            const uint8Array = new Uint8Array(decryptedBuffer);
            const first4Bytest = uint8Array.slice(0, 4);
            const bytes = [];
            first4Bytest.forEach((byte) => {
              bytes.push(byte.toString(16));
            });
            const hexFirstBytes = bytes.join('').toUpperCase();
            if (!mimtypes[hexFirstBytes]) {
              return;
            }
            const blob = new Blob([uint8Array], { type: mimtypes[hexFirstBytes] });
            const url = URL.createObjectURL(blob);
            if (mimtypes[hexFirstBytes] === 'application/pdf') {
              document.getElementById('CertificatePDFFile').style.display = 'block';
              document.getElementById('CertificatePDFFile').data = url;
              document.getElementById('CertificatePDFFile').height = `${window.innerHeight * 0.8}px`;
            } else {
              document.getElementById('CertificatePDFFile').style.display = 'none';
              document.getElementById('CertificateFile').src = url;
            }
            this.setState({ isFetching: false });
          }));
      } else {
        fetch(`https://ipfs.io/ipfs/${this.props.certificate.ipfs_hash}`)
          .then(response => response.arrayBuffer().then((buffer) => {
            const uint8Array = new Uint8Array(buffer);
            const first4Bytest = uint8Array.slice(0, 4);
            const bytes = [];
            first4Bytest.forEach((byte) => {
              bytes.push(byte.toString(16));
            });
            const hexFirstBytes = bytes.join('').toUpperCase();
            if (!mimtypes[hexFirstBytes]) {
              return;
            }
            const blob = new Blob([uint8Array], { type: mimtypes[hexFirstBytes] });
            const url = URL.createObjectURL(blob);
            if (mimtypes[hexFirstBytes] === 'application/pdf') {
              document.getElementById('CertificatePDFFile').style.display = 'block';
              document.getElementById('CertificatePDFFile').data = url;
              document.getElementById('CertificatePDFFile').height = `${window.innerHeight * 0.8}px`;
            } else {
              document.getElementById('CertificatePDFFile').style.display = 'none';
              document.getElementById('CertificateFile').src = url;
            }
            this.setState({ isFetching: false });
          }));
      }
      const isChecked = this.massVerifyIds.indexOf(this.props.verification.id) !== -1;
      const isAdded = this.addedVerifications.indexOf(this.props.verification.id) !== -1;
      if (!isChecked && isAdded) {
        this.massVerifyVerifications.splice(this.props.verification, 1);
        this.addedVerifications.splice(this.props.verification.id, 1);
      } else if (!isAdded && isChecked) {
        this.massVerifyVerifications.push(this.props.verification);
        this.addedVerifications.push(this.props.verification.id);
      }
    }
  }

  handleVerificationsClick = () => {
    this.setState({ visibleVerifications: !this.state.visibleVerifications });
  }

  verificationsScroll = (event) => {
    const { scrollHeight, scrollTop, offsetHeight } = event.currentTarget;
    const shouldScroll = scrollHeight <= (scrollTop + offsetHeight);
    if (shouldScroll && this.props.nextUrl && !this.props.isFetchingList) {
      if (this.props.match.params.type === 'academy') {
        this.props.fetchVerifications(`${this.props.nextUrl}&active_profile=Academy`);
      } else {
        this.props.fetchVerifications(`${this.props.nextUrl}&active_profile=Business`);
      }
    }
  }

  massVerification() {
    this.props.verify(this.massVerifyVerifications);
    setTimeout(() => {
      this.setState({ activeVerificationId: null });
    }, 3000);
  }

  rejectVerification() {
    this.props.rejectVerification(this.state.activeVerificationId);
    setTimeout(() => {
      this.setState({ activeVerificationId: null });
    }, 3000);
  }

  massVerifyIds = []
  massVerifyVerifications = []
  addedVerifications = []

  handleSubmit(event, component) {
    event.preventDefault();
    component.props.verify([component.props.verification]);
    setTimeout(() => {
      component.setState({ activeVerificationId: null });
    }, 3000);
  }

  showVerification = (verificationId) => {
    this.handleVerificationsClick();
    if (this.state.activeVerificationId !== verificationId) {
      document.getElementById('CertificateFile').src = '';
      document.getElementById('CertificatePDFFile').height = '1px';
      document.getElementById('CertificatePDFFile').data = '';
      this.setState({ activeVerificationId: verificationId });
      this.props.history.push(`/verifications/${this.props.match.params.type}/${verificationId}/`);
      this.props.fetchVerification(`${bdnUrl}api/v1/verifications/${verificationId}/`);
    }
  }

  handleCheckboxClick =(e, { name }) => {
    if (e.target.parentElement.children[0].checked) {
      this.massVerifyIds.splice(name, 1);
      if (name === this.props.verification.id) {
        this.massVerifyVerifications.splice(this.props.verification, 1);
        this.addedVerifications.splice(this.props.verification.id, 1);
      }
    } else {
      this.massVerifyIds.push(name);
      if (name === this.props.verification.id) {
        this.addedVerifications.push(this.props.verification.id);
        this.massVerifyVerifications.push(this.props.verification);
      }
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
          <Breadcrumb.Section active>Certificates Verification List</Breadcrumb.Section>
        </Breadcrumb>
        <Divider hidden />
        <Header size="large" floated="left">
          Certificates verification
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
            You don&amp;t have pending certificates for verification.
          </p>
        </Message>
        <Responsive as={Grid} {...Responsive.onlyComputer}>
          <Grid.Column
            width={4}
            style={{ display: this.props.verifications.length > 0 ? null : 'none', paddingRight: 0 }}
          >
            <Menu
              className="verificationsList"
              fluid
              vertical
              pointing
              secondary
              onScroll={this.verificationsScroll}
              style={{ height: '78vh', borderTopRightRadius: 0, background: 'white' }}
            >
              {this.renderVerificationsMenu()}
            </Menu>
          </Grid.Column>
          <Grid.Column
            width={12}
            style={{ display: this.state.activeVerificationId ? 'block' : 'none', paddingLeft: 0 }}
          >
            <Segment style={(() => {
              let style = { borderColor: 'orange', borderTopLeftRadius: 0 };
              if (this.props.verification.state === 'pending') {
                style = Object.assign({}, style, { borderColor: 'blue' });
              } else if (this.props.verification.state === 'verified') {
                style = Object.assign({}, style, { borderColor: 'green' });
              } else if (this.props.verification.state === 'rejected' || this.props.verification.state === 'revoked') {
                style = Object.assign({}, style, { borderColor: 'red' });
              }
              return style;
            })()}
            >
              <Dimmer
                className="belowNavBar"
                inverted
                active={this.props.isUpdating || this.props.isVerifying || this.state.isFetching}
              >
                <Loader size="medium">
                  <Image src={loader} style={{ display: 'block', margin: '0 auto 10px auto', width: '96px' }} />
                  {
                    (() => {
                      if (this.props.isUpdating) {
                        return 'Updating the certificate...';
                      }
                      if (this.props.isVerifying) {
                        return 'Verifying the certificate...';
                      }
                      return 'Loading certificate file...';
                    })()
                  }
                </Loader>
              </Dimmer>
              <p>Verification status: {this.props.verification.state}</p>
              <Form size="big" onSubmit={(event) => { this.handleSubmit(event, this); }}>
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
                  <b>Certificate file</b><br /><br />
                  <img style={{ width: '100%' }} id="CertificateFile" alt="" src="" />
                  <object alt="" id="CertificatePDFFile" data="" type="application/pdf" width="100%" height="1px">
                    <p>Can&#39;t load certificate PDF file on this device</p>
                  </object>
                </label>
                <div style={{ display: this.props.verification.state === 'requested' || this.props.verification.state === 'open' || this.props.verification.state === 'pending' ? null : 'none', paddingTop: '20px' }}>
                  <Button type="submit" color="green" size="huge">Verify</Button>
                  <Button type="button" color="red" floated="right" size="huge" onClick={() => this.rejectVerification()}>Reject</Button>
                </div>
              </Form>
            </Segment>
          </Grid.Column>
        </Responsive>
        <Responsive
          as={Sidebar.Pushable}
          {...Responsive.onlyTablet}
          style={{ paddingTop: 0, paddingBottom: 0, minHeight: '100vh' }}
        >
          <Sidebar
            as={Menu}
            animation="overlay"
            vertical
            className="verificationsList"
            fluid
            pointing
            secondary
            onScroll={this.verificationsScroll}
            direction="left"
            width="wide"
            style={{ height: '100%', borderTopRightRadius: 0, background: 'white' }}
            visible={this.state.visibleVerifications}
          >
            {this.renderVerificationsMenu()}
          </Sidebar>
          <div
            style={{
              background: 'white',
              width: '100%',
              paddingBottom: '5px',
              borderBottom: '1px solid lightgray',
            }}
          >
            <Button
              onClick={this.handleVerificationsClick}
              icon
              labelPosition="left"
            >
              <Icon
                name="arrow left"
              />
                Pending Verifications
            </Button>
          </div>
          <div
            style={{ display: this.state.activeVerificationId ? 'block' : 'none', paddingLeft: 0 }}
          >
            <Segment style={(() => {
              let style = { borderColor: 'orange', borderTopLeftRadius: 0 };
              if (this.props.verification.state === 'pending') {
                style = Object.assign({}, style, { borderColor: 'blue' });
              } else if (this.props.verification.state === 'verified') {
                style = Object.assign({}, style, { borderColor: 'green' });
              } else if (this.props.verification.state === 'rejected' || this.props.verification.state === 'revoked') {
                style = Object.assign({}, style, { borderColor: 'red' });
              }
              return style;
            })()}
            >
              <Dimmer
                className="belowNavBar"
                inverted
                active={this.props.isUpdating || this.props.isVerifying || this.state.isFetching}
              >
                <Loader size="medium">
                  <Image src={loader} style={{ display: 'block', margin: '0 auto 10px auto', width: '96px' }} />
                  {
                    (() => {
                      if (this.props.isUpdating) {
                        return 'Updating the certificate...';
                      }
                      if (this.props.isVerifying) {
                        return 'Verifying the certificate...';
                      }
                      return 'Loading certificate file...';
                    })()
                  }
                </Loader>
              </Dimmer>
              <p>Verification status: {this.props.verification.state}</p>
              <Form size="big" onSubmit={(event) => { this.handleSubmit(event, this); }}>
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
                  <b>Certificate file</b><br /><br />
                  <img style={{ width: '100%' }} id="CertificateFile" alt="" src="" />
                  <object alt="" id="CertificatePDFFile" data="" type="application/pdf" width="100%" height="1px">
                    <p>Can&#39;t load certificate PDF file on this device</p>
                  </object>
                </label>
                <div style={{ display: this.props.verification.state === 'requested' || this.props.verification.state === 'open' || this.props.verification.state === 'pending' ? null : 'none', paddingTop: '20px' }}>
                  <Button type="submit" color="green" size="huge">Verify</Button>
                  <Button type="button" color="red" floated="right" size="huge" onClick={() => this.rejectVerification()}>Reject</Button>
                </div>
              </Form>
            </Segment>
          </div>
        </Responsive>
        <Responsive
          as={Sidebar.Pushable}
          {...Responsive.onlyMobile}
          style={{ paddingTop: 0, paddingBottom: 0, minHeight: '100vh' }}
        >
          <Sidebar
            as={Menu}
            animation="overlay"
            vertical
            className="verificationsList"
            fluid
            pointing
            secondary
            onScroll={this.verificationsScroll}
            direction="left"
            width="wide"
            style={{ height: '100%', borderTopRightRadius: 0, background: 'white' }}
            visible={this.state.visibleVerifications}
          >
            {this.renderVerificationsMenu()}
          </Sidebar>
          <div
            style={{
              background: 'white',
              width: '100%',
              paddingBottom: '5px',
              borderBottom: '1px solid lightgray',
            }}
          >
            <Button
              onClick={this.handleVerificationsClick}
              icon
              labelPosition="left"
            >
              <Icon
                name="arrow left"
              />
                Pending Verifications
            </Button>
          </div>
          <div
            style={{ display: this.state.activeVerificationId ? 'block' : 'none', paddingLeft: 0 }}
          >
            <Segment style={(() => {
              let style = { borderColor: 'orange', borderTopLeftRadius: 0 };
              if (this.props.verification.state === 'pending') {
                style = Object.assign({}, style, { borderColor: 'blue' });
              } else if (this.props.verification.state === 'verified') {
                style = Object.assign({}, style, { borderColor: 'green' });
              } else if (this.props.verification.state === 'rejected' || this.props.verification.state === 'revoked') {
                style = Object.assign({}, style, { borderColor: 'red' });
              }
              return style;
            })()}
            >
              <Dimmer
                className="belowNavBar"
                inverted
                active={this.props.isUpdating || this.props.isVerifying || this.state.isFetching}
              >
                <Loader size="medium">
                  <Image src={loader} style={{ display: 'block', margin: '0 auto 10px auto', width: '96px' }} />
                  {
                    (() => {
                      if (this.props.isUpdating) {
                        return 'Updating the certificate...';
                      }
                      if (this.props.isVerifying) {
                        return 'Verifying the certificate...';
                      }
                      return 'Loading certificate file...';
                    })()
                  }
                </Loader>
              </Dimmer>
              <p>Verification status: {this.props.verification.state}</p>
              <Form size="big" onSubmit={(event) => { this.handleSubmit(event, this); }}>
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
                  <b>Certificate file</b><br /><br />
                  <img style={{ width: '100%' }} id="CertificateFile" alt="" src="" />
                  <object alt="" id="CertificatePDFFile" data="" type="application/pdf" width="100%" height="1px">
                    <p>Can&#39;t load certificate PDF file on this device</p>
                  </object>
                </label>
                <div style={{ display: this.props.verification.state === 'requested' || this.props.verification.state === 'open' || this.props.verification.state === 'pending' ? null : 'none', paddingTop: '20px' }}>
                  <Button type="submit" color="green" size="huge">Verify</Button>
                  <Button type="button" color="red" floated="right" size="huge" onClick={() => this.rejectVerification()}>Reject</Button>
                </div>
              </Form>
            </Segment>
          </div>
        </Responsive>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    verifications: state.verifications.verifications,
    nextUrl: state.verifications.nextUrl,
    certificate: state.verification.verification.certificate,
    verification: state.verification.verification,
    isFetchingList: state.verifications.isFetching,
    isFetching: state.certificate.isFetching,
    isUpdating: state.certificate.isUpdating,
    isVerifying: state.verification.isVerifying,
    error: state.verifications.error,
    activeAccount: state.activeAccount.activeAccount,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchVerifications(url) {
      dispatch(fetchVerifications(url));
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
    rejectVerification(id) {
      dispatch(rejectVerification(id));
    },
    resetCertificateVerificationsProps() {
      dispatch(resetCertificateVerificationsProps());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CertificatesVerificationPage);
