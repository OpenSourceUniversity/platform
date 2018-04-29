import React from 'react';
import { Container, Image, Card, Form, Input, Grid, Button, Icon, Label } from 'semantic-ui-react';

export default class SignUpRecoveryPhraseCheck extends React.Component {

	seedPhraseButtons() {
		let seedPhrase = this.props.seedPhrase;
		let phrases = seedPhrase.split(" ");
		return phrases.map((phrase, index) => (
        <Button name={phrase} style={{textTransform: 'uppercase', marginTop: 5 + 'px'}} key={index} onClick={this.phraseButtonClick} disabled={this.state[phrase]}  > {phrase}</Button>
    ));
	}

 state = {}

 choosed = []

	phraseButtonClick = (e, { name }) => {
		this.setState((prevState) => {
			return	{[name]: !prevState[name]}
		});
		if(this.choosed.indexOf(name) === -1) {
			this.choosed.push(name);
		} else {
			this.choosed.splice(this.choosed.indexOf(name), 1);
		}
  }

  renderClickedButtons(choosed) {

  	let clicked = choosed;

  	return clicked.map((phrase, index) => (
        <Button primary name={phrase} style={{textTransform: 'uppercase', marginTop: 5 + 'px'}} onClick={this.phraseButtonClick} key={index} > {phrase}</Button>
    ));
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
	        	Recovery Phrase <br/>
	        </span>
	        <span className='orange'>
	          Please click/tap words in order to confirm that your recovery phrase is correctly written
	        </span>
	      </Card.Description>
	      <Card.Content>
	      	<div className='textAreaButtons'>
	      		{this.renderClickedButtons(this.choosed)}
	      	</div>
	      	<div>
				  	{this.seedPhraseButtons()}
				  </div>
	      </Card.Content>
      	<Card.Content>
				   <Button style={{float: 'left'}} className='button' name='recoveryPhraseSeed' onClick={this.props.handleItemClick} >BACK</Button>
				   <Button style={{float: 'right'}} className='button' name='created' onClick={this.props.handleItemClick} >CONTINUE</Button>
      	</Card.Content>
      </div>
    );
  }
}
