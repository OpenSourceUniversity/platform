import React from 'react';
import { Container, Image, Card, Form, Input, Grid, Button, Icon, Label } from 'semantic-ui-react';

export default class SignUpRecoveryPhrase extends React.Component {

  seedPhrase() {
    let seedPhrase = this.props.seedPhrase;
    return seedPhrase;
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
            Below is your recovery phrase which is used to generate the keys for your wallet. Please print or write it down and keep it in a secure place.
          </span>
        </Card.Description>
        <Card.Content>
          <div className='seedphrase'>
            {this.seedPhrase()}
          </div>
          <Label basic className='warning-label'>
          <Icon name='warning sign' color='red'/> <span style={{paddingTop: 0, color: 'red', float: 'inherit'}}>If you loose your recovery phrase, your wallet cannot be recovered. </span>
          </Label>
        </Card.Content>
        <Card.Content>
           <Button style={{float: 'left'}} className='button' name='download' >DOWNLOAD SEED PHRASE</Button>
           <Button style={{float: 'right'}} className='button' name='recoveryPhraseCheck' onClick={this.props.handleItemClick} >CONTINUE</Button>
        </Card.Content>
      </div>
    );
  }
}
