import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Segment, Container, Grid, Icon, Header, Divider, List, Message, Button, Breadcrumb } from 'semantic-ui-react';
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
          <Container
            textAlign="center"
            style={{ border: '2px dashed grey', height: '100%', borderRadius: '5px' }}
          >
            <div style={{ padding: '37px 15px 15px 15px', textAlign: 'center' }}>
              <Icon name="upload" />
              {this.state.fileString ? this.state.fileString : 'LinkedIn contacts archive Dropzone'}
            </div>
          </Container>
        </Dropzone>
        <div style={{ textAlign: 'center' }} >
          <Button
            fluid
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
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>LinkedIn Connections</Breadcrumb.Section>
        </Breadcrumb>
        <Divider hidden />
        <Header size="large">
          <svg width="32" height="32" className="icon">
            <image href={settings} x="0" y="0" width="100%" height="100%" />
          </svg>
          Connect to your LinkedIn network
        </Header>
        <Divider />
        <Grid divided="vertically">
          <Grid.Row>
            <Grid.Column mobile={16} tablet={10} computer={10}>
              <Segment padded="very">
                <Header>
                  <h2>Import your contacts for a free upgrade</h2>
                </Header>
                <Container>
                  <p>
                  You can upgrade your profile and get numerus opportunities for professional career. Boost your skills and professional experience by uploading your LinkedIn data (<a className="text-primary" href="https://www.youtube.com/watch?v=PaWZvD2MvkA" rel="noopener noreferrer" target="_blank">Video Tutorial</a>) Each time someone in your network join the platform YOU will get EDU tokens along with PRO account containing all the functionality you need.
                  </p>
                  <Divider hidden />
                  <List as="ol">
                    <List.Item as="li">Visit the <a href="https://www.linkedin.com/psettings/member-data" className="text-primary" rel="noopener noreferrer" target="_blank"><b>LinkedIn Download Your Data</b></a> page</List.Item>
                    <List.Item as="li">Select the following files from &quot;<b>Pick and Choose</b>&quot;:</List.Item>
                    <List.Item as="li">Click &quot;<b>Request archive</b>&quot; button. Wait for the downloaded file to appear in your email.</List.Item>
                    <List.Item as="li">Locate your <b>ZIP file</b> in the lower left of your screen (or your Download folder). Drag your <b>ZIP file</b> into our form and click the orange &quot;Upload&quot; button.</List.Item>
                  </List>
                </Container>
                <Divider hidden />
                <Message positive>
                  <Message.Header>Thank you for your time and support!</Message.Header>
                  <p>
                    Your account will be promoted to PRO version for <b>{ period } period </b>
                    and you ll receive <b>{ eduBonus }</b>. EDU for every new member onboarded
                    on the platform from your uploaded LinkedIn contacts.
                  </p>
                </Message>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={6} computer={6}>
              <Segment padded="very" style={{ textAlign: 'center' }} >
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
