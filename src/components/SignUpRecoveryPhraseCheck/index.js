import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';

export default class SignUpRecoveryPhraseCheck extends React.Component {
  state = {}

  seedPhraseButtons() {
    const phrases = this.props.seedPhrase.split(' ');
    return phrases.map((phrase, index) => (
      <Button name={phrase} style={{ textTransform: 'uppercase', marginTop: `${5}px` }} key={index} onClick={this.phraseButtonClick} disabled={this.state[phrase]} > {phrase}</Button>
    ));
  }

 choosed = []

  phraseButtonClick = (e, { name }) => {
    this.setState(prevState => ({ [name]: !prevState[name] }));
    if (this.choosed.indexOf(name) === -1) {
      this.choosed.push(name);
    } else {
      this.choosed.splice(this.choosed.indexOf(name), 1);
    }
  }

  renderClickedButtons(choosed) {
    const clicked = choosed;

    return clicked.map((phrase, index) => (
      <Button primary name={phrase} style={{ textTransform: 'uppercase', marginTop: `${5}px` }} onClick={this.phraseButtonClick} key={index} > {phrase}</Button>
    ));
  }


  render() {
    /* eslint-disable global-require */
    const logo = require('../../icons/edu-logo.png');
    /* eslint-enable global-require */
    return (
      <div className="recovery">
        <Card.Header>
          <Grid centered>
            <Grid.Row>
              <img alt="" className="logo" src={logo} />
              <span className="osu-text-logo">
                <span className="bold">
                  OPEN SOURCE <br />
                </span>
                <span className="standard-logo">
                  UNIVERSITY
                </span>
              </span>
            </Grid.Row>
          </Grid>
        </Card.Header>
        <Card.Description>
          <span className="welcome">
            Recovery Phrase <br />
          </span>
          <span className="orange">
            Please click/tap words in order to confirm that
            your recovery phrase is correctly written
          </span>
        </Card.Description>
        <Card.Content>
          <div className="textAreaButtons">
            {this.renderClickedButtons(this.choosed)}
          </div>
          <div>
            {this.seedPhraseButtons()}
          </div>
        </Card.Content>
        <Card.Content>
          <Button style={{ float: 'left' }} className="button" name="recoveryPhraseSeed" onClick={this.props.handleItemClick} >BACK</Button>
          <Button style={{ float: 'right' }} className="button" name="created" onClick={this.props.handleItemClick} >CONTINUE</Button>
        </Card.Content>
      </div>
    );
  }
}
