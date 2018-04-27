import React from 'react';
import { Container, Image, Card, Form, Input, Grid, Button, Icon } from 'semantic-ui-react';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import PasswordRecovery from 'components/PasswordRecovery';
import SignUpRecoveryPhrase from 'components/SignUpRecoveryPhrase';
import SignUpRecoveryPhraseCheck from 'components/SignUpRecoveryPhraseCheck';

export default class OnBoarding extends React.Component {

  state = {}

  render() {
    const { onboardingActiveForm } = this.state

  	let background = require('../../img/business-academia.jpg');
    return (
      <Container fluid className='onboarding' style={{backgroundColor: 'white', marginTop: -95 +'px'}}>
        <Card className='onboarding-card'>
        	{(() => {
                switch(this.state.onboardingActiveForm) {
                case 'recoveryPhraseCheck': return <SignUpRecoveryPhraseCheck handleItemClick = {(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
                case 'recoveryPhraseSeed': return <SignUpRecoveryPhrase handleItemClick = {(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
                case 'recovery': return <PasswordRecovery handleItemClick = {(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
                case 'signup': return <SignUp handleItemClick = {(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
                default: return <SignIn handleItemClick = {(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
                }
              })()}
        </Card>
      </Container>
    );
  }
}