import React from 'react';
import { Form, Button, Radio, Checkbox, Container, Header, Divider, Grid, Sticky, Segment, Icon, List } from 'semantic-ui-react';

export default class AccountSettings extends React.Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
      <div>
        <Container fluid>
          <Header size="huge">
            <Icon name="cogs" />
            Account Settings
          </Header>

          <Divider clearing />

          <Grid reversed="mobile">
            <Grid.Column width={12}>
              <Sticky>
                <Segment>
                  <Form>
                    <Form.Group widths="equal">
                      <Form.Field label="First name" control="input" placeholder="First name" />
                      <Form.Field label="Last name" control="input" placeholder="Last name" />
                    </Form.Group>
                    <Checkbox label="Make my profile paid" toggle defaultChecked />
                    <Divider hidden />
                    <Button type="submit">Save Changes</Button>
                  </Form>
                </Segment>
              </Sticky>
            </Grid.Column>
            <Grid.Column width={4}>
              <Sticky>
                <Segment>
                  <Form>
                    <Form.Field>
                      <Header>
                        Default Account Profile: {this.state.value}
                      </Header>
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label="Learner"
                        name="radioGroup"
                        value="Learner"
                        checked={this.state.value === 'Learner'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label="Business"
                        name="radioGroup"
                        value="Business"
                        checked={this.state.value === 'Business'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label="Academia"
                        name="radioGroup"
                        value="Academia"
                        checked={this.state.value === 'Academia'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                  </Form>
                </Segment>
              </Sticky>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
