import React from 'react';
import { Switch, Route } from 'react-router-dom';
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

class Main extends React.Component {
  state = {}

  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/certificates" component={CertificatesPage} />
        <Route exact path="/certificates/add" component={AddCertificatePage} />
        <Route exact path="/businesses/add" component={AddPositionToBusinessPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/programs" component={StudentProgramsPage} />
        <Route path="/jobs" component={JobsPage} />
        <Route path="/business" component={BusinessPage} />
        <Route
          path="/profile"
          render={props => (<ProfilePage
            {...props}
            activeAccount={this.props.activeAccount}
            academyProfilePic={this.props.academyProfilePic}
            learnerProfilePic={this.props.learnerProfilePic}
            businessProfilePic={this.props.businessProfilePic}
          />)}
        />
        <Route
          path="/settings"
          render={props => (<Account
            {...props}
            activeAccount={this.props.activeAccount}
            setActiveAccount={this.props.setActiveAccount}
          />)}
        />
        <Route
          path="/onboarding"
          render={props => (<OnBoarding
            {...props}
          />)}
        />
        <Route path="/inbox" component={Inbox} />
        <Route path="/network" component={Network} />
        <Route path="/deposit" component={Deposit} />
        <Route path="/course-page/:id/" component={CoursePage} />
        <Route path="/program-page" component={StudentProgramPage} />
        <Route
          path="/create-profile"
          render={props => (<CreateProfile
            {...props}
            activeAccount={this.props.activeAccount}
            setActiveAccount={this.props.setActiveAccount}
            setCreateAccountActiveItem={this.props.setCreateAccountActiveItem}
            createAccountActiveItem={this.props.createAccountActiveItem}
            setCreateAccountNav={this.props.setCreateAccountNav}
            createAccountNav={this.props.createAccountNav}
          />)}
        />
        <Route path="/job-page" component={JobPage} />
        <Route
          path="/create-course"
          render={props => (<CreateCoursePage
            {...props}
            academyProfilePic={this.props.academyProfilePic}
          />)}
        />
        <Route
          path="/create-job"
          render={props => (<CreateJobPage
            {...props}
            businessProfilePic={this.props.businessProfilePic}
          />)}
        />
      </Switch>
    );
  }
}

export default Main;
