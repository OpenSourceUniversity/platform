import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Menu, Dropdown, Input, Grid } from 'semantic-ui-react';


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
      <Menu size="massive" fixed='top'>
        <Container fluid>
          <Grid divided='vertically'>
            <Grid.Row>
              <Menu.Item name="home" onClick={this.handleItemClick}>
                  <img src="https://os.university/static/assets/icons/osu-logo.png" />
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
              <Input className='search-bar' icon='search' placeholder='Search...' />
                <Dropdown item icon="user" text="Profile">
                  <Dropdown.Menu>
                    <Dropdown.Item name="profile" active={activeItem === 'profile'} onClick={this.handleItemClick}>My Profile</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Grid.Row>

            <Grid.Row>
              <Menu.Item name="dashboard" active={activeItem === 'certificates'} onClick={this.handleItemClick}>
                Dashboard
              </Menu.Item>

              <Menu.Item name="courses" active={activeItem === 'certificates'} onClick={this.handleItemClick}>
                Courses
              </Menu.Item>
              <Menu.Item name="programs" active={activeItem === 'courses'} onClick={this.handleItemClick}>
                Programs
              </Menu.Item>
              <Menu.Item name="certificates" active={activeItem === 'jobs'} onClick={this.handleItemClick}>
                Certification
              </Menu.Item>
              <Menu.Item name="challenges" active={activeItem === 'business'} onClick={this.handleItemClick}>
                Challenges
              </Menu.Item>
              <Menu.Item name="jobs" active={activeItem === 'business'} onClick={this.handleItemClick}>
                Job positions
              </Menu.Item>
              <Menu.Item name="interviews" active={activeItem === 'business'} onClick={this.handleItemClick}>
                Interviews
              </Menu.Item>
            </Grid.Row>
          </Grid>
        </Container>
      </Menu>

    );
  }
}

const Header = withRouter(HeaderWithoutRouter);

export default Header;
