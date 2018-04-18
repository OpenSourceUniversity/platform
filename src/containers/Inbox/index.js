import React from 'react';
import { Container, Button, Label, Input, Menu, Segment, Grid, Comment, Item, Divider, Card, Icon } from 'semantic-ui-react'

const description = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet ante a sem eleifend bibendum. Aliquam ex lectus, volutpat et est nec, luctus cursus dui. In molestie dolor malesuada, varius sapien commodo, iaculis nulla. Nulla hendrerit nisi non nibh blandit, nec sollicitudin augue semper. In nulla arcu, lacinia ac eleifend non, venenatis ut nunc. Suspendisse accumsan libero a leo pretium porttitor. Praesent ornare, odio a eleifend egestas, mi felis ultrices sapien, a tincidunt nibh tortor sit amet mi. Nunc vehicula mi non pharetra ultricies. In finibus tempus sodales. Sed eu orci et mauris malesuada egestas. Sed maximus est eget ipsum condimentum consectetur. Curabitur gravida scelerisque posuere. Proin in commodo massa, eu fringilla libero. Sed posuere ultricies neque, quis vulputate erat commodo sit amet. Pellentesque at sem et massa ultrices lacinia. Suspendisse in dolor vel turpis mollis ornare. Aliquam tempus, justo nec mattis blandit, eros tellus semper leo, sed euismod nisi tellus in metus. Duis ipsum urna, dapibus molestie enim et, bibendum iaculis elit. Quisque molestie dignissim vehicula. Morbi eleifend ligula quam, in sodales felis convallis id. In iaculis porta tincidunt. Nunc imperdiet dui ut congue fringilla. Mauris interdum diam nec erat ultrices, ac condimentum velit ultricies.'
].join(' ')

export default class Inbox extends React.Component {
  
  state = { activeItem: 'inbox' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    let avatar_placeholder = require('../../icons/avatar_placeholder.svg');

    const { activeItem } = this.state

    return (
      <Container fluid className='inbox'>
        <Menu stackable size='huge'>
          <Menu.Item>
            <Button primary>
              <Icon name='write' size='small' />          
              New Message
            </Button>
          </Menu.Item>
          
          <Menu.Item
            name='inbox'
            active={activeItem === 'inbox'}
            onClick={this.handleItemClick}
          >
            <Icon name='inbox' size='small' />          
            Inbox
            <Label circular>1</Label>
          </Menu.Item>
          <Menu.Item
            name='sent'
            active={activeItem === 'features'}
            onClick={this.handleItemClick}
          >
            <Icon name='send outline' size='small' />          
            Sent
          </Menu.Item>
          <Menu.Item
            name='drafts'
            active={activeItem === 'drafts'}
            onClick={this.handleItemClick}
          >
            <Icon name='edit' size='small' />          
            Drafts
          </Menu.Item>
          <Menu.Item
            name='trash'
            active={activeItem === 'trash'}
            onClick={this.handleItemClick}
          >
            <Icon name='trash' size='small' />          
            Trash
          </Menu.Item>

          <Menu.Item position='right'>
            <Input className='icon' icon='search' placeholder='Search messages...' />
          </Menu.Item>

        </Menu>

        <Segment>
          <Grid relaxed>
            <Grid.Column width={4}>
              <Comment.Group threaded>
                <Item.Group link>
                  <Item>
                    <Comment>
                      <Comment.Avatar as='a' src={avatar_placeholder} />
                      <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                          <span>Today at 5:42PM</span> 
                        </Comment.Metadata>
                        <Comment.Text>
                          <Label circular color='orange' size='tiny' empty />
                           How artistic!
                        </Comment.Text>
                      </Comment.Content>
                    </Comment>
                  </Item>
                  <Divider />
                  <Item>
                    <Comment>
                      <Comment.Avatar as='a' src={avatar_placeholder} />
                      <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
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
                      <Comment.Avatar as='a' src={avatar_placeholder} />
                      <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
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
                      <Comment.Avatar as='a' src={avatar_placeholder} />
                      <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
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
                      <Comment.Avatar as='a' src={avatar_placeholder} />
                      <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
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
                      <Comment.Avatar as='a' src={avatar_placeholder} />
                      <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                          <span>Today at 5:42PM</span>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                      </Comment.Content>
                    </Comment>
                  </Item>

                </Item.Group>
              </Comment.Group>
            </Grid.Column>
            <Grid.Column width={12}>
              <Card fluid>
                <Card.Content header='How artistic!' />
                <Card.Content description={description} />
                <Card.Content extra>
                  
                  
                  <Menu secondary size='small'>
                    <Menu.Item>
                      <Comment.Group>
                        <Comment>
                          <Comment.Avatar as='a' src={avatar_placeholder} />
                          <Comment.Content>
                            <Comment.Author as='a'>Matt</Comment.Author>
                            <Comment.Text>
                              <Comment.Metadata>
                                <span>Today at 5:42PM</span>
                              </Comment.Metadata>
                            </Comment.Text>
                          </Comment.Content>
                        </Comment>
                      </Comment.Group>
                    </Menu.Item>

                    <Menu.Item position='right'>
                      <Button>
                        <Icon name='reply' size='small' />          
                        Reply
                      </Button>
                    </Menu.Item>

                  </Menu>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Segment>

        <Menu pagination>
          <Menu.Item name='1' active={activeItem === '1'} onClick={this.handleItemClick} />
          <Menu.Item disabled>...</Menu.Item>
          <Menu.Item name='10' active={activeItem === '10'} onClick={this.handleItemClick} />
          <Menu.Item name='11' active={activeItem === '11'} onClick={this.handleItemClick} />
          <Menu.Item name='12' active={activeItem === '12'} onClick={this.handleItemClick} />
        </Menu>

        
      </Container>
    )
  }
}