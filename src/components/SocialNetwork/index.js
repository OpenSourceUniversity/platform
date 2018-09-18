import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Segment, Container, Grid, Card, Image, Button, Icon, Header, Divider, Statistic, List, Message } from 'semantic-ui-react';
import { setActiveAccount } from '../../util/activeAccount';
import addFileWithConnections from '../../util/network/addFileWithConnections';

class SocialNetwork extends React.Component {
  constructor() {
    super();
    this.state = {
      accepted: [],
      rejected: [],
    };
  }

  onDrop(event) {
    event.preventDefault();

    if (this.state.accepted.length > 0 && this.state.rejected.length === 0) {
      const file = this.state.accepted[0];
      this.props.addFileWithConnections(file);
    }
  }

  convertToBuffer = (reader) => {
    const buffer = Buffer.from(reader.result);
    /* eslint-disable */
    this.setState({ buffer });
    /* eslint-enable */
  }

  renderDropzone() {
    return (
      <Dropzone
      accept="application/zip"
      onDrop={
        (accepted, rejected) => {
          this.setState({ accepted, rejected }); this.onDrop(event);
        }
      }
      >
          <i>Drop your ZIP file here</i>
      </Dropzone>);
  }

  renderStatistic() {
    return (
      <Statistic size="mini" color="orange">
        <Button
          basic
          color="green"
          onClick={this.handleImportConnections}
        >
          <Icon name="users" />
          <emp>Invite</emp>
        </Button>
        { !this.state.rejected.length ?
          (
            <Statistic.Value />
          ) :
          (
            <Statistic.Label color="red">Invalid file format!</Statistic.Label>
          )
        }
      </Statistic>
    );
  }

  renderMessages() {
    return (
      <Message
        icon={this.props.isArchiveAdded ? 'paper plane' : 'exclamation'}
        header='Have you heard about our mailing list?'
        content='Get the best news in your e-mail every day.'
      />
    );
  }

  renderRating(ratingNumb) {
    return (
      <div className="ui accurate star widget inline" style={{ marginRight: '10px' }}>
        <div className="highlight" style={{ width: `${(ratingNumb / 5) * 100}%` }} />
      </div>);
  }


  render() {
    /* eslint-disable */
    const profile = require('../../icons/account_profile.svg');
    const avatarPlaceholder = require('../../icons/avatar_placeholder.svg');
    const settings = require('../../icons/account_deposit.svg');
    const introduction = 'You can upgrade your profile and get numerus opportunities for professional career. \
                          Boost your skills and professional experience by uploading your LinkedIn data (->Video Tutorial). \
                          Each time someone in your network join the platform YOU will get EDU tokens except Free PRO account containing all the functionality you need.';
    /* eslint-enable */

    return (
      <Container>

        <Header size="huge">
          <svg width="32" height="32" className="icon">
            <image href={settings} x="0" y="0" width="100%" height="100%" />
          </svg>
          Connect your LinkedIn profile
        </Header>
        <Divider />
        <Grid divided="vertically">
          <Grid.Row>

            <Grid.Column mobile={16} tablet={8} computer={12}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>
                Reviel your true potential
                  </Card.Header>
                  <Divider hidden />
                  <Card.Meta>
                    {introduction}
                  </Card.Meta>
                  <Divider hidden />
                  <Card.Description>
                    <List as="ol">
                      <List.Item as="li">Visit the LinkedIn Download Your Data page</List.Item>
                      <Divider hidden />
                      <List.Item as="li">Select the following files from &quot;Pick and Choose&quot;:</List.Item>
                      <Divider hidden />
                      <List.Item as="li">Click &quot;Request Download&quot; button. Wait for the downloaded file to appear in your email.</List.Item>
                      <Divider hidden />
                      <List.Item as="li">Locate your ZIP file in the lower left of your screen (or your Download folder). Drag your ZIP file into our form and click the orange button.</List.Item>
                    </List>
                    <Divider hidden />
                    <b>Thank you for your time and support!</b><br />
                    <i>
                      Your account will be promoted to PRO version for /.../
                      period and you ll receive .. EDU for every new member onboarded
                      on the platform from your uploaded LinkedIn contacts.
                    </i>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Image centered size="tiny" src={avatarPlaceholder} />
                  <Card.Meta>
                    &quot;This is the best platform for skill verification and
                    job opportunities I&apos;ve ever met :)&quot;
                  </Card.Meta>
                  <Divider hidden />
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column tablet={16} computer={4}>
              <Segment>
                {this.props.isArchiveAdding ?
                  this.renderDropzone() : this.renderMessages()
                }
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    activeAccount: state.activeAccount.activeAccount,
    isArchiveAdded: state.connections.isArchiveAdded,
    isArchiveAdding: state.connections.isArchiveAdding,
    errorArchive: state.connections.errorArchive,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveAccount(activeAccount) {
      dispatch(setActiveAccount(activeAccount));
    },
    addFileWithConnections(connectionsDataFile) {
      dispatch(addFileWithConnections(connectionsDataFile));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SocialNetwork));
