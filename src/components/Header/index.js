import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { Button, Container, Menu, Dropdown, Icon } from 'semantic-ui-react'

class HeaderWithoutRouter extends React.Component {
  state = {}

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push(`/${name}`);
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="massive">
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
          <Menu.Item name="jobs" active={activeItem == "jobs"} onClick={this.handleItemClick}>
            Jobs
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

const Header = withRouter(HeaderWithoutRouter);

export default Header;
