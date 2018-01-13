import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Menu, Dropdown } from 'semantic-ui-react';


class HeaderWithoutRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    let newPath;
    if (name === 'home') {
      newPath = '/';
    } else {
      newPath = `/${name}`;
    }

    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath);
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="massive">
        <Container>
          <Menu.Item name="home" header onClick={this.handleItemClick}>
            Open Source University
          </Menu.Item>

          <Menu.Item name="certificates" active={activeItem === 'certificates'} onClick={this.handleItemClick}>
            Certificates
          </Menu.Item>
          <Menu.Item name="courses" active={activeItem === 'courses'} onClick={this.handleItemClick}>
            Courses
          </Menu.Item>
          <Menu.Item name="jobs" active={activeItem === 'jobs'} onClick={this.handleItemClick}>
            Jobs
          </Menu.Item>
          <Menu.Item name="business" active={activeItem === 'business'} onClick={this.handleItemClick}>
            Business
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
