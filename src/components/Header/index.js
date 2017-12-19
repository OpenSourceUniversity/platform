import React from 'react';
import { Button, Container, Menu, Dropdown, Icon } from 'semantic-ui-react'

class Header extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="massive" fixed="top">
        <Container>
          <Menu.Item header>
            Open Source University
          </Menu.Item>

          <Menu.Item name="certificates" active={activeItem == "certificates"} onClick={this.handleItemClick}>
            Certificates
          </Menu.Item>
          <Menu.Item name="courses" active={activeItem == "courses"} onClick={this.handleItemClick}>
            Courses
          </Menu.Item>
          <Menu.Item name="learners" active={activeItem == "learners"} onClick={this.handleItemClick}>
            Learners
          </Menu.Item>

          <Menu.Menu position="right">
            <Dropdown item icon="user" text="Profile">
              <Dropdown.Menu>
                <Dropdown.Item>My Profile</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default Header;
