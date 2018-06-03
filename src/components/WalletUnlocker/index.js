import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Header, Button, Modal, Grid, Icon, Input, Segment, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux';
import WalletSigner from 'components/WalletSigner';
// import storeV3Wallet from '../../util/auth/storeV3Wallet';

export default class WalletUnlocker extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  state = { modalOpen: false }

  constructor(props) {
    super(props);
    this.initialization();
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleButtonClick = (e, { name }) => {
    let newPath;
    if (name === 'home') {
      newPath = '/';
    } else {
      newPath = `/${name}`;
    }
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath);
    }
  }

  initialization() {

  }

  render() {
    return (
      <Modal trigger={ <WalletSigner buttonCaption={ this.props.btnName } onClick={this.handleOpen} /> } open={this.state.modalOpen} onClose={this.handleClose} basic size='small'>
        <div align='center'>
          <Header icon='unlock' content='Sign' inverted />
            <Modal.Content>
              <Input label='Passphrase' placeholder='enter your passphrase...' type="password" id="password" />
            </Modal.Content>
            <br />
            <Modal.Actions>
              <Button color='green' onClick={this.handleClose} inverted>
                <Icon name='checkmark' /> Yes
              </Button>
              <Button basic color='red' onClick={this.handleClose} inverted>
                <Icon name='cancel' /> No
              </Button>
          </Modal.Actions>
        </div>
      </Modal>

    );
  }
}
