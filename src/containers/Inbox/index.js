import React from 'react';
import { Container, Button, Label, Input, Menu, Segment, Grid, Comment, Item, Divider, Message, Icon, Header } from 'semantic-ui-react';

const description = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet ante a sem eleifend bibendum. Aliquam ex lectus, volutpat et est nec, luctus cursus dui. In molestie dolor malesuada, varius sapien commodo, iaculis nulla. Nulla hendrerit nisi non nibh blandit, nec sollicitudin augue semper. In nulla arcu, lacinia ac eleifend non, venenatis ut nunc. Suspendisse accumsan libero a leo pretium porttitor. Praesent ornare, odio a eleifend egestas, mi felis ultrices sapien, a tincidunt nibh tortor sit amet mi. Nunc vehicula mi non pharetra ultricies. In finibus tempus sodales. Sed eu orci et mauris malesuada egestas. Sed maximus est eget ipsum condimentum consectetur. Curabitur gravida scelerisque posuere. Proin in commodo massa, eu fringilla libero. Sed posuere ultricies neque, quis vulputate erat commodo sit amet. Pellentesque at sem et massa ultrices lacinia. Suspendisse in dolor vel turpis mollis ornare. Aliquam tempus, justo nec mattis blandit, eros tellus semper leo, sed euismod nisi tellus in metus. Duis ipsum urna, dapibus molestie enim et, bibendum iaculis elit. Quisque molestie dignissim vehicula. Morbi eleifend ligula quam, in sodales felis convallis id. In iaculis porta tincidunt. Nunc imperdiet dui ut congue fringilla. Mauris interdum diam nec erat ultrices, ac condimentum velit ultricies.',
].join(' ');

export default class Inbox extends React.Component {
  state = { activeItem: 'inbox' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    /* eslint-disable global-require */
    const messages = require('../../icons/nav_messages.svg');
    const avatarPlaceholder = require('../../icons/avatar_placeholder.svg');
    /* eslint-enable global-require */

    const { activeItem } = this.state;

    return (
      <Container className="inbox">
        <Header size="huge">
          <svg width="32" height="32" className="icon">
            <image href={messages} x="0" y="0" width="100%" height="100%" />
          </svg>
          Messages
        </Header>
        <Divider clearing />
        <Menu stackable size="huge">
          <Menu.Item>
            <Button primary>
              <Icon name="write" size="small" />
              New Message
            </Button>
          </Menu.Item>

          <Menu.Item
            name="inbox"
            active={activeItem === 'inbox'}
            onClick={this.handleItemClick}
          >
            <Icon name="inbox" size="small" />
            Inbox
            <Label circular>1</Label>
          </Menu.Item>
          <Menu.Item
            name="sent"
            active={activeItem === 'features'}
            onClick={this.handleItemClick}
          >
            <Icon name="send outline" size="small" />
            Sent
          </Menu.Item>
          <Menu.Item
            name="drafts"
            active={activeItem === 'drafts'}
            onClick={this.handleItemClick}
          >
            <Icon name="edit" size="small" />
            Drafts
          </Menu.Item>
          <Menu.Item
            name="trash"
            active={activeItem === 'trash'}
            onClick={this.handleItemClick}
          >
            <Icon name="trash" size="small" />
            Trash
          </Menu.Item>

          <Menu.Item position="right">
            <Input className="icon" icon="search" placeholder="Search messages..." />
          </Menu.Item>

        </Menu>

        <Segment>
          <Grid relaxed>
            <Grid.Column width={4}>
              <Segment>
                <Comment.Group threaded>
                  <Item.Group link>
                    <Item>
                      <Comment>
                        <Comment.Avatar as="a" src={avatarPlaceholder} />
                        <Comment.Content>
                          <Comment.Author as="a">Matt</Comment.Author>
                          <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                          </Comment.Metadata>
                          <Comment.Text>
                            <Label circular color="orange" size="tiny" empty /> &nbsp;
                            How artistic!
                          </Comment.Text>
                        </Comment.Content>
                      </Comment>
                    </Item>
                    <Divider />
                    <Item>
                      <Comment>
                        <Comment.Avatar as="a" src={avatarPlaceholder} />
                        <Comment.Content>
                          <Comment.Author as="a">Matt</Comment.Author>
                          <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                          </Comment.Metadata>
                          <Comment.Text>How artistic!</Comment.Text>
                        </Comment.Content>
                      </Comment>
                    </Item>
                    <Divider />
                    <Item>
                      <Comment>
                        <Comment.Avatar as="a" src={avatarPlaceholder} />
                        <Comment.Content>
                          <Comment.Author as="a">Matt</Comment.Author>
                          <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                          </Comment.Metadata>
                          <Comment.Text>How artistic!</Comment.Text>
                        </Comment.Content>
                      </Comment>
                    </Item>
                    <Divider />
                    <Item>
                      <Comment>
                        <Comment.Avatar as="a" src={avatarPlaceholder} />
                        <Comment.Content>
                          <Comment.Author as="a">Matt</Comment.Author>
                          <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                          </Comment.Metadata>
                          <Comment.Text>How artistic!</Comment.Text>
                        </Comment.Content>
                      </Comment>
                    </Item>
                    <Divider />
                    <Item>
                      <Comment>
                        <Comment.Avatar as="a" src={avatarPlaceholder} />
                        <Comment.Content>
                          <Comment.Author as="a">Matt</Comment.Author>
                          <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                          </Comment.Metadata>
                          <Comment.Text>How artistic!</Comment.Text>
                        </Comment.Content>
                      </Comment>
                    </Item>
                    <Divider />
                    <Item>
                      <Comment>
                        <Comment.Avatar as="a" src={avatarPlaceholder} />
                        <Comment.Content>
                          <Comment.Author as="a">Matt</Comment.Author>
                          <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                          </Comment.Metadata>
                          <Comment.Text>How artistic!</Comment.Text>
                        </Comment.Content>
                      </Comment>
                    </Item>

                  </Item.Group>
                </Comment.Group>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Message attached>
                <Menu secondary size="small">
                  <Menu.Item>
                    <Comment.Group>
                      <Comment>
                        <Comment.Avatar as="a" src={avatarPlaceholder} />
                        <Comment.Content>
                          <Comment.Author as="a">Matt</Comment.Author>
                          <Comment.Text>
                            <span>Today at 5:42PM</span>
                          </Comment.Text>
                        </Comment.Content>
                      </Comment>
                    </Comment.Group>
                  </Menu.Item>

                  <Menu.Item position="right">
                    <Button basic>
                      <Icon name="trash" size="small" />
                      Delete
                    </Button>
                    &nbsp;&nbsp;
                    <Button basic>
                      <Icon name="mail" size="small" />
                      Mark as unread
                    </Button>
                  </Menu.Item>
                </Menu>
              </Message>

              <Segment attached padded="very">
                <Header as="h3">
                  How artistic!
                </Header>
                <Divider />
                {description}
              </Segment>
              <Message attached="bottom">
                <Segment vertical clearing>
                  <Button primary floated="right">
                    <Icon name="reply" size="small" />
                      Reply
                  </Button>
                </Segment>
              </Message>

            </Grid.Column>
          </Grid>
        </Segment>

        <Menu pagination>
          <Menu.Item name="1" active={activeItem === '1'} onClick={this.handleItemClick} />
          <Menu.Item disabled>...</Menu.Item>
          <Menu.Item name="10" active={activeItem === '10'} onClick={this.handleItemClick} />
          <Menu.Item name="11" active={activeItem === '11'} onClick={this.handleItemClick} />
          <Menu.Item name="12" active={activeItem === '12'} onClick={this.handleItemClick} />
        </Menu>


      </Container>
    );
  }
}
