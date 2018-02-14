import React from 'react';
import { Container, Header, Breadcrumb, Divider, Grid, Segment, Form, Input, Sticky, Button, Icon, Item, Label } from 'semantic-ui-react';
import JobsItem from 'components/JobsItem';

export default class JobsPage extends React.Component {
  renderJobs() {
    const jobs = [
      { title: 'React Engineer', firm: 'OS.UNI', location: 'Sofia', description: 'notes - Remote, Paid relocation, ...', salary: '€70k - 90k', labels: ['react', 'python']},
      { title: 'Senior Front-End Developer - React', firm: 'ARE OI', location: '', description: 'notes - Remote, Paid relocation, ...', salary: '€70k - 90k', labels: ['react']},
      { title: 'FullStack Developer (Must be EU based)', firm: 'ING', location: 'Barcelona, Spain', description: 'notes - Remote, Paid relocation, ...', salary: '$70k - 90k', labels: ['react']},
      { title: 'Frontend Developer', firm: '', location: 'Sofia, Bulgaria', description: 'notes - Remote, Paid relocation, ...', salary: '€40k - 65k', labels: ['react']},
      { title: 'Frontend Chapter Lead wanted for leading e-hailing app in Europe', firm: 'ING', location: '', description: 'notes - Remote, Paid relocation, ...', salary: '$50k - 80k', labels: ['react']},
      { title: 'Senior Backend Developer - ruby/rails', firm: 'ING', location: 'Hamburg, Germany', description: 'notes - Remote, Paid relocation, ...', salary: 'Equity', labels: ['react']},
      { title: 'Backend Ruby Developer', firm: 'ING', location: 'No office location', description: 'notes - Remote, Paid relocation, ...', salary: 'Equity', labels: ['react']},
    ];
    return jobs.map((jobs, index) => (
      <JobsItem jobs={jobs} key={index} />
    ));
  }

  render() {
    return (
      <Container>

      <Breadcrumb>
        <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right angle" />
        <Breadcrumb.Section active>Jobs</Breadcrumb.Section>
      </Breadcrumb>

      <Divider clearing />

      <Header size="large" floated="left">
        Jobs
      </Header>

      <Divider clearing />

      <Grid reversed="mobile">
        <Grid.Column width={12}>
          <Item.Group divided>
            {this.renderJobs()}
          </Item.Group>
        </Grid.Column>

        <Grid.Column width={4}>
          <Sticky>
            <Segment>
              <Header>
                Filter
              </Header>
              <Form>
                <Form.Field>
                  <label htmlFor="location">
                    Location
                    <Input id="location" placeholder="Location" />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="categories">
                    Categories
                    <Input id="categories" placeholder="Categories" />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="keywords">
                    Keywords
                    <Input id="keywords" placeholder="Keywords" />
                  </label>
                </Form.Field>
                <Button type="submit">Filter</Button>
              </Form>
            </Segment>
          </Sticky>
        </Grid.Column>
      </Grid>

      </Container>
    );
  }
}
