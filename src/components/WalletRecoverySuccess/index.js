import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Image, Card, Form, Input, Grid, Button, Icon, Label } from 'semantic-ui-react';

class WalletRecoverySuccessWithoutRouter extends React.Component {

	static propTypes = {
    history: PropTypes.object.isRequired,
  }

  handleButtonClick = (e, { name }) => {
    let newPath;
    if (name === 'home') {
      newPath = '/';
    } else {
      newPath = `/${name}`;
    }
      this.props.history.push(newPath);

  }

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
	        	Success! <br/>
	        </span>
	        <span className='orange'>
	          Your wallet has been recovered!
	        </span>
	      </Card.Description>
      	<Card.Content style={{paddingTop: 0}}>
					   <Button color='orange' primary fluid className='button' name='home' onClick={this.handleButtonClick} >AWESOME!</Button>
      	</Card.Content>
      </div>
    );
  }
}

const WalletRecoverySuccess = withRouter(WalletRecoverySuccessWithoutRouter);

export default WalletRecoverySuccess;
