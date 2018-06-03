import React from 'react';
import { Header, Button, Modal, Icon, Input } from 'semantic-ui-react';
import WalletSigner from 'components/WalletSigner';

export default class WalletUnlocker extends React.Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })


  render() {
    return (
      <Modal trigger={<WalletSigner buttonCaption={this.props.btnName} onClick={this.handleOpen} />} open={this.state.modalOpen} onClose={this.handleClose} basic size="small">
        <div align="center">
          <Header icon="unlock" content={this.props.btnName} inverted />
          <Modal.Content>
            <Input label="Passphrase" placeholder="enter your passphrase..." type="password" id="password" />
          </Modal.Content>
          <br />
          <Modal.Actions>
            <Button color="green" onClick={this.handleClose} inverted>
              <Icon name="checkmark" /> Yes
            </Button>
            <Button basic color="red" onClick={this.handleClose} inverted>
              <Icon name="cancel" /> No
            </Button>
          </Modal.Actions>
        </div>
      </Modal>

    );
  }
}
