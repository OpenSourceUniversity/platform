import React from 'react';
import { Container, Image, Card, Form, Input, Grid, Button, Icon } from 'semantic-ui-react';

export default class SignInPage extends React.Component {
  render() {

  	let background = require('../../img/business-academia.jpg');
  	let logo = require('../../icons/edu-logo.png');
    return (
      <Container fluid className='sign-in'>
        <Card className='sign-in-card'>
        	<Card.Header>
	        	<Grid centered>
	        		<Grid.Row>
		        		<img className='logo-sign-in' src={logo} />
		        		<span className='osu-text-logo-sign-in'>
		        			<span className='bold-sign-in'>
					        	Open Sorce <br/>
					        </span>
					        <span className='standard-logo-sign-in'> 
					        	University
					        </span>
				        </span>
				      </Grid.Row>
			      </Grid>
		      </Card.Header>
		      <Card.Description>
		      	<span className='welcome-sign-in'>
		        	Welcome Back! <br/>
		        </span>
		        <span className='gray-sign-in'>
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
							<Form.Button>LOG IN</Form.Button>
					  </Form>
					  <a href="#">Forgot your password? </a> <br/>
					  <span> Don't have an account? </span>
					  <Button>SIGN UP</Button>
        	</Card.Content>
        </Card>
      </Container>
    );
  }
}