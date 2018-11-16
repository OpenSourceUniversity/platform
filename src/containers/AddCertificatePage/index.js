import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Container, Grid, Header, Segment, Button, Message, Divider, Breadcrumb, Form, Input, Dimmer, Loader, Dropdown, Icon, Image, Checkbox } from 'semantic-ui-react';
import SkillsInput from '../../components/SkillsInput';
import IndustriesInput from '../../components/IndustriesInput';
import storeCertificateOnIpfs from '../../util/certificate/storeCertificateOnIpfs';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import { resetAddCertificateProps, resetCertificateAutocomplete } from './actions';


class AddCertificatePage extends React.Component {
  state = { byEmail: false }

  componentDidMount() {
    document.title = 'Add Certificate';
    this.props.resetAddCertificateProps();
    this.skillsRef.forceUpdate();
    this.industriesRef.forceUpdate();
    this.state = {
      fileName: null,
    };
    if (this.props.certificateAutocomplete.title) {
      this.state.certificate_title = this.props.certificateAutocomplete.title;
    }
    if (this.props.certificateAutocomplete.provider) {
      this.state.institution_title = this.props.certificateAutocomplete.provider.name;
      if (this.props.certificateAutocomplete.provider.academy_url) {
        this.state.institution_link = this.props.certificateAutocomplete.provider.academy_url;
      }
    }
  }

  componentWillUnmount() {
    this.props.resetCertificateAutocomplete();
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
    let institutionLink = event.target.elements.institution_link.value;
    if (institutionLink.indexOf('http') !== 0) {
      institutionLink = `http://${institutionLink}`;
    }
    let courseLink = event.target.elements.course_link.value;
    if (!!courseLink && courseLink.indexOf('http') !== 0) {
      courseLink = `http://${courseLink}`;
    }

    const isAnonymous = component.state.byEmail;


    const certificateData = {
      institution_title: event.target.elements.institution_title.value,
      institution_link: institutionLink,
      program_title: event.target.elements.program_title.value,
      certificate_title: event.target.elements.certificate_title.value,
      course_link: courseLink,
      industries,
      skills,
      granted_to_type: component.props.activeAccount === 'Learner' ? 1 : component.state.granted_to_type,
      score: event.target.elements.score.value,
      expiration_date: event.target.elements.expiration_date.value,
      checksum_hash: component.state.hash,
    };
    if (isAnonymous) {
      certificateData.holder_email = event.target.elements.holder_email.value;
    } else {
      certificateData.holder_eth_address = component.props.activeAccount === 'Learner' ? component.props.ethAddress : event.target.elements.holder_eth_address.value;
    }
    if (event.target.elements.duration.value) {
      certificateData.duration = event.target.elements.duration.value;
    }
    if (component.state.buffer) {
      component.props.storeCertificateOnIpfs(component.state.buffer, certificateData);
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

  handleCheckboxChange = (e, { checked }) => {
    this.setState({ byEmail: checked });
    this.state({ holder_email: null });
    this.state({ holder_eth_address: null });
  }

  validation = () => {
    if (this.state.byEmail) {
      return !this.state.buffer || !this.state.certificate_title
        || !(this.props.activeAccount === 'Learner' ? this.props.ethAddress : true)
        || !(!(this.props.activeAccount === 'Learner') && this.state.byEmail ?
          this.state.holder_email : this.state.holder_eth_address)
        || !this.state.institution_title || !this.state.institution_link
        || !(this.props.activeAccount === 'Learner' ? true : this.state.granted_to_type);
    }
    return !this.state.buffer || !this.state.certificate_title
        || !(this.props.activeAccount === 'Learner' ? this.props.ethAddress : true)
        || !this.state.institution_title || !this.state.institution_link
        || !(this.props.activeAccount === 'Learner' ? true : this.state.granted_to_type);
  }

  captureCertificateFile = (file) => {
    if (file.type.match(/image.*/) || file.type === 'application/pdf') {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => this.storeCertificateFile(reader);
    } else {
      /* eslint-disable no-param-reassign */
      this.setState({ buffer: null });
    }
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
          <Breadcrumb.Section active>Add Certificate</Breadcrumb.Section>
        </Breadcrumb>

        <Divider hidden />

        <Header size="large">
          Add certificate
        </Header>

        <Message success hidden={!this.props.isAdded}>
          <p>Certificate added successfully.</p>
        </Message>

        <Message error hidden={!this.props.error}>
          <p>{this.props.error}</p>
        </Message>

        <Dimmer className="belowNavBar" active={this.props.isAdding || this.props.isEncrypting} inverted>
          <Loader size="medium">
            <p>This may take a few moments</p>
            <Image src={loader} style={{ display: 'block', margin: '0 auto 10px auto', width: '96px' }} />
            {(() => {
              if (this.props.isEncrypting) {
                return 'Encrypting certificate file...';
              }
              if (this.props.isAdding) {
                return 'Uploading certificate file on IPFS...';
              }
              return 'Adding certificate on BDN...';
            })()}
          </Loader>
        </Dimmer>
        <Form size="large" onSubmit={(event) => { this.handleSubmit(event, this); }}>
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column mobile={16} tablet={10} computer={10}>
                <Segment style={{ display: (this.props.isAdded || this.props.error) ? 'none' : 'block' }}>
                  <Form.Field required>
                    <label htmlFor="certificate_title">
                      Course title
                    </label>
                    <Input
                      id="certificate_title"
                      name="certificate_title"
                      maxLength={130}
                      iconPosition="left"
                      icon="file"
                      placeholder="Official course title"
                      key={`title:${this.props.certificateAutocomplete.title || ''}`}
                      defaultValue={this.props.certificateAutocomplete.title ? this.props.certificateAutocomplete.title : ''}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <IndustriesInput
                    ref={(arg) => { this.industriesRef = arg; }}
                    industries={this.props.certificateAutocomplete.industries}
                  />
                  <SkillsInput
                    ref={(arg) => { this.skillsRef = arg; }}
                    skills={this.props.certificateAutocomplete.skills}
                  />
                  <Form.Field>
                    <label htmlFor="course_link">
                      Course link (if any)
                    </label>
                    <Input
                      id="course_link"
                      name="course_link"
                      label="http://"
                      labelPosition="left"
                      placeholder="example.com"
                      key={`title:${this.props.certificateAutocomplete.external_link || ''}`}
                      defaultValue={
                        (() => {
                          if (this.props.certificateAutocomplete.external_link) {
                            const url = this.props.certificateAutocomplete.external_link;
                            if (url.indexOf('http://') === 0) {
                              return url.slice(7);
                            }
                            if (url.indexOf('https://') === 0) {
                              return url.slice(8);
                            }
                            return url;
                          }
                          return '';
                        })()
                      }
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
                      key={`duration:${this.props.certificateAutocomplete.duration || ''}`}
                      defaultValue={this.props.certificateAutocomplete.duration ? this.props.certificateAutocomplete.duration : ''}
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
                  {this.props.activeAccount === 'Learner' ?
                    null :
                    <Checkbox
                      name="by_email"
                      label="Add by email"
                      style={{ marginBottom: '10px' }}
                      toggle
                      onChange={this.handleCheckboxChange}
                      defaultChecked={false}
                    />
                  }
                  {this.state.byEmail ?
                    <Form.Field required>
                      <label htmlFor="holder_email">
                        Holder email
                      </label>
                      <Input
                        id="holder_email"
                        name="holder_email"
                        iconPosition="left"
                        icon="globe"
                        placeholder="Holder email"
                        type="email"
                        maxLength={130}
                        onChange={this.handleChange}
                      />
                    </Form.Field> :
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
                  }
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
                      maxLength={130}
                      iconPosition="left"
                      icon="university"
                      placeholder="Official name of your academy"
                      onChange={this.handleChange}
                      key={`title:${this.props.certificateAutocomplete.provider || ''}`}
                      defaultValue={this.props.certificateAutocomplete.provider ? this.props.certificateAutocomplete.provider.name : ''}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label htmlFor="institution_link">
                      Academy site
                    </label>
                    <Input
                      id="institution_link"
                      name="institution_link"
                      label="http://"
                      labelPosition="left"
                      placeholder="example.com"
                      onChange={this.handleChange}
                      key={`academy_url:${this.props.certificateAutocomplete.provider || ''}`}
                      defaultValue={
                        (() => {
                          const provider = this.props.certificateAutocomplete.provider;
                          if (provider && this.props.certificateAutocomplete.provider.academy_url) {
                            const url = this.props.certificateAutocomplete.provider.academy_url;
                            if (url.indexOf('http://') === 0) {
                              return url.slice(7);
                            }
                            if (url.indexOf('https://') === 0) {
                              return url.slice(8);
                            }
                            return url;
                          }
                          return '';
                        })()
                      }
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="program_title">
                      Program title (if any)
                    </label>
                    <Input
                      id="program_title"
                      name="program_title"
                      maxLength={130}
                      iconPosition="left"
                      icon="list"
                      placeholder="Name of program"
                      key={`title:${this.props.certificateAutocomplete.program_title || ''}`}
                      defaultValue={this.props.certificateAutocomplete.program_title ? this.props.certificateAutocomplete.program_title : ''}
                    />
                  </Form.Field>
                </Segment>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={6} computer={6}>
                <Segment style={{ display: (this.props.isAdded || this.props.error) ? 'none' : 'block' }}>
                  <Form.Field required>
                    <label htmlFor="certificate_file">
                      Certificate file in PDF or image (PNG, GIF, JPEG)
                    </label>
                    <Dropzone
                      id="certificate_file"
                      style={{ align: 'center', height: '100px', marginBottom: '1em' }}
                      accept="image/*, application/pdf"
                      name="certificate_file"
                      onDrop={
                        (accepted, rejected) => {
                          if (accepted.length > 0 && rejected.length === 0) {
                            const file = accepted[0];
                            if (file.size > 10485760) {
                              /* eslint-disable no-param-reassign */
                              this.setState({ buffer: null });
                              this.setState({ fileString: 'This file is too big. Max size is 10 MB' });
                            } else {
                              this.captureCertificateFile(file);
                              this.setState({ fileString: file.name });
                            }
                          }
                          if (rejected.length > 0 && accepted.length === 0) {
                            this.setState({ buffer: null });
                            this.setState({ fileString: 'Wrong file format. Accept only Images and PDF' });
                          }
                        }
                      }
                    >
                      <Container
                        textAlign="center"
                        style={{ border: '2px dashed grey', height: '100%', borderRadius: '5px' }}
                      >
                        <div style={{ padding: '37px 15px 15px 15px', textAlign: 'center' }}>
                          <Icon name="upload" />
                          {this.state.fileString ? this.state.fileString : 'Certificate file Dropzone'}
                        </div>
                      </Container>
                    </Dropzone>
                  </Form.Field>
                </Segment>
                <Segment style={{ textAlign: 'center', display: (this.props.isAdded || this.props.error) ? 'none' : 'block' }}>
                  <Button disabled={this.validation()} type="submit" primary size="huge">Upload Certificate</Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    isAdding: state.addCertificate.isAdding,
    isEncrypting: state.addCertificate.isEncrypting,
    ipfsAdding: state.addCertificate.ipfsAdding,
    error: state.addCertificate.error,
    isAdded: state.addCertificate.isAdded,
    ethAddress: state.auth.address,
    activeAccount: state.activeAccount.activeAccount,
    certificateAutocomplete: state.certificate.certificateAutocomplete,
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
    resetCertificateAutocomplete() {
      dispatch(resetCertificateAutocomplete());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCertificatePage);
