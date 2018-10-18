import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, List, Sidebar } from 'semantic-ui-react';
import HeaderSearchComponent from '../HeaderSearchComponent';
import { resetAddCertificateProps } from '../../containers/AddCertificatePage/actions';
import { resetAddCourseProps } from '../../containers/AddCourse/actions';
import { resetAddJobProps } from '../../containers/AddJobPosition/actions';


class MobileHeaderWithoutRouter extends Sidebar {
  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    let newPath;
    if (name === 'home') {
      newPath = '/';
    } else {
      newPath = `/${name}`;
      this.props.resetAddJobProps();
      this.props.resetAddCourseProps();
      this.props.resetAddCertificateProps();
    }
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath);
      this.props.showSidebar();
    }
  }

  render() {
    const { activeItem } = this.state;

    const learnerAcademiaDropdownElements = [
      {
        key: 'academies', content: 'Academia', name: 'academies', className: 'academia', active: activeItem === 'academies', onClick: this.handleItemClick,
      },
      {
        key: 'courses', content: 'Browse courses', name: 'courses', active: activeItem === 'courses', onClick: this.handleItemClick,
      },
      {
        key: 'learners', content: 'Learners', name: 'learners', active: activeItem === 'learners', onClick: this.handleItemClick,
      },
      {
        key: 'certificates', content: 'My certificates', name: 'certificates', active: activeItem === 'certificates', onClick: this.handleItemClick,
      },
    ];

    const learnerBusinessesDropdownElements = [
      {
        key: 'businesses', content: 'Businesses', name: 'businesses', className: 'businesses', active: activeItem === 'businesses', onClick: this.handleItemClick,
      },
      {
        key: 'jobs', content: 'Browse jobs', name: 'jobs', active: activeItem === 'jobs', onClick: this.handleItemClick,
      },
      {
        key: 'job-applications', content: 'Job Applications', name: 'job-applications', active: activeItem === 'job-applications', onClick: this.handleItemClick,
      },
    ];

    const academyAcademiaDropdownElements = [
      {
        key: 'learners', content: 'Learners', name: 'learners', className: 'academia', active: activeItem === 'learners', onClick: this.handleItemClick,
      },
      {
        key: 'add-course', content: 'Add course', name: 'academies/add/', active: activeItem === 'academies/add/', onClick: this.handleItemClick,
      },
      {
        key: 'add-certificate', content: 'Add Certificate', name: 'certificates/add', active: activeItem === 'certificates/add', onClick: this.handleItemClick,
      },
      {
        key: 'verification', content: 'Certificates verification', name: 'verifications/academy/', active: activeItem === 'verifications/academy/', onClick: this.handleItemClick,
      },
    ];

    const academyBusinessesDropdownElements = [
      {
        key: 'businesses', content: 'Businesses', name: 'businesses', className: 'businesses', active: activeItem === 'businesses', onClick: this.handleItemClick,
      },
      {
        key: 'jobs', content: 'Browse jobs', name: 'jobs', active: activeItem === 'jobs', onClick: this.handleItemClick,
      },
    ];

    const businessAcademiaDropdownElements = [
      {
        key: 'academies', content: 'Academia', name: 'academies', className: 'academia', active: activeItem === 'academies', onClick: this.handleItemClick,
      },
      {
        key: 'courses', content: 'Browse courses', name: 'courses', active: activeItem === 'courses', onClick: this.handleItemClick,
      },
      {
        key: 'certificates', content: 'My certificates', name: 'certificates', active: activeItem === 'certificates', onClick: this.handleItemClick,
      },
      {
        key: 'verification', content: 'Certificates verification', name: 'verifications/business/', active: activeItem === 'verifications/business/', onClick: this.handleItemClick,
      },
    ];

    const businessBusinessesDropdownElements = [
      {
        key: 'learners', content: 'Learners', name: 'learners', className: 'academia', active: activeItem === 'learners', onClick: this.handleItemClick,
      },
      {
        key: 'jobs', content: 'Browse jobs', name: 'jobs', active: activeItem === 'jobs', onClick: this.handleItemClick,
      },
      {
        key: 'add-job', content: 'Add job position', name: 'businesses/add/', active: activeItem === 'businesses/add/', onClick: this.handleItemClick,
      },
      {
        key: 'job-applications', content: 'Job Applications', name: 'job-applications', active: activeItem === 'job-applications', onClick: this.handleItemClick,
      },
    ];
    return (
      <Sidebar
        as={Menu}
        animation="overlay"
        vertical
        className="mobile-sidebar"
        width="wide"
        style={{ zIndex: 100, maxWidth: '100%' }}
        visible={this.props.visible}
      >
        <Menu.Item name="home" className="home-link" onClick={this.handleItemClick} active={activeItem === 'home'} >Home</Menu.Item>
        <Menu.Item>
          {(() => {
            switch (this.props.activeAccount) {
            case 'Academy': return <List selection items={academyAcademiaDropdownElements} />;
            case 'Business': return <List selection items={businessAcademiaDropdownElements} />;
            default: return (
              <List
                selection
                items={learnerAcademiaDropdownElements}
              />);
            }
          })()}
        </Menu.Item>
        <Menu.Item>
          {(() => {
            switch (this.props.activeAccount) {
            case 'Academy': return <List selection items={academyBusinessesDropdownElements} />;
            case 'Business': return <List selection items={businessBusinessesDropdownElements} />;
            default:
              return <List selection items={learnerBusinessesDropdownElements} />;
            }
          })()}
        </Menu.Item>
        <Menu.Item>
          <HeaderSearchComponent />
        </Menu.Item>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
    isLoggedIn: state.auth.isLoggedIn,
    secondaryNav: state.secondaryNav.secondaryNav,
    profiles: state.profiles.profiles,
    onBoardingActiveElement: state.auth.onBoardingActiveElement,
    activeAccount: state.activeAccount.activeAccount,
    unreadAllMessagesCount: state.messaging.unreadAllMessagesCount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetAddCertificateProps() {
      dispatch(resetAddCertificateProps());
    },
    resetAddCourseProps() {
      dispatch(resetAddCourseProps());
    },
    resetAddJobProps() {
      dispatch(resetAddJobProps());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MobileHeaderWithoutRouter));
