import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage';
import CertificatesPage from 'containers/CertificatesPage';
import CoursesPage from 'containers/CoursesPage';
import JobsPage from 'containers/JobsPage';

class Main extends React.Component {
  state = {}

  render() {

    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/certificates' component={CertificatesPage}/>
        <Route path='/courses' component={CoursesPage}/>
        <Route path='/jobs' component={JobsPage}/>
      </Switch>
    );
  }
}

export default Main;
