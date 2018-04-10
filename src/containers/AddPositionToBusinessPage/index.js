import React from 'react';
import { Container, Header, Grid, Button, Message, Divider, Breadcrumb, Form, Input } from 'semantic-ui-react';
import { addPosition } from './actions';


export default class AddPositionToBusinessPage extends React.Component {
  constructor(props) {
    super(props);
    /* eslint-disable */
    this.state = {
      positionName: '',
      skillsRequired: '',
      description: '',
      salary: '',
    };
    /* eslint-enable */
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = { event };
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = { target };

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    addPosition(this.state);
  }

  render() {
    return (
      <Container fluid>
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section href="/#/business">Business</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Add Position</Breadcrumb.Section>
        </Breadcrumb>

        <Divider clearing />
        <Header size="large" floated="left">
          Add Position
        </Header>
        <Divider clearing />

        <Grid>
          <Grid.Column width={10}>
            <Form size="huge" onSubmit={this.handleSubmit}>
              <Form.Field>
                <label htmlFor="positionName">
                  Position name
                  <Input
                    id="positionName"
                    name="positionName"
                    iconPosition="left"
                    icon="tag"
                    placeholder="Position name"
                    onChange={this.handleInputChange}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="skillsRequired">
                  Required Skills
                  <Input
                    id="skillsRequired"
                    name="skillsRequired"
                    iconPosition="left"
                    icon="filter"
                    placeholder="Required Skills"
                    onChange={this.handleInputChange}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="description">
                  Description
                  <Input
                    id="description"
                    name="description"
                    iconPosition="left"
                    icon="info"
                    placeholder="Description"
                    onChange={this.handleInputChange}
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
                    onChange={this.handleInputChange}
                  />
                </label>
              </Form.Field>
              <Button type="submit" size="huge">Submit</Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={6}>
            <Message positive>
              <Message.Header>
                  Adding Position
              </Message.Header>
            </Message>
          </Grid.Column>
        </Grid>

      </Container>
    );
  }
}
