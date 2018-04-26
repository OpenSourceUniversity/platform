import React from 'react';
import { Container, Image, Card, Form, Input, Grid, Button, Icon } from 'semantic-ui-react';

export default class SignIn extends React.Component {
	render() {
		let logo = require('../../icons/edu-logo.png');
		return (
      <div>
      	<Card.Header>
        	<Grid centered>
        		<Grid.Row>
	        		<img className='logo' src={logo} />
	        		<span className='osu-text-logo'>
	        			<span className='bold'>
				        	OPEN SOURCE <br/>
				        </span>
				        <span className='standard-logo'> 
				        	UNIVERSITY
				        </span>
			        </span>
			      </Grid.Row>
		      </Grid>
	      </Card.Header>
	      <Card.Description>
	      	<span className='welcome'>
	        	Welcome Back! <br/>
	        </span>
	        <span className='orange'>
	          Sign in to your account.
	        </span>
	      </Card.Description>
      	<Card.Content>
      		<Form>
        		<Form.Group inline>
					    <Form.Field inline width='16'>
					    	<label>
					    		<Icon name='user' />
					    	</label>
					      <Input type='email' placeholder='Email address' />
					    </Form.Field>
					  </Form.Group>
					  <Form.Group inline>
					    <Form.Field inline width='16'>
					    	<label>
					    		<Icon name='lock' />
					    	</label>
							  <Input type='password' placeholder='Password' />
							</Form.Field>
						</Form.Group>
						<Form.Button className='orange-button'>LOG IN</Form.Button>
				  </Form>
				  <Button fluid name='recovery' className='recovery-link' onClick={this.props.handleItemClick}>Forgot your password? </Button> <br/>
				  <span> Don't have an account? </span>
				  <Button className='button' name='signup' onClick={this.props.handleItemClick} >SIGN UP</Button>
      	</Card.Content>
      </div>
    );
  }
}