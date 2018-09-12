import React from 'react';
import { connect } from 'react-redux';
import { Button, Message, Modal, Icon, Input } from 'semantic-ui-react';
import { closeUnlocker, unlockWallet } from '../../util/auth/walletUnlocker';
import resetVerificationErrorMessages from '../../util/verification/resetVerificationErrorMessages';


class WalletUnlocker extends React.Component {
  handleClose() {
    this.props.closeUnlocker();
    this.props.resetVerificationErrorMessages();
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={() => this.handleClose()} size="small">
        <Modal.Header>
          <Icon name="unlock" />
          Enter passphrase to unlock your wallet
        </Modal.Header>
        <Modal.Content>
          <Message error hidden={!this.props.error}>
            {this.props.error}
          </Message>
          <Message error hidden={!this.props.txError}>
            {this.props.txError}
          </Message>
          <Input fluid label="Passphrase" placeholder="enter your passphrase..." type="password" id="passphrase" />
        </Modal.Content>
        <br />
        <Modal.Actions>
          <Button
            labelPosition="left"
            icon="cancel"
            onClick={() => this.handleClose()}
            content="Cancel"
          />
          <Button
            positive
            labelPosition="left"
            icon="checkmark"
            onClick={() => this.props.unlockWallet(document.getElementById('passphrase').value)}
            content="Confirm unlock"
          />
        </Modal.Actions>
      </Modal>

    );
  }
}


function mapStateToProps(state) {
  return {
    open: state.auth.walletUnlockerModalOpen,
    error: state.auth.walletUnlockerError,
    txError: state.verification.txError,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    closeUnlocker() {
      dispatch(closeUnlocker());
    },

    unlockWallet(passphrase) {
      dispatch(unlockWallet(passphrase));
    },
    resetVerificationErrorMessages() {
      dispatch(resetVerificationErrorMessages());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(WalletUnlocker);
