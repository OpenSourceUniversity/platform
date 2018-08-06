import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Segment, Button, Message, Divider, Breadcrumb, Form, Input, Dimmer, Loader } from 'semantic-ui-react';
import { addCertificate, storeProofOfExistance } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import { getIpfs } from '../../util/ipfs/getIpfs';
import Industries from '../../data/industryList';
import Skills from '../../data/skillsList';


class AddCertificatePage extends React.Component {
  state = { fileIsMissing: false }

  componentDidMount() {
    this.props.getIpfs();
    document.title = 'Add Certificate | OS.University';
  }

  handleSubmit(event, component) {
    event.preventDefault();
    const categories = [];
    const skills = [];
    for (let i = 0; i < (event.target.elements[6].parentElement.childElementCount - 5); i += 1) {
      categories.push(event.target.elements[6].parentElement.children[i].textContent);
    }

    for (let i = 0; i < (event.target.elements[7].parentElement.childElementCount - 5); i += 1) {
      skills.push(event.target.elements[7].parentElement.children[i].textContent);
    }
    const certificateData = {
      academy_title: event.target.elements.academy_title.value,
      academy_address: event.target.elements.academy_address.value,
      academy_link: event.target.elements.academy_link.value,
      program_title: event.target.elements.program_title.value,
      course_title: event.target.elements.course_title.value,
      course_link: event.target.elements.course_link.value,
      categories,
      skills,
      learner_eth_address: event.target.elements.learner_eth_address.value,
      score: event.target.elements.score.value,
      duration: event.target.elements.duration.value,
      expiration_date: event.target.elements.expiration_date.value,
    };
    if (component.state.buffer) {
      component.props.storeProofOfExistance(component.state.buffer, certificateData);
    } else {
      component.setState({ fileIsMissing: true });
    }
  }

  captureFile =(event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }

  convertToBuffer = (reader) => {
    // file is converted to a buffer to prepare for uploading to IPFS
    const buffer = Buffer.from(reader.result);
    /* eslint-disable prefer-destructuring */
    /* eslint-disable react/no-unused-state */
    this.setState({ buffer });
    this.setState({ fileIsMissing: false });
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

        <Segment style={{ display: this.props.isAdded ? 'none' : 'block' }}>
          <Dimmer active={this.props.isAdding} inverted>
            <Loader size="medium">
              <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                <image href={loader} x="0" y="0" width="100%" height="100%" />
              </svg>
              Adding certificate...
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
                      error={this.state.fileIsMissing}
                      name="certificate_file"
                      placeholder="Certificate File"
                      onChange={this.captureFile}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Form.Field required>
                    <label htmlFor="course_title">
                      Course title
                    </label>
                    <Input
                      id="course_title"
                      name="course_title"
                      iconPosition="left"
                      icon="file"
                      placeholder="Official course title"
                    />
                  </Form.Field>
                  <Form.Dropdown
                    id="categories"
                    name="categories"
                    placeholder="Your course categories"
                    label="Course categories"
                    fluid
                    search
                    multiple
                    required
                    options={Industries.Industries}
                  />
                  <Form.Dropdown
                    id="skills"
                    name="skills"
                    placeholder="Received skills"
                    label="Skills"
                    fluid
                    search
                    multiple
                    required
                    options={Skills.Skills}
                  />
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
                    <label htmlFor="learner_eth_address">
                      Learner address
                    </label>
                    <Input
                      id="learner_eth_address"
                      name="learner_eth_address"
                      iconPosition="left"
                      icon="globe"
                      placeholder="ETH address of learner"
                    />
                  </Form.Field>
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
                    <label htmlFor="academy_title">
                      Academy title
                    </label>
                    <Input
                      id="academy_title"
                      name="academy_title"
                      iconPosition="left"
                      icon="university"
                      placeholder="Oficial name of your academy"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="academy_address">
                      Academy ETH address (if any)
                    </label>
                    <Input
                      id="academy_address"
                      name="academy_address"
                      iconPosition="left"
                      icon="globe"
                      placeholder="ETH address of your academy"
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label htmlFor="academy_link">
                      Academy site
                    </label>
                    <Input
                      id="academy_link"
                      name="academy_link"
                      iconPosition="left"
                      icon="chain"
                      type="url"
                      placeholder="Site of academy"
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
                  <Button type="submit" primary size="huge">Upload Certificate</Button>
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
    error: state.addCertificate.error,
    isAdded: state.addCertificate.isAdded,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    addCertificate(state) {
      dispatch(addCertificate(state));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    storeProofOfExistance(buffer, certificateData) {
      dispatch(storeProofOfExistance(buffer, certificateData));
    },
    getIpfs() {
      dispatch(getIpfs());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCertificatePage);
