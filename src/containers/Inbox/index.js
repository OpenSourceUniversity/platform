import React from 'react';
import { Input, Menu, Segment } from 'semantic-ui-react'

export default class Inbox extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
		
    const { activeItem } = this.state

    return (
      <Container fluid className='inbox'>
        <Menu pointing>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
          <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment>

        </Segment>
      </Container>
    )
  }
}