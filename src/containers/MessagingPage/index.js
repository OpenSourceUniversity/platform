import React from 'react';
import { Dimmer, Header, Container, Image, Loader, Form, Segment, Menu, Grid, Button, Icon, Label, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Message from '../../components/Message';
import fetchThreads from '../../util/messaging/fetchThreads';
import fetchMessages from '../../util/messaging/fetchMessages';
import sendMessage from '../../util/messaging/sendMessage';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import resetMessages from './actions';


class MessagesPage extends React.Component {
  state = { activeThread: null }

  componentDidMount() {
    if (this.props.match.params.id) {
      const activeThreadId = this.props.match.params.id;
      this.state.activeThread = activeThreadId;
      this.props.fetchMessages(this.props.match.params.id, null);
    }
    this.props.fetchThreads();
    this.props.setSecondaryNav(null);
    document.title = 'Messaging';
  }

  componentDidUpdate(prevProps) {
    if (prevProps.nextUrl === this.props.nextUrl || !prevProps.nextUrl) {
      const objDiv = document.getElementById('MessageHistory');
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  getOpponentInfo(opponentInstance) {
    switch (opponentInstance.active_profile_type) {
    case 1:
      return {
        name: `${opponentInstance.first_name} ${opponentInstance.last_name}`,
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

  avatarPlaceholder = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDxUQDw8VFRUVFRUVFRUVFRUVFRUVFRUWFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKysrKystLSsrKysrKysrKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAQEAAQICCAMIAAcAAAAAAAABAgMRBCEFEjFBUWFxgZGx4SIyM0KhwdHwExUjcoKS8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAFQAAAAAAAAAAAAAAAAAAAAQAQEASiAom/kgPYAAAAAAAAAAAAAAAAAAAAEAQQAEAQQAQB7gAAAAAAAA8+I18dPHfL2nffQHpbt2tHX6Twx5Y/avwnxc7iuLy1Lz5Tund7+LXBuanSWreyyek/l4XidS/ny+NeQD1nEak/Pl/2r20+kdWfm39Y1AHX0OlMbyzm3nOcb+OUs3l3njHzL24fiMtO7431ndQfQjw4XisdSbzt754fR7AJSgICAIIAi1iCoig2AAAAAAAAY6upMcbleyOBxOvdTLrX2nhG10txG+XUnZO31c8ABQAAAAABlpatwymWN5x3uG15qYzKe88K+ebXR3EdTPbuy5X9qg7iCAUGNARUoCDHcBU38wG0AAAAAAx1M+rjcr3S34Mmr0pltpXz2n6g4eWVttvbeaAoAAAAAAIAIAD6DhNXr6eOXlz9Zyr1aHQ+X2LPC/ON5AtQSgJRNwEqVLQUTcBuAAAAAANLpj8Of7p8q3Wp0pjvpXysv6/UHDAUAAAAEABAAQAdPobsz/4/u6LQ6Hn2LfG/KfVvoG7Fd0oJUN0ArEqAox3Ab4AAAAADHVw62Nx8ZYyAfM2bXa9yN/pbQ6uXXnZl8/7+7QAAUEVAEABFQBBs9H6HXzm/ZOd/aA6vB6fV08Z5b31vN7UqVArFaxAqUSgWsaJaCjHdQdAAAAAAAAGGtpTPG43sv93cDiNG4ZdXL/2eL6J5cTw+Opjtfa98B86PbieGy079qcu691eCgCAAgCKz0dHLO7Yz+J6gx08LldpOddzhdCaeO07e++NThOFmnPG3tv7Tye1QEpUAS0Y2gWpuVNwGNq2sQN7/AHYTcB0wAAAAAAAAaev0jp48petfL+QbWWMs2s3nhWhr9F43nhdvLtn0a+fSue/LGSe9bGj0phfvS4/rAaOpwGrj+Xf05/V4ZaWU7cb8K+g09bDL7uUvpWYPm5pZd2N+FeunwWrl+Wz15fN3q89TVxx7cpPW7A0NHouTnnlv5Ts+LfwwmM2xm0amt0lpzs3yvlynxrU/zTPffqzbw5/MHXYtPS6Swy5X7N8+c+Lbll5ygVKWpQKxpUASlrECpS1KCbi+4DqAAAAAAPDiuLx05z53unf9Hnx/GTTm055Xs8vOuJnlbd7d7Qe3E8Xnqdt2nhOz6tcFEABGUzynZb8axQGWWple3K/GsFQBBAHpocRlhfs327r7PIB2uF43HPl2ZeH8NivnN3U4Hjet9nK/a7r4/VBvVjVY0CsaVKBuxq1iC7IbIDsAAAAPLiteaeNyvtPGvVxOlNfrZ9WdmPL37/4Bq6mdyttvOsAUEABAAQQBAoIgAIVAEl7xKDtcHxH+Jj5zlf5e+7h8HrdTOXuvK+jt2oJU3KxA3RUoG9/tE2UHYAAAB58Tq9TC5eE/XufOWux0xnthJ435f2OMAgKCAAhQERUASlQBDdAKgUEqCAOzwWr1tOeXK+zi1v8ARWf3sfS/39EHRtQqAIbgG1VjuoOyAACA5XTV54zyv67fw5rodNfex9L83OARUUEABBAEpUARalAYrUBAqAJSsQG10Zf9T2v7VqVtdG/ie1QddjVqUBDcA9/1E9wHbBAEAHJ6Z+9j6fu5zodM/ex9P3c4AEUEEoCKxABALUogCCAIICU3KgDZ6N/E9q1Wz0b+J7VB10VAEVAXYXqgOygAiADk9Nfex9L83OABAUY0oAlKgBUAGNABjQAYpQBKgAlbfRv4k9KAOrCfyCCLf7+igAAP/9k=';

  showThread(activeThreadID) {
    this.setState({ activeThread: activeThreadID });
    this.props.history.push(`/messaging/${activeThreadID}/`);
    this.props.resetMessages();
    this.props.fetchMessages(activeThreadID, null);
  }

  sendMessage = (event) => {
    const text = event.target.elements.message.value;
    if (text) {
      const messageData = {
        threadID: this.state.activeThread,
        text,
      };
      this.props.sendMessage(messageData);
      /* eslint-disable no-param-reassign */
      event.target.elements.message.value = '';
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
        <Header size="small" color="grey">
          {opponentProfile.additional ? opponentProfile.additional : '-'}
        </Header>
        <Divider clearing />
      </div>
    );
  }

  renderMessages() {
    const { messages } = this.props;
    const opponent = this.getOpponent();
    return messages.map((message, index, array) => (
      <Message
        key={index}
        message={message}
        opponent={message.sender.username === this.props.address.toLowerCase() ? null : opponent}
        prev={array[index - 1]}
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
          <Grid.Column width={13} style={{ paddingTop: '6%' }} >
            <Header as="h4" style={{ marginBottom: 0 }} >
              { thread.owner_profile.user.username === this.props.address.toLowerCase() ?
                this.getOpponentInfo(thread.opponent_profile).name :
                this.getOpponentInfo(thread.owner_profile).name
              }
            </Header>
            <p style={{ color: 'rgb(175, 175, 175)' }}>{
              this.props.threadsById[thread.id].last_message.text ?
                this.props.threadsById[thread.id].last_message.text.slice(0, 30)
                :
                null}
            </p>
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
      <Container fluid>
        <Segment>
          <Grid>
            <Grid.Column width={4} style={{ paddingLeft: 0 }}>
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
              </Menu>
            </Grid.Column>
            <Grid.Column width={9}>
              <div id="MessageHistory" style={{ height: '75vh', overflowY: 'scroll', padding: '2% 5% 5% 5%' }}>
                <Dimmer active={this.props.isFetchingMessages} inverted>
                  <Loader size="medium">
                    <p>Fetching your messages</p>
                    <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
                      <image href={loader} x="0" y="0" width="100%" height="100%" />
                    </svg>
                  </Loader>
                </Dimmer>
                <div
                  style={{
                    display: !this.props.nextUrl ? 'none' : 'block',
                    marginTop: '20px',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    onClick={
                      () => {
                        this.props.fetchMessages(this.state.activeThread, this.props.nextUrl);
                      }
                    }
                    icon
                    labelPosition="left"
                  >
                    <Icon
                      name={!this.props.isFetching ? 'arrow up' : 'spinner'}
                      loading={this.props.isFetching}
                    />
                    Load More
                  </Button>
                </div>
                {this.renderMessages()}
              </div>
              <Form onSubmit={this.sendMessage}>
                <Form.Group inline>
                  <Form.TextArea
                    className="messageInput"
                    rows={2}
                    style={{ resize: 'none' }}
                    ref={(arg) => { this.inputRef = arg; }}
                    autoComplete="off"
                    type="text"
                    name="message"
                  />
                  <Form.Button content="Send" type="submit" />
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column width={3}>
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
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessagesPage));
