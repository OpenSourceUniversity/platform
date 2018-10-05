import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Segment, Container, Grid, Card, Icon, Header, Divider, List, Message, Button } from 'semantic-ui-react';
import { setActiveAccount } from '../../util/activeAccount';
import addFileWithConnections from '../../util/network/addFileWithConnections';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';


class SocialNetworkPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: [],
    };
  }
  componentDidMount() {
    this.props.setSecondaryNav('account');
    document.title = 'Social network';
    this.state = {
      accepted: [],
      rejected: [],
      fileName: null,
    };
  }

  convertToBuffer = (reader) => {
    const buffer = Buffer.from(reader.result);
    /* eslint-disable */
    this.setState({ buffer });
    /* eslint-enable */
  }

  renderDropzone() {
    return (
      <div>
        <Dropzone
          style={{ align: 'center', height: '100px', marginBottom: '1em' }}
          accept="application/zip, application/x-zip-compressed"
          onDrop={
            (accepted, rejected) => {
              this.setState({ accepted, rejected });
              if (accepted.length > 0 && rejected.length === 0) {
                this.setState({ fileString: accepted[0].name });
              }
              if (rejected.length > 0 && accepted.length === 0) {
                this.setState({ fileString: 'Wrong file format. Accept only ZIP archives' });
              }
            }
          }
        >
          <Grid
            textAlign="center"
            style={{ border: '2px solid orange', height: '100%', borderRadius: '5px' }}
          >
            <div style={{ paddingTop: '37px', textAlign: 'center' }}>
              <Icon name="upload" />
              {this.state.fileString ? this.state.fileString : 'LinkedIn contacts archive Dropzone'}
            </div>
          </Grid>
        </Dropzone>
        <div style={{ textAlign: 'center' }} >
          <Button
            content="Upload"
            primary
            disabled={!(this.state.accepted.length > 0 && this.state.rejected.length === 0)}
            icon="upload"
            onClick={() => {
              if (this.state.accepted.length > 0 && this.state.rejected.length === 0) {
                const file = this.state.accepted[0];
                this.props.addFileWithConnections(file);
                this.setState({ accepted: [], rejected: [], fileString: null });
              }
            }}
          />
        </div>
      </div>);
  }

  renderMessages() {
    let result;
    if (this.props.isArchiveAdded) {
      result = (<Message compact positive ><Icon name="thumbs up" />Successful upload!</Message>);
    } else {
      result = (<Message compact negative ><Icon name="exclamation" />Error during the upload!</Message>);
    }
    return result;
  }


  render() {
    /* eslint-disable */
    const profile = require('../../icons/account_profile.svg');
    const settings = require('../../icons/account_deposit.svg');
    const introduction = 'You can upgrade your profile and get numerus opportunities for professional career. \
                          Boost your skills and professional experience by uploading your LinkedIn data (->Video Tutorial). \
                          Each time someone in your network join the platform YOU will get EDU tokens except Free PRO account containing all the functionality you need.';
    const period = ' ...... '
    const eduBonus = ' ..... '
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

            <Grid.Column mobile={16} tablet={12} computer={12}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>
                    <h3>Reviel your true potential</h3>
                  </Card.Header>
                  <Divider hidden />
                  <Card.Meta>
                    You can upgrade your profile and get numerus opportunities for
                    professional career. Boost your skills and professional
                    experience by uploading your LinkedIn data &#40;
                    <a href="https://www.youtube.com/watch?v=PaWZvD2MvkA">
                    Video Tutorial
                    </a> &#41;. Each time someone in your network
                    join the platform YOU will get EDU tokens along with PRO
                    account containing all the functionality you need.
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
                    <b>Thank you for your time and support&#33;</b><br />
                    <i>
                      Your account will be promoted to PRO version for { period }
                      period and you ll receive { eduBonus }. EDU for every new member onboarded
                      on the platform from your uploaded LinkedIn contacts.
                    </i>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column mobile={16} tablet={4} computer={4}>
              <Segment style={{ textAlign: 'center' }} >
                { this.props.isArchiveAdded ? this.renderMessages() : this.renderDropzone() }
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
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SocialNetworkPage);
