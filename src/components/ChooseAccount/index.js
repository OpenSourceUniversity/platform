import React from 'react';
import { Button, List, Header, Divider, Label, Segment, Grid, Menu, Icon } from 'semantic-ui-react';

export default class ChooseAccount extends React.Component {
  render() {
    let academia = require('../../icons/academia_hex.svg');
    let learners = require('../../icons/learners_hex.svg');
    let businesses = require('../../icons/businesses_hex.svg');
    return (
      <div>
        <Header>
          SET YOUR DEFAULT PROFILE
        </Header>
        <Divider clearing />
        <Grid columns={3}>
          <Grid.Column>
            <Segment padded='very' className='padded-top-segment'>
              <img className='hex-icon' src={academia} />
              <Header>
                ACADEMIA
              </Header>
              <span>
                Academia include high schools, universities, MOOC platforms, corporate training and non-formal education providers, independent experts, organizations in the field of education & professional development.
              </span>
              <Divider clearing />
              <span>
                Are you an academic or a training provider?
              </span>
              <Button fluid> SELECT </Button>
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment padded='very' className='padded-top-segment'>
              <img className='hex-icon' src={learners} />
              <Header>
                LEARNERS
              </Header>
              <span>
                Learners include students and employees gaining new knowledge, lifelong learners and curious minds who are seeking challenges and/or new academic or professional paths.
              </span>
              <Divider clearing />
              <span>
                Are you pursuing learning and development opportunities?
              </span>
              <Button fluid primary> SELECT </Button>
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment padded='very' className='padded-top-segment'>
              <img className='hex-icon' src={businesses} />
              <Header>
                BUSINESSES
              </Header>
              <span>
                Businesses include companies of various sizes from startups to enterprises, NGOs, institutions, seeking better and faster candidate sourcing, optimization of costs & results, and improvement of employee recognition.
              </span>
              <Divider clearing />
              <span>
                Are you a company or an organization representative?
              </span>
              <Button fluid> SELECT </Button>
            </Segment>
          </Grid.Column>
        </Grid>

      </div>
    );
  }
}