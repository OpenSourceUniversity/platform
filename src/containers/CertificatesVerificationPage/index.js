import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Grid, Button, Icon, Divider, Checkbox, Breadcrumb, Loader, Message, Dimmer, Menu, Segment, Form, Input } from 'semantic-ui-react';
import SkillItem from 'components/SkillItem';
import { fetchCertificates } from '../CertificatesPage/actions';
import { fetchCertificate } from '../CertificatePage/actions';
import { addCertificate, verifyCertificate, massVerification, rejectCertificate } from '../AddCertificatePage/actions';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import Industries from '../../data/industryList';
import Skills from '../../data/skillsList';


class CertificatesVerificationPage extends React.Component {
  /* eslint-disable react/no-unused-state */
  state = { activeItem: null, verification: false }

  componentDidMount() {
    this.props.fetchCertificates('http://localhost:8000/api/v1/certificates/get_certificates_by_academy');
    this.props.setSecondaryNav('academia');
    document.title = 'Certificates Validation | OS.University';
  }

  getSkills(obj) {
    const needle = this.props.certificate.skills;
    const skills = [];
    if (!needle) {
      return null;
    }
    for (let i = 0; i < needle.length; i += 1) {
      const result = obj.filter(skill => skill.text === needle[i]);
      if (result.length) {
        skills.push(result[0].value);
      }
    }
    return skills;
  }

  getIndustries(obj) {
    const needle = this.props.certificate.subject;
    const categories = [];
    if (!needle) {
      return null;
    }
    for (let i = 0; i < needle.length; i += 1) {
      const result = obj.filter(category => category.text === needle[i]);
      if (result.length) {
        categories.push(result[0].value);
      }
    }
    return categories;
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
    const subjects = [];
    const skills = [];
    for (let i = 0; i < (event.target.elements[6].parentElement.childElementCount - 5); i += 1) {
      subjects.push(event.target.elements[6].parentElement.children[i].textContent);
    }

    for (let i = 0; i < (event.target.elements[7].parentElement.childElementCount - 5); i += 1) {
      skills.push(event.target.elements[7].parentElement.children[i].textContent);
    }
    const certificateData = {
      id: component.state.activeItem,
      academy_title: event.target.elements.academy_title.value,
      academy_link: event.target.elements.academy_link.value,
      program_title: event.target.elements.program_title.value,
      course_title: event.target.elements.course_title.value,
      course_link: event.target.elements.course_link.value,
      subject: subjects,
      skills,
      score: event.target.elements.score.value,
      duration: event.target.elements.duration.value,
      expiration_date: event.target.elements.expiration_date.value,
    };
    if (component.state.verification) {
      component.props.verifyCertificate(certificateData, 'http://localhost:8000/api/v1/certificates/update_certificate_by_id/');
    } else {
      component.props.addCertificate(certificateData, null, 'http://localhost:8000/api/v1/certificates/update_certificate_by_id/');
    }
    component.setState({ verification: false });
    component.setState({ activeItem: null });
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.fetchCertificate(`http://localhost:8000/api/v1/certificates/${name}/`);
  }

  handleCheckboxClick =(e, { name }) => {
    if (e.target.parentElement.children[0].checked) {
      this.massVerifyIds.splice(name, 1);
    } else {
      this.massVerifyIds.push(name);
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
          <Grid.Column width={4}>
            <Menu fluid vertical pointing>
              {this.renderCertificatesMenu()}
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment style={{ display: this.state.activeItem ? null : 'none', borderColor: this.props.certificate.verified ? 'green' : 'orange' }}>
              <Dimmer active={this.props.isFetching} inverted>
                <Loader size="large">Loading</Loader>
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
                      <b>Course subjects</b> <br /><br />
                    </label>
                    {this.renderSubjects()}
                    <br /><br />
                  </div> :
                  <Form.Dropdown
                    id="subject"
                    name="subject"
                    placeholder="Your course subjects"
                    label="Course subjects"
                    fluid
                    search
                    multiple
                    key={`subject:${this.props.certificate.subject || ''}`}
                    defaultValue={this.getIndustries(Industries.Industries)}
                    options={Industries.Industries}
                    readOnly={this.props.certificate.verified}
                  />
                }
                {this.props.certificate.verified ?
                  <div>
                    <label>
                      <b>Recieved skills</b> <br /><br />
                    </label>
                    {this.renderSkills()}
                    <br /><br />
                  </div> :
                  <Form.Dropdown
                    id="skills"
                    name="skills"
                    placeholder="Recieved skills"
                    label="Skills"
                    fluid
                    search
                    multiple
                    key={`skills:${this.props.certificate.skills || ''}`}
                    defaultValue={this.getSkills(Skills.Skills)}
                    options={Skills.Skills}
                    readOnly={this.props.certificate.verified}
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
                    />
                  </label>
                </Form.Field>
                <div style={{ display: this.props.certificate.verified ? 'none' : null }}>
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
    addCertificate(data, IPFShash, url) {
      dispatch(addCertificate(data, IPFShash, url));
    },
    verifyCertificate(data, url) {
      dispatch(verifyCertificate(data, url));
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
