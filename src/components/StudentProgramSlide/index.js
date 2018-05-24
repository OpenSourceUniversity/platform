import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Divider, Segment, Grid, Icon, Image} from 'semantic-ui-react';

export default class ProgramSlide extends React.Component {

  state = {contextRef: ''}
  handleContextRef = contextRef => this.setState({ contextRef })

  render() {

    const { contextRef } = this.state;

    return (

      <Segment>
        <Header>
          Providers
        </Header>
        <Image centered src={this.props.info.issuerIcon[0]} />
        <Divider clearing />
        <span>
        <Grid columns={2}>
        <Grid.Column>
          <Button as='a' color='yellow'>Subscribe</Button>
        </Grid.Column>
        <Grid.Column>
          <Button as='a' color='green'>BUY</Button>
        </Grid.Column>
        </Grid>
        </span>
        <Divider clearing />
        <Header>
          Start dates
        </Header>
        <Icon name='calendar' />
        <span>
          { this.props.info.duration }
        </span>
        <Divider clearing />
        <Header>
          Duration
        </Header>
        <Icon name='clock' />
        <span>
          { this.props.info.durationInHours }
        </span>
        <Divider clearing />
        <Header>
          Program fee
        </Header>
        <Icon name='rub' />
        <span>
          { this.props.info.priceEDU + ' EDU'}

        </span>
        <Divider clearing />
        <Header>
          Tutor
        </Header>
        <Icon name='user outline' />
        <span>
          { this.props.info.tutors[0] }
        </span>
        <Divider clearing />
        <Header>
          Language
        </Header>
        <Icon name='world' />
        <span>
          { this.props.info.language }
        </span>
        <Divider clearing />
        <Header>
          Program code
        </Header>
        <span>
          { this.props.info.code }
        </span>
      </Segment>

    )
  }
}
