import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import WalletRecovery from 'components/WalletRecovery';
import SignUpRecoveryPhrase from 'components/SignUpRecoveryPhrase';
import SignUpRecoveryPhraseCheck from 'components/SignUpRecoveryPhraseCheck';
import WalletCreated from 'components/WalletCreated';
import PasswordRecovery from 'components/PasswordRecovery';
import WalletRecoverySuccess from 'components/WalletRecoverySuccess';

export default class OnBoarding extends React.Component {
  constructor(props) {
    super(props);
    this.setMnemonicPhrase = this.setMnemonicPhrase.bind(this);
  }
  state = { onboardingActiveForm: 'signin', mnemonicPhrase: 'fog prepare party warm tomorrow athlete equip elbow seven stool pet tent' }

  setMnemonicPhrase(phrase) {
    this.setState({ mnemonicPhrase: phrase });
  }

  render() {
    return (
      <Container fluid className="onboarding" style={{ backgroundColor: 'white', marginTop: `${-95}px` }}>
        <Card className="onboarding-card">
          {(() => {
            switch (this.state.onboardingActiveForm) {
            case 'recoveryPhraseCheck': return <SignUpRecoveryPhraseCheck mnemonicPhrase={this.state.mnemonicPhrase} handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            case 'recoveryPhraseSeed': return <SignUpRecoveryPhrase setMnemonicPhrase={this.setMnemonicPhrase} mnemonicPhrase={this.state.mnemonicPhrase} handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            case 'recovery': return <WalletRecovery handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            case 'signup': return <SignUp handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            case 'created': return <WalletCreated mnemonicPhrase={this.state.mnemonicPhrase} setLogInStatus={this.props.setLogInStatus} handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            case 'passwordrecovery': return <PasswordRecovery handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            case 'walletrecoverysuccess': return <WalletRecoverySuccess handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })} />;
            default: return (<SignIn
              setLogInStatus={this.props.setLogInStatus}
              handleItemClick={(e, { name }) => this.setState({ onboardingActiveForm: name })}
            />);
            }
          })()}
        </Card>
      </Container>
    );
  }
}
