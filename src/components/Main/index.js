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
import CreateProfile from 'containers/CreateProfile';
import JobPage from 'containers/JobPage';

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
        <Route path="/jobs" component={JobsPage} />
        <Route path="/business" component={BusinessPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/settings" component={Account} />
        <Route path="/onboarding" component={OnBoarding} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/network" component={Network} />
        <Route path="/deposit" component={Deposit} />
        <Route path="/course-page" component={CoursePage} />
        <Route path="/create-profile" component={CreateProfile} />
        <Route path="/job-page" component={JobPage} />
      </Switch>
    );
  }
}

export default Main;
