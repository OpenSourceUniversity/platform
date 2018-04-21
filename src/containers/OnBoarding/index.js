import React from 'react';
import { Container, Image, Card, Form, Input, Grid, Button, Icon } from 'semantic-ui-react';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import PasswordRecovery from 'components/PasswordRecovery';

export default class OnBoarding extends React.Component {

  state = {}

  render() {
    const { onboardingActiveForm } = this.state

  	let background = require('../../img/business-academia.jpg');
    return (

      <Container fluid className='onboarding'>
        <Card className='onboarding-card'>
        	{(() => {
                switch(this.state.onboardingActiveForm) {
                case 'recovery': return <PasswordRecovery handleItemClick = {(e, { name }) => this.setState({ onboardingActiveForm: name })}/>;
                case 'signup': return <SignUp handleItemClick = {(e, { name }) => this.setState({ onboardingActiveForm: name })}/>;
                default: return <SignIn handleItemClick = {(e, { name }) => this.setState({ onboardingActiveForm: name })}/>;
                }
              })()}
        </Card>
      </Container>
    );
  }
}