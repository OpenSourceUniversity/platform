import React from 'react';
import { connect } from 'react-redux';
import { Header, Button, Message, Modal, Icon, Input } from 'semantic-ui-react';
import { closeUnlocker, unlockWallet } from '../../util/auth/walletUnlocker';


class WalletUnlocker extends React.Component {
  handleClose() {
    this.props.closeUnlocker();
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={() => this.handleClose()} basic size="small">
        <Header icon="unlock" content={this.props.btnName} inverted />
        <Modal.Content>
          <Message error hidden={!this.props.error}>
            {this.props.error}
          </Message>
          <Input label="Passphrase" placeholder="enter your passphrase..." type="password" id="passphrase" />
        </Modal.Content>
        <br />
        <Modal.Actions>
          <Button
            color="green"
            onClick={() => this.props.unlockWallet(document.getElementById('passphrase').value)}
            inverted
          >
            <Icon name="checkmark" /> Yes
          </Button>
          <Button basic color="red" onClick={() => this.handleClose()} inverted>
            <Icon name="cancel" /> No
          </Button>
        </Modal.Actions>
      </Modal>

    );
  }
}


function mapStateToProps(state) {
  return {
    open: state.auth.walletUnlockerModalOpen,
    error: state.auth.walletUnlockerError,
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
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(WalletUnlocker);
