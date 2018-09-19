import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Segment, Button, Message, Divider, Breadcrumb, Form, Input, Dimmer, Loader, Dropdown } from 'semantic-ui-react';
import SkillsInput from 'components/SkillsInput';
import IndustriesInput from 'components/IndustriesInput';
import storeCertificateOnIpfs from '../../util/certificate/storeCertificateOnIpfs';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import resetAddCertificateProps from './actions';


class AddCertificatePage extends React.Component {
  state = { certificateFileIsMissing: false }

  componentDidMount() {
    document.title = 'Add Certificate';
    this.props.resetAddCertificateProps();
  }

  getDynamicOptions() {
    const { activeAccount } = this.props;
    switch (activeAccount) {
    case 'Academy': return ([
      {
        text: 'Learner',
        value: 1,
      },
      {
        text: 'Me',
        value: 2,
      }]);
    case 'Business': return ([
      {
        text: 'Learner',
        value: 1,
      },
      {
        text: 'Academy',
        value: 2,
      },
      {
        text: 'Me',
        value: 3,
      }]);
    default: return null;
    }
  }

  handleSubmit(event, component) {
    event.preventDefault();

    const industries = this.industriesRef.state.currentValue;
    const skills = this.skillsRef.state.currentValue;

    const certificateData = {
      institution_title: event.target.elements.institution_title.value,
      institution_link: event.target.elements.institution_link.value,
      program_title: event.target.elements.program_title.value,
      certificate_title: event.target.elements.certificate_title.value,
      course_link: event.target.elements.course_link.value,
      industries,
      skills,
      holder_eth_address: component.props.activeAccount === 'Learner' ? component.props.ethAddress : event.target.elements.holder_eth_address.value,
      granted_to_type: component.props.activeAccount === 'Learner' ? 1 : component.state.granted_to_type,
      score: event.target.elements.score.value,
      expiration_date: event.target.elements.expiration_date.value,
      checksum_hash: component.state.hash,
    };
    if (event.target.elements.duration.value) {
      certificateData.duration = event.target.elements.duration.value;
    }
    if (component.state.buffer) {
      component.props.storeCertificateOnIpfs(component.state.buffer, certificateData);
    } else {
      component.setState({ certificateFileIsMissing: true });
    }
  }

  grantedToTypeOptions = [
    {
      text: 'Learner',
      value: 1,
    },
    {
      text: 'Academy',
      value: 2,
    },
    {
      text: 'Business',
      value: 3,
    },
  ]

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  validation = () => !this.state.buffer || !this.state.certificate_title
        || !(this.props.activeAccount === 'Learner' ? this.props.ethAddress : this.state.holder_eth_address)
        || !this.state.institution_title || !this.state.institution_link
        || !(this.props.activeAccount === 'Learner' ? true : this.state.granted_to_type)

  captureCertificateFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.storeCertificateFile(reader);
  }

  storeCertificateFile = (reader) => {
    // file is converted to a buffer to prepare for uploading to IPFS
    const buffer = Buffer.from(reader.result);
    /* eslint-disable react/no-unused-state */
    /* eslint-disable global-require */
    const lib = require('node-file-hash');
    lib.createHash(buffer).then((hash) => {
      this.setState({ hash: hash.sha256 });
    });
    /* eslint-disable prefer-destructuring */
    this.setState({ buffer });
    this.setState({ certificateFileIsMissing: false });
    /* eslint-enable react/no-unused-state */
  };
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
          <Breadcrumb.Section href="/#/certificates">Certificates</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Add certificate</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />

        <Header size="large">
          Add certificate
        </Header>

        <Message success hidden={!this.props.isAdded}>
          <p>Certificate added successfully.</p>
        </Message>

        <Message error hidden={!this.props.error}>
          <p>{this.props.error}</p>
        </Message>

        <Segment style={{ display: (this.props.isAdded || this.props.error) ? 'none' : 'block' }}>
          <Dimmer active={this.props.isAdding} inverted>
            <Loader size="medium">
              <p>This may take a few moments</p>
              <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                <image href={loader} x="0" y="0" width="100%" height="100%" />
              </svg>
              {this.props.ipfsAdding ? 'Uploading certificate file on IPFS...' : 'Adding certificate on BDN...'}
            </Loader>
          </Dimmer>
          <Form size="large" onSubmit={(event) => { this.handleSubmit(event, this); }}>
            <Grid divided="vertically">
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Form.Field required>
                    <label htmlFor="certificate_file">
                      Certificate file in PDF
                    </label>
                    <Input
                      id="certificate_file"
                      iconPosition="left"
                      icon="upload"
                      type="file"
                      accept=".png,.gif,.jpg,.jpeg,.pdf"
                      error={this.state.certificateFileIsMissing}
                      name="certificate_file"
                      placeholder="Certificate File"
                      onChange={this.captureCertificateFile}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Form.Field required>
                    <label htmlFor="certificate_title">
                      Course title
                    </label>
                    <Input
                      id="certificate_title"
                      name="certificate_title"
                      iconPosition="left"
                      icon="file"
                      placeholder="Official course title"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <IndustriesInput ref={(arg) => { this.industriesRef = arg; }} />
                  <SkillsInput ref={(arg) => { this.skillsRef = arg; }} />
                  <Form.Field>
                    <label htmlFor="course_link">
                      Course link (if any)
                    </label>
                    <Input
                      id="course_link"
                      name="course_link"
                      type="url"
                      iconPosition="left"
                      icon="chain"
                      placeholder="Link to your course"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="duration">
                      Course duration in hours (if any)
                    </label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      iconPosition="left"
                      icon="time"
                      placeholder="Course duration"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="expiration_date">
                      Certificate expiration date (if any)
                    </label>
                    <Input
                      id="expiration_date"
                      name="expiration_date"
                      iconPosition="left"
                      icon="calendar check"
                      type="date"
                      placeholder="Certificate expiration date"
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field required>
                    <label htmlFor="holder_eth_address">
                      Learner address
                    </label>
                    <Input
                      id="holder_eth_address"
                      name="holder_eth_address"
                      iconPosition="left"
                      icon="globe"
                      placeholder="ETH address of learner"
                      defaultValue={this.props.activeAccount === 'Learner' ? this.props.ethAddress : ''}
                      readOnly={this.props.activeAccount === 'Learner'}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  {this.props.activeAccount === 'Learner' ?
                    null :
                    <Form.Field required>
                      <label htmlFor="granted_to_type">
                        Granted to type
                      </label>
                      <Dropdown
                        id="granted_to_type"
                        name="granted_to_type"
                        placeholder="Granted to type"
                        fluid
                        selection
                        onChange={(e, { value }) => {
                          /* eslint-disable react/no-unused-state */
                          this.setState({ granted_to_type: value });
                          /* eslint-enable react/no-unused-state */
                        }}
                        options={this.getDynamicOptions()}
                      />
                    </Form.Field>
                  }
                  <Form.Field>
                    <label htmlFor="score">
                      Learner score (if any)
                    </label>
                    <Input
                      id="score"
                      name="score"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      iconPosition="left"
                      icon="graduation"
                      placeholder="Your score (from 0 to 100)"
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label htmlFor="institution_title">
                      Academy title
                    </label>
                    <Input
                      id="institution_title"
                      name="institution_title"
                      iconPosition="left"
                      icon="university"
                      placeholder="Official name of your academy"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label htmlFor="institution_link">
                      Academy site
                    </label>
                    <Input
                      id="institution_link"
                      name="institution_link"
                      iconPosition="left"
                      icon="chain"
                      type="url"
                      placeholder="Site of academy"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="program_title">
                      Program title (if any)
                    </label>
                    <Input
                      id="program_title"
                      name="program_title"
                      iconPosition="left"
                      icon="list"
                      placeholder="Name of program"
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1} >
                <Grid.Column textAlign="center">
                  <Button disabled={this.validation()} type="submit" primary size="huge">Upload Certificate</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    isAdding: state.addCertificate.isAdding,
    ipfsAdding: state.addCertificate.ipfsAdding,
    error: state.addCertificate.error,
    isAdded: state.addCertificate.isAdded,
    ethAddress: state.auth.address,
    activeAccount: state.activeAccount.activeAccount,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    storeCertificateOnIpfs(buffer, certificateData) {
      dispatch(storeCertificateOnIpfs(buffer, certificateData));
    },
    resetAddCertificateProps() {
      dispatch(resetAddCertificateProps());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCertificatePage);
