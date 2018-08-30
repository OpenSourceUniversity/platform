import React from 'react';
import { Dimmer, Header, Container, Image, Loader, Form, Segment, Menu, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store from '../../store';
import Message from '../../components/Message';
import fetchThreads from '../../util/messaging/fetchThreads';
import fetchMessages from '../../util/messaging/fetchMessages';
import sendMessage from '../../util/messaging/sendMessage';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';


class MessagesPage extends React.Component {
  state = { activeThread: null, opponent: null }
  componentDidMount() {
    this.props.fetchThreads();
    if (this.props.match.params.id) {
      const activeThreadId = this.props.match.params.id;
      this.state.activeThread = activeThreadId;
      this.props.fetchMessages(activeThreadId);
    }
    this.props.setSecondaryNav(null);
    document.title = 'Messaging';
  }

  showThread(activeThreadID, opponent) {
    this.setState({ activeThread: activeThreadID });
    this.setState({ opponent });
    this.props.history.push(`/messaging/${activeThreadID}/`);
    this.props.fetchMessages(activeThreadID);
  }

  sendMessage = (event) => {
    const text = event.target.elements.message.value;
    if (text) {
      const messageData = {
        threadID: this.state.activeThread,
        text,
      };
      this.props.sendMessage(messageData);
      event.target.elements.message.value = '';
    }
  }

  renderUserInfo() {
    // const { opponent } = this.props;
    // return (
    //   <div>
    //     <Image src={opponent.avatar} />
    //     {opponent.names}
    //   </div>
    // );
  }

  renderMessages() {
    const { messages } = this.props;
    return messages.map((message, index) => (
      <Message
        key={index}
        message={message}
        opponent={message.sender.username === this.props.address.toLowerCase() ? null : this.state.opponent}
      />

    ));
  }

  renderThreads() {
    const { threads } = this.props;
    return threads.map((thread, index) => (
      <Menu.Item
        key={index}
        active={this.state.activeThread === thread.id}
        onClick={() => this.showThread(
          thread.id,
          thread.owner_profile.user.username === this.props.address.toLowerCase() ?
            thread.opponent_profile :
            thread.owner_profile,
        )}
      >
        { thread.owner_profile.user.username === this.props.address.toLowerCase() ?
          thread.opponent_profile.first_name :
          thread.owner_profile.first_name
        }
      </Menu.Item>
    ));
  }

  render() {
    return (
      <Container fluid>
        <Header>
          Messaging
        </Header>
        <Grid>
          <Grid.Column width={4}>
            <Segment>
              <Menu fluid vertical pointing>
                {this.renderThreads()}
              </Menu>
            </Segment>
          </Grid.Column>
          <Grid.Column width={9} style={{ display: this.state.activeThread ? 'block' : 'none' }}>
            <Segment>
              {this.renderMessages()}
            </Segment>
            <Form onSubmit={this.sendMessage}>
              <Form.Group inline>
                <Form.TextArea className="messageInput" rows={2} style={{ resize: 'none' }} ref={(arg) => { this.inputRef = arg; }} autoComplete="off" type="text" name="message" />
                <Form.Button content="Send" type="submit" />
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column width={3}>
            {this.renderUserInfo()}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    messages: state.messaging.messages,
    threads: state.messaging.threads,
    thread: state.messaging.thread,
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
    fetchMessages(url) {
      dispatch(fetchMessages(url));
    },
    sendMessage(messageData) {
      dispatch(sendMessage(messageData));
    },
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessagesPage));
