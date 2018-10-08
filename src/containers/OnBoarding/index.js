import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Card } from 'semantic-ui-react';
import SignIn from 'components/SignIn';
import PreSignUp from 'components/PreSignUp';
import SignUp from 'components/SignUp';
import WalletRecovery from 'components/WalletRecovery';
import SignUpRecoveryPhrase from 'components/SignUpRecoveryPhrase';
import SignUpRecoveryPhraseCheck from 'components/SignUpRecoveryPhraseCheck';
import WalletCreated from 'components/WalletCreated';
import PasswordRecovery from 'components/PasswordRecovery';
import WalletRecoverySuccess from 'components/WalletRecoverySuccess';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import setOnBoardingActiveElement from '../../util/auth/setOnBoardingActiveElement';

class OnBoarding extends React.Component {
  constructor(props) {
    super(props);
    this.setMnemonicPhrase = this.setMnemonicPhrase.bind(this);
    this.setPassphrase = this.setPassphrase.bind(this);
    this.setEmail = this.setEmail.bind(this);
  }
  state = {
    mnemonicPhrase: null,
    passphrase: null,
    email: null,
  }
  componentDidMount() {
    this.props.setSecondaryNav('null');
    document.title = 'OS.University';
  }

  setMnemonicPhrase(phrase) {
    this.setState({ mnemonicPhrase: phrase });
  }

  setPassphrase(passphrase) {
    this.setState({ passphrase });
  }

  setEmail(email) {
    this.setState({ email });
  }

  render() {
    /* eslint-disable global-require */
    const logoLight = require('../../icons/logo-light.svg');
    return (
      <Container
        fluid
        className="onboarding"
        style={{
          backgroundColor: 'white',
          marginTop: this.props.onBoardingActiveElement === 'walletrecoverysuccess' ?
            '-39px' : null,
        }}
      >
        <section className="left-col">
          <section className="item top-grad">
            <section className="item color-overlay">
              <img className="osu-logo" alt="" src={logoLight} />
            </section>
          </section>
        </section>
        <section className="right-col">
          <Card className="onboarding-card">
            {(() => {
              switch (this.props.onBoardingActiveElement) {
              case 'recoveryPhraseCheck': return <SignUpRecoveryPhraseCheck mnemonicPhrase={this.state.mnemonicPhrase} handleItemClick={(e, { name }) => this.props.setOnBoardingActiveElement(name)} email={this.state.email} />;
              case 'recoveryPhraseSeed': return <SignUpRecoveryPhrase setMnemonicPhrase={this.setMnemonicPhrase} mnemonicPhrase={this.state.mnemonicPhrase} handleItemClick={(e, { name }) => this.props.setOnBoardingActiveElement(name)} email={this.state.email} />;
              case 'recovery': return <WalletRecovery handleItemClick={(e, { name }) => this.props.setOnBoardingActiveElement(name)} setMnemonicPhrase={this.setMnemonicPhrase} />;
              case 'presignup': return <PreSignUp setEmail={this.setEmail} handleItemClick={(e, { name }) => this.props.setOnBoardingActiveElement(name)} />;
              case 'signup': return <SignUp setPassphrase={this.setPassphrase} handleItemClick={(e, { name }) => this.props.setOnBoardingActiveElement(name)} email={this.state.email} />;
              case 'created': return <WalletCreated passphrase={this.state.passphrase} mnemonicPhrase={this.state.mnemonicPhrase} handleItemClick={(e, { name }) => this.props.setOnBoardingActiveElement(name)} email={this.state.email} />;
              case 'passwordrecovery': return <PasswordRecovery handleItemClick={(e, { name }) => this.props.setOnBoardingActiveElement(name)} setPassphrase={this.setPassphrase} />;
              case 'walletrecoverysuccess': return <WalletRecoverySuccess passphrase={this.state.passphrase} mnemonicPhrase={this.state.mnemonicPhrase} handleItemClick={(e, { name }) => this.props.setOnBoardingActiveElement(name)} />;
              default: return (<SignIn
                handleItemClick={(e, { name }) => this.props.setOnBoardingActiveElement(name)}
              />);
              }
            })()}
          </Card>
        </section>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    setOnBoardingActiveElement(activeElement) {
      dispatch(setOnBoardingActiveElement(activeElement));
    },
  };
}

function mapStateToProps(state) {
  return {
    onBoardingActiveElement: state.auth.onBoardingActiveElement,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OnBoarding));
