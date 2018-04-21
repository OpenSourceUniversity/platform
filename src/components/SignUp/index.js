import React from 'react';
import { Container, Image, Card, Form, Input, Grid, Button, Icon } from 'semantic-ui-react';

export default class SignUp extends React.Component {
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
	        	Welcome! <br/>
	        </span>
	        <span className='orange'>
	          Create a new account.
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
						<Form.Field inline className='check-box'>
							<Input  
								type='checkbox'
							/>
							<span>
								I agree with the Terms&Conditions
							</span>
						</Form.Field>
						<Form.Button className='orange-button'>SIGN UP</Form.Button>
				  </Form>
				  <div className='sign-up'>
					  <span> Already have an account? </span>
					  <Button className='button' name='signin' onClick={this.props.handleItemClick}>SIGN IN</Button>
					</div>
      	</Card.Content>
      </div>
    );
  }
}
