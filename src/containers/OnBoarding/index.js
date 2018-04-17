import React from 'react';
import { Container, Image, Card, Form, Input, Grid, Button, Icon } from 'semantic-ui-react';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import PasswordRecovery from 'components/PasswordRecovery';

export default class OnBoarding extends React.Component {
  render() {

  	let background = require('../../img/business-academia.jpg');
    return (
      <Container fluid className='onboarding'>
        <Card className='onboarding-card'>
        	<SignIn />
        </Card>
      </Container>
    );
  }
}