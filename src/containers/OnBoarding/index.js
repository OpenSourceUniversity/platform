import React from 'react';
import { connect } from 'react-redux';
import { Container, Card } from 'semantic-ui-react';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import WalletRecovery from 'components/WalletRecovery';
import SignUpRecoveryPhrase from 'components/SignUpRecoveryPhrase';
import SignUpRecoveryPhraseCheck from 'components/SignUpRecoveryPhraseCheck';
import WalletCreated from 'components/WalletCreated';
import PasswordRecovery from 'components/PasswordRecovery';
import WalletRecoverySuccess from 'components/WalletRecoverySuccess';

class OnBoarding extends React.Component {
  constructor(props) {
    super(props);
    this.setMnemonicPhrase = this.setMnemonicPhrase.bind(this);
    this.setPassphrase = this.setPassphrase.bind(this);
  }
  componentDidMount() {
    this.props.setSecondaryNav(null);
  }
  state = {
    onboardingActiveForm: 'signin',
    mnemonicPhrase: null,
    passphrase: null,
  }

  setMnemonicPhrase(phrase) {
    this.setState({ mnemonicPhrase: phrase });
  }

  setPassphrase(passphrase) {
    this.setState({ passphrase });
  }

  render() {
    return (
      <Container fluid className="onboarding" style={{ backgroundColor: 'white', marginTop: `${-95}px` }}>
        <Card className="onboarding-card">
          {(() => {
            switch (this.state.onboardingActiveForm) {
            case 'recoveryPhraseCheck': return <SignUpRecoveryPhraseCheck mnemonicPhrase={this.state.mnemonicPhrase} handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            case 'recoveryPhraseSeed': return <SignUpRecoveryPhrase setMnemonicPhrase={this.setMnemonicPhrase} mnemonicPhrase={this.state.mnemonicPhrase} handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            case 'recovery': return <WalletRecovery handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} setMnemonicPhrase={this.setMnemonicPhrase} />;
            case 'signup': return <SignUp setPassphrase={this.setPassphrase} handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            case 'created': return <WalletCreated setSecondaryNav={this.props.setSecondaryNav} passphrase={this.state.passphrase} mnemonicPhrase={this.state.mnemonicPhrase} handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            case 'passwordrecovery': return <PasswordRecovery handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} setPassphrase={this.setPassphrase} />;
            case 'walletrecoverysuccess': return <WalletRecoverySuccess passphrase={this.state.passphrase} mnemonicPhrase={this.state.mnemonicPhrase} handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            default: return (<SignIn
              handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })}
            />);
            }
          })()}
        </Card>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}

export default connect(mapDispatchToProps)(OnBoarding);
