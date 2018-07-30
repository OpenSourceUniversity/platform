import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from 'containers/HomePage';
import CertificatesPage from 'containers/CertificatesPage';
import AddCertificatePage from 'containers/AddCertificatePage';
import AddJobPosition from 'containers/AddJobPosition';
import CoursesPage from 'containers/CoursesPage';
import JobsPage from 'containers/JobsPage';
import BusinessPage from 'containers/BusinessPage';
import ProfilePage from 'containers/ProfilePage';
import ViewProfile from 'containers/ViewProfile';
import AccountSettings from 'containers/AccountSettings';
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
import AcademiesPage from 'containers/Academies';
import BusinessesPage from 'containers/Businesses';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      (() => {
        if (rest.isLoggedIn === true) {
          switch (rest.activeAccount) {
          case 'Learner':
            if (rest.learnerIsCreated) {
              return <Component {...props} />;
            }

            return <Redirect to="/create-profile" />;

          case 'Academy':
            if (rest.academyIsCreated) {
              return <Component {...props} />;
            }

            return <Redirect to="/create-profile" />;

          case 'Business':
            if (rest.businessIsCreated) {
              return <Component {...props} />;
            }

            return <Redirect to="/create-profile" />;

          default:
            return <Redirect to="/create-profile" />;
          }
        } else {
          return <Redirect to="/onboarding" />;
        }
      })()
    )}
  />
);

const PrivateRouteCreateProfile = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      rest.isLoggedIn === true ?
        <Component {...props} />
        : <Redirect to="/onboarding" />
    )}
  />
);

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} exact path="/" component={HomePage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} exact path="/certificates" component={CertificatesPage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} exact path="/certificates/add" component={AddCertificatePage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/certificate/:id/" component={CertificatePage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} exact path="/businesses/add/" component={AddJobPosition} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} exact path="/businesses/edit/:id/" component={AddJobPosition} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/courses" component={CoursesPage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/academies" component={AcademiesPage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/businesses" component={BusinessesPage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/programs" component={StudentProgramsPage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/jobs" component={JobsPage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/profile" component={ProfilePage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/view-profile/:type/:eth_address/" component={ViewProfile} />
        <PrivateRouteCreateProfile isLoggedIn={this.props.isLoggedIn} path="/settings" component={AccountSettings} />
        <Route path="/onboarding" component={OnBoarding} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/inbox" component={Inbox} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/network" component={Network} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/deposit" component={Deposit} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/course-page/:id/" component={CoursePage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/program-page" component={StudentProgramPage} />
        <PrivateRouteCreateProfile isLoggedIn={this.props.isLoggedIn} path="/create-profile" component={CreateProfile} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/job-page/:id/" component={JobPage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/create-course" component={CreateCoursePage} />
        <PrivateRoute activeAccount={this.props.activeAccount} isLoggedIn={this.props.isLoggedIn} learnerIsCreated={this.props.learnerIsCreated} academyIsCreated={this.props.academyIsCreated} businessIsCreated={this.props.businessIsCreated} path="/create-job" component={CreateJobPage} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    activeAccount: state.activeAccount.activeAccount,
    learnerIsCreated: state.profiles.learnerIsCreated,
    academyIsCreated: state.profiles.academyIsCreated,
    businessIsCreated: state.profiles.businessIsCreated,

  };
}

export default withRouter(connect(mapStateToProps)(Main));
