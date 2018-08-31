import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from 'containers/HomePage';
import CertificatesPage from 'containers/CertificatesPage';
import AddCertificatePage from 'containers/AddCertificatePage';
import AddJobPosition from 'containers/AddJobPosition';
import AddCourse from 'containers/AddCourse';
import CoursesPage from 'containers/CoursesPage';
import JobsPage from 'containers/JobsPage';
import ProfilePage from 'containers/ProfilePage';
import SocialNetworkPage from 'containers/SocialNetworkPage';
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
import StudentProgramsPage from 'containers/StudentProgramsPage';
import CertificatePage from 'containers/CertificatePage';
import AcademiesPage from 'containers/Academies';
import BusinessesPage from 'containers/Businesses';
import LearnersPage from 'containers/Learners';
import CertificatesVerificationPage from 'containers/CertificatesVerificationPage';
import NotificationsPage from 'containers/NotificationsPage';
import MessagingPage from 'containers/MessagingPage';

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
        <PrivateRoute {...this.props} exact path="/" component={HomePage} />
        <PrivateRoute {...this.props} exact path="/certificates" component={CertificatesPage} />
        <PrivateRoute {...this.props} exact path="/certificates/add" component={AddCertificatePage} />
        <PrivateRoute {...this.props} path="/certificate/:id/" component={CertificatePage} />
        <PrivateRoute {...this.props} exact path="/businesses/add/" component={AddJobPosition} />
        <PrivateRoute {...this.props} exact path="/businesses/edit/:id/" component={AddJobPosition} />
        <PrivateRoute {...this.props} exact path="/academies/add/" component={AddCourse} />
        <PrivateRoute {...this.props} exact path="/academies/edit/:id/" component={AddCourse} />
        <PrivateRoute {...this.props} exact path="/verifications/" component={CertificatesVerificationPage} />
        <PrivateRoute {...this.props} exact path="/verifications/:id/" component={CertificatesVerificationPage} />
        <PrivateRoute {...this.props} exact path="/messaging" component={MessagingPage} />
        <PrivateRoute {...this.props} exact path="/messaging/:id/" component={MessagingPage} />
        <PrivateRoute {...this.props} path="/courses" component={CoursesPage} />
        <PrivateRoute {...this.props} path="/academies" component={AcademiesPage} />
        <PrivateRoute {...this.props} path="/businesses" component={BusinessesPage} />
        <PrivateRoute {...this.props} path="/learners" component={LearnersPage} />
        <PrivateRoute {...this.props} path="/programs" component={StudentProgramsPage} />
        <PrivateRoute {...this.props} path="/jobs" component={JobsPage} />
        <PrivateRoute {...this.props} path="/profile" component={ProfilePage} />
        <PrivateRoute {...this.props} path="/view-profile/:type/:eth_address/" component={ViewProfile} />
        <PrivateRouteCreateProfile isLoggedIn={this.props.isLoggedIn} path="/settings" component={AccountSettings} />
        <Route path="/onboarding" component={OnBoarding} />
        <PrivateRoute {...this.props} path="/inbox" component={Inbox} />
        <PrivateRoute {...this.props} path="/network" component={Network} />
        <PrivateRoute {...this.props} path="/social-network" component={SocialNetworkPage} />
        <PrivateRoute {...this.props} path="/deposit" component={Deposit} />
        <PrivateRoute {...this.props} path="/course-page/:id/" component={CoursePage} />
        <PrivateRoute {...this.props} path="/program-page" component={StudentProgramPage} />
        <PrivateRouteCreateProfile isLoggedIn={this.props.isLoggedIn} path="/create-profile" component={CreateProfile} />
        <PrivateRoute {...this.props} path="/job-page/:id/" component={JobPage} />
        <PrivateRoute {...this.props} path="/notifications" component={NotificationsPage} />
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
