import React from 'react';
import { Dimmer, Header, Container, Image, Loader, Form, Segment, Menu, Grid, Label, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Message from '../../components/Message';
import fetchThreads from '../../util/messaging/fetchThreads';
import fetchMessages from '../../util/messaging/fetchMessages';
import sendMessage from '../../util/messaging/sendMessage';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import { encrypt, decrypt } from '../../util/privacy';
import { resetMessages, resetActiveThread } from './actions';


class MessagesPage extends React.Component {
  state = { activeThread: null, privateKey: null, publicKey: null }

  componentDidMount() {
    this.props.fetchThreads();
    let activeThreadId = null;
    const { id } = this.props.match.params;
    if (id) {
      activeThreadId = this.props.match.params.id;
      this.props.fetchMessages(activeThreadId, null);
      this.setKeys(activeThreadId);
    } else if (this.props.threads.length) {
      activeThreadId = this.props.threads[0].id;
      this.setKeys(activeThreadId);
      const newPath = `/messaging/${activeThreadId}/`;
      this.props.history.push(newPath);
      this.props.fetchMessages(activeThreadId, null);
    }
    this.state.activeThread = activeThreadId;
    this.props.setSecondaryNav(null);
    document.title = 'Messaging';
  }

  componentDidUpdate(prevProps) {
    if (prevProps.nextUrl === this.props.nextUrl || !prevProps.nextUrl) {
      const objDiv = document.getElementById('MessageHistory');
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    if (!this.props.match.params.id && this.props.threads.length) {
      const activeThreadId = this.props.threads[0].id;
      const newPath = `/messaging/${activeThreadId}/`;
      this.props.history.push(newPath);
      this.props.fetchMessages(activeThreadId, null);
      this.state.activeThread = activeThreadId;
      this.setKeys(activeThreadId);
    }
  }

  componentWillUnmount() {
    this.props.resetMessages();
    this.props.resetActiveThread();
  }

  onEnterPress = (event) => {
    if (event.keyCode === 13 && event.shiftKey === false && event.ctrlKey === false) {
      event.preventDefault();
      const text = event.target.value;
      const buffer = Buffer.from(text);
      const encryptedBuffer = encrypt(this.state.publicKey, buffer);
      const ecryptedString = encryptedBuffer.toString('base64');
      if (text && this.state.activeThread) {
        const messageData = {
          threadID: this.state.activeThread,
          text: ecryptedString,
        };
        this.props.sendMessage(messageData);
        /* eslint-disable no-param-reassign */
        event.target.value = '';
        const objDiv = document.getElementById('MessageHistory');
        objDiv.scrollTop = objDiv.scrollHeight;
        /* eslint-enable no-param-reassign */
      }
    }
  }

  setKeys(activeThreadId) {
    /* eslint-disable global-require */
    const hdkey = require('ethereumjs-wallet/hdkey');
    const bip39 = require('bip39');
    const mnemonic = bip39.entropyToMnemonic(activeThreadId.replace(/[^a-zA-Z0-9 ]/g, ''));
    const seed = bip39.mnemonicToSeed(mnemonic);
    const hdKeyInstance = hdkey.fromMasterSeed(seed);
    const walletInstance = hdKeyInstance.getWallet();
    this.state.privateKey = walletInstance.getPrivateKey();
    this.state.publicKey = walletInstance.getPublicKey();
  }

  getOpponentInfo(opponentInstance) {
    switch (opponentInstance.active_profile_type) {
    case 1:
      return {
        name: opponentInstance.full_name,
        avatar: opponentInstance.learner_avatar,
        additional: opponentInstance.learner_position,
        viewProfile: `/view-profile/learner/${opponentInstance.user.username}/`,
        username: opponentInstance.user.username,
      };
    case 2:
      return {
        name: opponentInstance.academy_name,
        avatar: opponentInstance.academy_logo,
        additional: opponentInstance.academy_website,
        viewProfile: `/view-profile/academy/${opponentInstance.user.username}/`,
        username: opponentInstance.user.username,
      };
    case 3:
      return {
        name: opponentInstance.company_name,
        avatar: opponentInstance.company_logo,
        additional: opponentInstance.company_website,
        viewProfile: `/view-profile/business/${opponentInstance.user.username}/`,
        username: opponentInstance.user.username,
      };
    default:
      return null;
    }
  }

  getOpponent() {
    let opponentInstance = null;
    if (this.props.threadsById[this.state.activeThread]) {
      const activeThreadObj = this.props.threadsById[this.state.activeThread];
      if (activeThreadObj.owner_profile.user.username === this.props.address.toLowerCase()) {
        opponentInstance = activeThreadObj.opponent_profile;
      } else {
        opponentInstance = activeThreadObj.owner_profile;
      }
      return this.getOpponentInfo(opponentInstance);
    }
    return null;
  }

  toAgoDate(pythonDateStr) {
    const jsDateStr = `${pythonDateStr.substr(0, 10)} ${pythonDateStr.substr(11, 8)}`;
    const jsDateTime = Date.parse(jsDateStr);
    const nowDateTime = Date.now();
    const timeZoneOffset = new Date(nowDateTime).getTimezoneOffset() * 60000;
    const durationms = nowDateTime - jsDateTime;
    const duration = new Date(durationms + timeZoneOffset);
    let durationStr = 'now';
    if (duration.getUTCFullYear() > 1970) {
      durationStr = `${duration.getUTCFullYear() - 1970} year(s) ago`;
    } else if (duration.getUTCMonth() > 0) {
      durationStr = `${duration.getUTCMonth()} month(s) ago`;
    } else if (duration.getUTCDate() > 1) {
      durationStr = `${duration.getUTCDate() - 1} day(s) ago`;
    } else if (duration.getUTCHours() > 0) {
      durationStr = `${duration.getUTCHours()} hour(s) ago`;
    } else if (duration.getUTCMinutes() > 0) {
      durationStr = `${duration.getUTCMinutes()} minute(s) ago`;
    }
    return durationStr;
  }

  avatarPlaceholder = 'data:image/jpeg;base64,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';

  messagesScroll = (event) => {
    const { scrollTop } = event.currentTarget;
    const shouldScroll = scrollTop === 0;
    if (shouldScroll && this.props.nextUrl && !this.props.isFetchingMessages) {
      this.props.fetchMessages(this.state.activeThread, this.props.nextUrl);
    }
  }

  showThread(activeThreadID) {
    this.setState({ activeThread: activeThreadID });
    this.props.history.push(`/messaging/${activeThreadID}/`);
    this.props.resetMessages();
    this.props.fetchMessages(activeThreadID, null);
  }

  sendMessage = (event) => {
    const text = event.target.elements.message.value;
    const buffer = Buffer.from(text);
    const encryptedBuffer = encrypt(this.state.publicKey, buffer);
    const ecryptedString = encryptedBuffer.toString('base64');
    if (text && this.state.activeThread) {
      const messageData = {
        threadID: this.state.activeThread,
        text: ecryptedString,
      };
      this.props.sendMessage(messageData);
      /* eslint-disable no-param-reassign */
      event.target.elements.message.value = '';
      const objDiv = document.getElementById('MessageHistory');
      objDiv.scrollTop = objDiv.scrollHeight;
      /* eslint-enable no-param-reassign */
    }
  }

  renderUserInfo() {
    if (!this.state.activeThread) {
      return null;
    }
    const thread = this.props.threadsById[this.state.activeThread];
    if (!thread) {
      return null;
    }
    const ownerUsername = thread.owner_profile.user.username;
    const isOwner = ownerUsername === this.props.address.toLowerCase();
    let opponentProfile = null;
    if (isOwner) {
      opponentProfile = this.getOpponentInfo(thread.opponent_profile);
    } else {
      opponentProfile = this.getOpponentInfo(thread.owner_profile);
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Header>
          User Info
        </Header>
        <Segment
          textAlign="center"
          circular
          className="profilePicSegment"
          as={Link}
          to={opponentProfile.viewProfile}
          style={{
            width: 175,
            height: 175,
            backgroundImage: `url(${opponentProfile.avatar ?
              `https://ipfs.io/ipfs/${opponentProfile.avatar}` :
              this.avatarPlaceholder})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
          }}
        />
        <Header size="large">
          {opponentProfile.name}
        </Header>
        <Header size="small" color="grey" style={{ marginTop: '0.5em' }}>
          {opponentProfile.additional ? opponentProfile.additional : null}
        </Header>
        <Divider clearing />
      </div>
    );
  }

  renderMessages() {
    if (this.props.match.params.id) {
      this.setKeys(this.props.match.params.id);
    }
    const { messages } = this.props;
    const opponent = this.getOpponent();
    const address = this.props.address.toLowerCase();
    return messages.map((message, index, array) => (
      <Message
        key={index}
        message={message}
        opponent={message.sender.username === address ? null : opponent}
        prev={array[index - 1]}
        next={array[index + 1]}
        ownerAddress={this.props.address}
        toAgoDate={this.toAgoDate}
        decryptionKey={this.state.privateKey}
      />

    ));
  }

  renderThreads() {
    const { threads } = this.props;
    return threads.map((thread, index) => (
      <Menu.Item
        key={index}
        active={this.state.activeThread === thread.id}
        onClick={() => this.showThread(thread.id)}
      >
        <Label
          style={{ display: this.props.threadsById[thread.id].unread_count === 0 ? 'none' : 'block' }}
          color="red"
          size="mini"
        >
          { this.props.threadsById[thread.id].unread_count }
        </Label>
        <Grid>
          <Grid.Column width={3}>
            <Image
              avatar
              src={(() => {
                const ownerUsername = thread.owner_profile.user.username;
                const isOwner = ownerUsername === this.props.address.toLowerCase();
                if (isOwner) {
                  return this.getOpponentInfo(thread.opponent_profile).avatar ?
                    `https://ipfs.io/ipfs/${this.getOpponentInfo(thread.opponent_profile).avatar}` :
                    this.avatarPlaceholder;
                }
                return this.getOpponentInfo(thread.owner_profile).avatar ?
                  `https://ipfs.io/ipfs/${this.getOpponentInfo(thread.owner_profile).avatar}` :
                  this.avatarPlaceholder;
              })()
              }
              style={{ height: 'auto', width: '100%' }}
            />
          </Grid.Column>
          <Grid.Column width={13} >
            <Header as="h4" style={{ marginBottom: 0 }} >
              { thread.owner_profile.user.username === this.props.address.toLowerCase() ?
                this.getOpponentInfo(thread.opponent_profile).name :
                this.getOpponentInfo(thread.owner_profile).name
              }
            </Header>
            <p style={{ color: 'rgb(175, 175, 175)', marginTop: '0.5em', marginBottom: '0.5em' }}>{
              (() => {
                if (this.props.threadsById[thread.id].last_message.text) {
                  const pk = thread.id;
                  const hdkey = require('ethereumjs-wallet/hdkey');
                  const bip39 = require('bip39');
                  const mnemonic = bip39.entropyToMnemonic(pk.replace(/[^a-zA-Z0-9 ]/g, ''));
                  const seed = bip39.mnemonicToSeed(mnemonic);
                  const hdKeyInstance = hdkey.fromMasterSeed(seed);
                  const walletInstance = hdKeyInstance.getWallet();
                  const decryptionKey = walletInstance.getPrivateKey();
                  const encryptedText = this.props.threadsById[thread.id].last_message.text;
                  const encryptedBuffer = Buffer.from(encryptedText, 'base64');
                  const decryptedBuffer = decrypt(decryptionKey, encryptedBuffer);
                  return decryptedBuffer.toString('utf8').slice(0, 30);
                }
                return null;
              })()}
            </p>
            <small style={{ color: 'rgb(175, 175, 175)' }}>{
              this.props.threadsById[thread.id].last_message.created ?
                this.toAgoDate(this.props.threadsById[thread.id].last_message.created)
                :
                null}
            </small>
          </Grid.Column>
        </Grid>
      </Menu.Item>
    ));
  }

  render() {
    /* eslint-disable global-require */
    const loader = require('../../icons/osu-loader.svg');
    /* eslint-enable global-require */
    return (
      <Container fluid style={{ marginTop: '-1px' }}>
        <Segment>
          <Grid>
            <Grid.Column
              width={4}
              style={{
                paddingLeft: 0, paddingTop: 0, paddingBottom: 0, height: '78vh',
              }}
            >
              <Menu className="messagingThreads" style={{ height: '100%' }} fluid vertical secondary pointing>
                <Dimmer active={this.props.isFetchingThreads} inverted>
                  <Loader size="medium">
                    <p>Fetching your threads</p>
                    <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                      <image href={loader} x="0" y="0" width="100%" height="100%" />
                    </svg>
                  </Loader>
                </Dimmer>
                {this.renderThreads()}
                {this.props.threads.length ? null : <span>You haven&#39;t any open thread</span>}
              </Menu>
            </Grid.Column>
            <Grid.Column width={9} style={{ paddingTop: 0, paddingBottom: 0 }} >
              <div style={{ display: this.props.match.params.id ? null : 'none' }}>
                <div
                  id="MessageHistory"
                  style={{ height: '78vh', overflowY: 'scroll', padding: '2% 5% 5% 5%' }}
                  onScroll={this.messagesScroll}
                >
                  <Dimmer active={this.props.isFetchingMessages} inverted>
                    <Loader size="medium">
                      <p>Fetching your messages</p>
                      <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                        <image href={loader} x="0" y="0" width="100%" height="100%" />
                      </svg>
                    </Loader>
                  </Dimmer>
                  {this.renderMessages()}
                </div>
                <Form onSubmit={this.sendMessage} >
                  <Form.Group inline>
                    <Form.TextArea
                      className="messageInput"
                      rows={2}
                      style={{ resize: 'none' }}
                      ref={(arg) => { this.inputRef = arg; }}
                      onKeyDown={this.onEnterPress}
                      autoComplete="off"
                      type="text"
                      name="message"
                      placeholder="Type your message here..."
                    />
                    <Form.Button color="orange" className="sendButton" content="Send" type="submit" />
                  </Form.Group>
                </Form>
              </div>
            </Grid.Column>
            <Grid.Column width={3} style={{ paddingBottom: 0 }} >
              {this.renderUserInfo()}
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    messages: state.messaging.messages,
    threads: state.messaging.threads,
    threadsById: state.messaging.threadsById,
    activeThread: state.messaging.activeThread,
    unreadThreadMessagesCount: state.messaging.unreadThreadMessagesCount,
    isFetchingThreads: state.messaging.isFetchingThreads,
    isFetchingMessages: state.messaging.isFetchingMessages,
    nextUrl: state.messaging.nextUrl,
    address: state.auth.address,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchThreads(url) {
      dispatch(fetchThreads(url));
    },
    fetchMessages(threadId, url) {
      dispatch(fetchMessages(threadId, url));
    },
    sendMessage(messageData) {
      dispatch(sendMessage(messageData));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    resetMessages() {
      dispatch(resetMessages());
    },
    resetActiveThread() {
      dispatch(resetActiveThread());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessagesPage));
