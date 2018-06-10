import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';

export default class SignUpRecoveryPhraseCheck extends React.Component {
  state = { equalPhrases: false }

  shuffle(array) {
    const initialArray = array;
    for (let i = initialArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [initialArray[i], initialArray[j]] = [initialArray[j], initialArray[i]];
    }
    return initialArray;
  }

  mnemonicPhraseButtons() {
    const phrases = this.shuffledPhrases;
    return phrases.map((phrase, index) => (
      <Button name={phrase} style={{ textTransform: 'uppercase', marginTop: `${5}px` }} key={index} onClick={this.phraseButtonClick} disabled={this.state[phrase]} > {phrase}</Button>
    ));
  }

  shuffledPhrases = this.shuffle(this.props.mnemonicPhrase.split(' '))

  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i += 1) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  choosed = []
  checkArray = this.props.mnemonicPhrase.split(' ')

  phraseButtonClick = (e, { name }) => {
    this.setState(prevState => ({ [name]: !prevState[name] }));
    if (this.choosed.indexOf(name) === -1) {
      this.choosed.push(name);
      if (this.choosed.length === 12) {
        if (this.arraysEqual(this.choosed, this.checkArray)) {
          this.setState({ equalPhrases: true });
        }
      }
    } else {
      this.choosed.splice(this.choosed.indexOf(name), 1);
      this.setState({ equalPhrases: false });
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
            {this.mnemonicPhraseButtons()}
          </div>
        </Card.Content>
        <Card.Content>
          <Button style={{ float: 'left' }} className="button" name="recoveryPhraseSeed" onClick={this.props.handleItemClick} >BACK</Button>
          <Button style={{ float: 'right' }} className="button" disabled={!this.state.equalPhrases} name="created" onClick={this.props.handleItemClick} >CONTINUE</Button>
        </Card.Content>
      </div>
    );
  }
}
