import React from 'react';
import ReactQuill from 'react-quill';
import SkillItem from 'components/SkillItem';
import { Container, Header, Segment, Button, Divider, Form, Input, Breadcrumb, Grid, Label, Icon, Menu, Sticky } from 'semantic-ui-react';
import 'react-quill/dist/quill.snow.css';


export default class CreateJobPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { textDescription: '', textResponsobilities: '', textQualifications: '', textOffer: '', skillsArray: []} // You can also pass a Quill Delta here
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleChangeResponsobilities = this.handleChangeResponsobilities.bind(this)
    this.handleChangeQualifications = this.handleChangeQualifications.bind(this)
    this.handleChangeOffer = this.handleChangeOffer.bind(this)
    this.reactDescriptionRef = null;
    this.reactResponsobilitiesRef = null;
    this.reactQualificationsRef = null;
    this.reactOfferRef = null;
    this.skillsArray = [];
  }
  handleChangeDescription(value) {
    this.setState({ textDescription: value })
    this.setState({ descriptionHTML: this.reactDescriptionRef.editor.container.firstChild.innerHTML })
  }
  handleChangeResponsobilities(value) {
    this.setState({ textResponsobilities: value })
    this.setState({ responsobilitiesHTML: this.reactResponsobilitiesRef.editor.container.firstChild.innerHTML })
  }
  handleChangeQualifications(value) {
    this.setState({ textQualifications: value })
    this.setState({ qualificationsHTML: this.reactQualificationsRef.editor.container.firstChild.innerHTML })
  }
  handleChangeOffer(value) {
    this.setState({ textOffer: value })
    this.setState({ offerHTML: this.reactOfferRef.editor.container.firstChild.innerHTML })
  }
  renderSkills() {
    var skills = [];
    for(var i = 0; i < this.state.skillsArray.length; i+=1) {
      skills.push({
        have_icon: false, check: true, name: this.state.skillsArray[i], basic: false,
      },);
    }
    console.log(this.skillsArray);
    console.log(this.skills);
    console.log(this.state.skillsArray)
    return skills.map((course, index) => (
      <SkillItem skill={course} key={index} />
    ));
  }
  renderRating(ratingNumb) {
    return (
      <div className="ui accurate star widget inline" style={{ marginRight: '10px' }}>
        <div className="highlight" style={{ width: `${ratingNumb / 5 * 100}%` }} />
      </div>);
  }
  render() {
    const { contextRef } = this.state
    const skills = [
      { key: 'angular', text: 'Angular', value: 'angular' },
      { key: 'css', text: 'CSS', value: 'css' },
      { key: 'design', text: 'Graphic Design', value: 'design' },
      { key: 'ember', text: 'Ember', value: 'ember' },
      { key: 'html', text: 'HTML', value: 'html' },
      { key: 'ia', text: 'Information Architecture', value: 'ia' },
      { key: 'javascript', text: 'Javascript', value: 'javascript' },
      { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
      { key: 'meteor', text: 'Meteor', value: 'meteor' },
      { key: 'node', text: 'NodeJS', value: 'node' },
      { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
      { key: 'python', text: 'Python', value: 'python' },
      { key: 'rails', text: 'Rails', value: 'rails' },
      { key: 'react', text: 'React', value: 'react' },
      { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
      { key: 'ruby', text: 'Ruby', value: 'ruby' },
      { key: 'ui', text: 'UI Design', value: 'ui' },
      { key: 'ux', text: 'User Experience', value: 'ux' },
    ];
    return (
      <Container fluid>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section href="/#/jobs">Job list</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Add job position</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size="large" floated="left">
          Add job position
        </Header>

        <Divider clearing />
        <Grid>
          <Grid.Column computer={8}>
            <Segment>

              <Form size="huge">
                <Form.Field>
                  <label htmlFor="jobTitle">
                    Job title
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      iconPosition="left"
                      icon="address card outline"
                      placeholder="Job title"
                      onChange={(e, {value})=>{this.setState( {job_title: value})}}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="location">
                    Location
                    <Input
                      id="location"
                      name="location"
                      iconPosition="left"
                      icon="location arrow"
                      placeholder="Location"
                      onChange={(e, {value})=>{this.setState( {location: value})}}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="industry">
                    Industry
                    <Input
                      id="industry"
                      name="industry"
                      iconPosition="left"
                      icon="industry"
                      placeholder="Industry"
                      onChange={(e, {value})=>{this.setState( {industry: value})}}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="closes">
                    Closes
                    <Input
                      id="closes"
                      name="closes"
                      iconPosition="left"
                      icon="delete calendar"
                      placeholder="Closes"
                      onChange={(e, {value})=>{this.setState( {closes: value})}}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="experience">
                    Experience level
                    <Input
                      id="experience"
                      name="experience"
                      iconPosition="left"
                      icon="book"
                      placeholder="Experience level"
                      onChange={(e, {value})=>{this.setState( { exp: value })}}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="hours">
                    Hours
                    <Input
                      id="hours"
                      name="hours"
                      iconPosition="left"
                      icon="hourglass full"
                      placeholder="Hours"
                      onChange={(e, {value})=>{this.setState( { time: value })}}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="type">
                    Job type
                    <Input
                      id="type"
                      name="type"
                      iconPosition="left"
                      icon="lab"
                      placeholder="Job type"
                      onChange={(e, {value})=>{this.setState( { job_type: value })}}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="language">
                    Language
                    <Input
                      id="language"
                      name="language"
                      iconPosition="left"
                      icon="world"
                      placeholder="Language"
                      onChange={(e, {value})=>{this.setState( { lang: value })}}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="salary">
                    Salary
                    <Input
                      id="salary"
                      name="salary"
                      iconPosition="left"
                      icon="money"
                      placeholder="Salary"
                      onChange={(e, {value})=>{this.setState( { salary: value })}}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <Form.TextArea label="Overview" placeholder="Overview" onChange={(e, {value})=>{this.setState( { overview: value })}}/>
                </Form.Field>
                <Form.Field>
                  <Form.Dropdown label="Skills" placeholder="Select Skills" fluid multiple search selection options={skills} onChange={(e, {value})=>{this.setState({ skillsArray: value })}}/>
                </Form.Field>
                <Form.Field>
                  <label>
                    Job description
                  </label>
                  <ReactQuill ref={(el) => { this.reactDescriptionRef = el }} style={{height: '130px', marginBottom: '50px'}} value={this.state.textDescription} onChange={this.handleChangeDescription} />
                </Form.Field>
                <Form.Field>
                  <label>
                    Responsobilities
                  </label>
                  <ReactQuill ref={(el) => { this.reactResponsobilitiesRef = el }} style={{height: '130px', marginBottom: '50px'}} value={this.state.textResponsobilities} onChange={this.handleChangeResponsobilities} />
                </Form.Field>
                <Form.Field>
                  <label>
                    Qualifications
                  </label>
                  <ReactQuill ref={(el) => { this.reactQualificationsRef = el }} style={{height: '130px', marginBottom: '50px'}} value={this.state.textQualifications} onChange={this.handleChangeQualifications} />
                </Form.Field>
                <Form.Field>
                  <label>
                    We offer
                  </label>
                  <ReactQuill ref={(el) => { this.reactOfferRef = el }} style={{height: '130px', marginBottom: '50px'}} value={this.state.textOffer} onChange={this.handleChangeOffer} />
                </Form.Field>
                <Button type="submit" primary size="huge">Submit</Button>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8}>
            <Sticky offset={250}>
              <Segment>
                <div className="course">
                  <Grid>
                    <Grid.Column width={11}>
                      <Segment style={{ padding: '40px' }}>
                        <div>
                          <Header style={{ fontSize: '1.7em' }}>
                            {this.state.job_title}
                            <span className="label-status"> <Label basic color="green">New</Label> </span>
                          </Header>
                          <span style={{ fontSize: '1.3em', color: 'gray' }}>
                            Posted by {this.state.company} <Icon name="point" style={{ marginLeft: '10px', marginRight: 0 }} /> {this.state.location} <Icon name="dollar" style={{ marginLeft: '10px', marginRight: 0 }} /> {this.state.salary}
                          </span>
                          <Header>
                             Overview
                          </Header>
                          <span>
                            {this.state.overview}
                          </span>
                          <Header>
                            Skills
                          </Header>
                          <Label.Group size="medium">
                            {this.renderSkills()}
                          </Label.Group>
                          <Menu pointing secondary color="orange">
                            <Menu.Item style={{ fontSize: '1.3em' }} name="desc" active>
                              Job Descriptions
                            </Menu.Item>
                          </Menu>
                          <Container style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                          <div dangerouslySetInnerHTML={{__html: this.state.descriptionHTML}} />
                          </Container>
                          <Menu pointing secondary color="orange">
                            <Menu.Item style={{ fontSize: '1.2em' }} name="resp" active >
                              Responsibilities
                            </Menu.Item>
                          </Menu>
                          <Container style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                            <div dangerouslySetInnerHTML={{__html: this.state.responsobilitiesHTML}} />
                          </Container>
                          <Menu pointing secondary color="orange">
                            <Menu.Item style={{ fontSize: '1.2em' }} name="qual" active>
                              Qualifications
                            </Menu.Item>
                          </Menu>
                          <Container style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                            <div dangerouslySetInnerHTML={{__html: this.state.qualificationsHTML}} />
                          </Container>
                        </div>
                        <Divider hidden />
                        <Button name="jobs" onClick={this.handleButtonClick}> Back to search research </Button>
                        <Button style={{ float: 'right' }}> Priveus </Button>
                        <Button style={{ float: 'right' }}> Next </Button>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Segment style={{ padding: '40px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <Label
                            as="a"
                            href={this.state.link}
                            circular
                            style={{
                              boxShadow: '2px 6px 20px 0 #bcbdbd, 0 1px 21px 1px #d4d4d5', width: '10em', height: '10em', backgroundColor: 'white', backgroundImage: `url(${this.state.icon})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '80%',
                            }}
                          />
                          <Divider hidden />
                          <span style={{ fontSize: '1.5em', marginBottom: '5px' }}> {this.state.company} </span>
                          <br />
                          {this.renderRating(this.state.rating)}
                        </div>
                        <Divider hidden />
                        <div style={{ textAlign: 'left' }}>
                          <span style={{ fontWeight: 600, marginRight: '10px' }}> Location: </span> <span> {this.state.location} </span>
                          <br />
                          <span style={{ fontWeight: 600, marginRight: '10px' }}> Industry: </span> <span> {this.state.industry} </span>
                          <Divider clearing />
                          <span style={{ fontWeight: 600, marginRight: '10px' }}> Job title: </span> <span> {this.state.job_title} </span>
                          <br />
                          <span style={{ fontWeight: 600, marginRight: '10px' }}> Posted: </span> <span> {this.state.posted} </span>
                          <br />
                          <span style={{ fontWeight: 600, marginRight: '10px' }}> Closes: </span> <span> {this.state.closes} </span>
                          <br />
                          <span style={{ fontWeight: 600, marginRight: '10px' }}> Experience level: </span> <span> {this.state.exp} </span>
                          <br />
                          <span style={{ fontWeight: 600, marginRight: '10px' }}> Hours: </span> <span> {this.state.time} </span>
                          <br />
                          <span style={{ fontWeight: 600, marginRight: '10px' }}> Job type: </span> <span> {this.state.job_type} </span>
                          <br />
                          <span style={{ fontWeight: 600, marginRight: '10px' }}> Language: </span> <span> {this.state.lang} </span>
                          <br />
                        </div>
                        <Divider hidden />
                        <div style={{ textAlign: 'center' }}>
                          <Button fluid color="green">APPLY NOW</Button>
                        </div>
                      </Segment>
                    </Grid.Column>
                  </Grid>
                </div>
              </Segment>
            </Sticky>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
