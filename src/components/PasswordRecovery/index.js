import React from 'react';
import { Container, Image, Card, Form, Input, Grid, Button, Icon } from 'semantic-ui-react';

export default class PasswordRecovery extends React.Component {
	render() {
		let logo = require('../../icons/edu-logo.png');
		return (
      <div className='recovery'>
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
	        	Password Recovery <br/>
	        </span>
	        <span className='orange'>
	          Please enter your email address to recover your password.
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
						<Form.Button className='orange-button'>SEND EMAIL</Form.Button>
				  </Form>
				   <Button className='button' name='signip' onClick={this.props.handleItemClick} >BACK TO SIGN IN</Button>
      	</Card.Content>
      </div>
    );
  }
}
