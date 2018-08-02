import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Segment, Button, Message, Divider, Breadcrumb, Form, Input, Dimmer, Loader } from 'semantic-ui-react';
import { addCertificate, storeProofOfExistance } from './actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import getIpfs from '../../util/ipfs/getIpfs';
import Industries from '../../data/industryList';
import Skills from '../../data/skillsList';


class AddCertificatePage extends React.Component {
  handleSubmit(event, component) {
    event.preventDefault();
    const subjects = [];
    const skills = [];
    for (let i = 0; i < (event.target.elements[6].parentElement.childElementCount - 5); i += 1) {
      subjects.push(event.target.elements[6].parentElement.children[i].textContent);
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
      subject: subjects,
      skills,
      learner_eth_address: event.target.elements.learner_eth_address.value,
      score: event.target.elements.score.value,
      duration: event.target.elements.duration.value,
      expiration_date: event.target.elements.expiration_date.value,
    };
    component.props.addCertificate(certificateData);
    // component.props.getIpfs();
    // component.props.storeProofOfExistance(this.state.buffer);
  }

  captureFile =(event) => {
      event.stopPropagation();
      event.preventDefault();
      const file = event.target.files[0];
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => this.convertToBuffer(reader);
  }

  convertToBuffer = (reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
      const buffer = Buffer.from(reader.result);
      this.setState({buffer});
  };

  render() {
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
        <Header size="large" floated="left">
          Add certificate
        </Header>

        <Divider clearing />

        <Message success hidden={!this.props.isAdded}>
          <p>Certificate added successfully.</p>
        </Message>

        <Message error hidden={!this.props.error}>
          <p>{this.props.error}</p>
        </Message>

        <Segment style={{ display: this.props.isAdded ? 'none' : 'block' }}>
          <Dimmer active={this.props.isAdding} inverted>
            <Loader size="medium">
              Adding certificate...
            </Loader>
          </Dimmer>

          <Form size="huge" onSubmit={(event) => { this.handleSubmit(event, this); }}>
            <Form.Field required>
              <label htmlFor="academy_title">
                Academy title
                <Input
                  id="academy_title"
                  name="academy_title"
                  iconPosition="left"
                  icon="certificate"
                  placeholder="Oficial name of your academy"
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
                />
              </label>
            </Form.Field>
            <Form.Dropdown
              id="subject"
              name="subject"
              placeholder="Your course subjects"
              label="Course subjects"
              fluid
              search
              multiple
              options={Industries.Industries}
            />
            <Form.Dropdown
              id="skills"
              name="skills"
              placeholder="Recieved skills"
              label="Skills"
              fluid
              search
              multiple
              options={Skills.Skills}
            />
            <Form.Field required>
              <label htmlFor="learner_eth_address">
                Learner address
                <Input
                  id="learner_eth_address"
                  name="learner_eth_address"
                  iconPosition="left"
                  icon="address card"
                  placeholder="ETH address of learner"
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
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="duration">
                Course duration in hours (if have)
                <Input
                  id="duration"
                  name="duration"
                  type="time"
                  iconPosition="left"
                  icon="address card"
                  placeholder="Course duration"
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
                  placeholder="Certificate expiration date"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="certificate_file">
                Certificate file in PDF
                <Input
                  id="certificate_file"
                  iconPosition="left"
                  icon="address card"
                  type="file"
                  name="certificate_file"
                  placeholder="Certificate File"
                  onChange={this.captureFile}
                />
              </label>
            </Form.Field>
            <Button type="submit" primary size="huge">Submit</Button>
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
    storeProofOfExistance(state) {
      dispatch(storeProofOfExistance(state));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCertificatePage);
