import React from 'react';
import { Step, Container, Icon } from 'semantic-ui-react';
import AcademiaSettings from 'components/AcademiaSettings';
import ChooseAccount from 'components/ChooseAccount';


export default class CreateAccount extends React.Component {

	state = {active: 'profile'}

  handleClick = (e, { name }) => this.setState({ active: name, activeSlide: name })

  

  render() {
  	const { active, activeSlide } = this.state
  	return (
			<div className ='course'>
				<Container textAlign='center'>
					<Step.Group size='mini'>
		        <Step
		          active={active === 'profile'}
		          icon='radio'
		          link
		          onClick={this.handleClick}
		          title='CHOOSE PROFILE'
		          name='profile'
		        />

		        <Step
		          active={active === 'info'}
		          icon='radio'
		          link
		          onClick={this.handleClick}
		          title='ADDITIONAL INFO'
		          name='info'
		        />

		        <Step
		          active={active === 'payment'}
		          icon='radio'
		          link
		          onClick={this.handleClick}
		          title='PAYMENT METNOD'
		          name='payment'
		        />

		        <Step
		          active={active === 'deposit'}
		          icon='radio'
		          link
		          onClick={this.handleClick}
		          title='DEPOSIT'
		          name='deposit'
		        />
					</Step.Group>
					{(() => {
					  switch(this.state.activeSlide) {
					  case 'info': return <AcademiaSettings />;
					  case 'payment': return null;
					  case 'deposit': return null;
					  default: return <ChooseAccount />;
					  }
					})()}
				</Container>
	    </div>
  	);
  }
}