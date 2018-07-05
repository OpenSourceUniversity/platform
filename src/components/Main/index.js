import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from 'containers/HomePage';
import CertificatesPage from 'containers/CertificatesPage';
import AddCertificatePage from 'containers/AddCertificatePage';
import AddPositionToBusinessPage from 'containers/AddPositionToBusinessPage';
import CoursesPage from 'containers/CoursesPage';
import JobsPage from 'containers/JobsPage';
import BusinessPage from 'containers/BusinessPage';
import ProfilePage from 'containers/ProfilePage';
import Account from 'containers/Account';
import OnBoarding from 'containers/OnBoarding';
import Inbox from 'containers/Inbox';
import Network from 'containers/Network';
import Deposit from 'containers/Deposit';
import CoursePage from 'containers/CoursePage';
import StudentProgramPage from 'containers/StudentProgramPage';
import CreateProfile from 'containers/CreateProfile';
import JobPage from 'containers/JobPage';
import CreateJobPage from 'containers/CreateJobPage';
import CreateCoursePage from 'containers/CreateCoursePage';
import StudentProgramsPage from 'containers/StudentProgramsPage';
import CertificatePage from 'containers/CertificatePage';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      rest.isLoggedIn === true
        ? <Component {...props} />
        : <Redirect to="/onboarding" />
    )}
  />
);

class Main extends React.Component {
  state = {}

  render() {
    return (
      <Switch>
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} exact path="/" component={HomePage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} exact path="/certificates" component={CertificatesPage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} exact path="/certificates/add" component={AddCertificatePage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/certificate/:id/" component={CertificatePage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} exact path="/businesses/add" component={AddPositionToBusinessPage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/courses" component={CoursesPage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/programs" component={StudentProgramsPage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/jobs" component={JobsPage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/business" component={BusinessPage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/profile" component={ProfilePage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/settings" component={Account} />
        <Route path="/onboarding" component={OnBoarding} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/inbox" component={Inbox} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/network" component={Network} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/deposit" component={Deposit} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/course-page/:id/" component={CoursePage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/program-page" component={StudentProgramPage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/create-profile" component={CreateProfile} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/job-page" component={JobPage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/create-course" component={CreateCoursePage} />
        <PrivateRoute isLoggedIn={this.props.isLoggedIn} path="/create-job" component={CreateJobPage} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
}

export default withRouter(connect(mapStateToProps)(Main));
