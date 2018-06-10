import React from 'react';
import { Button, Modal } from 'semantic-ui-react';


export default class CheckEDUBalance extends React.Component {
  render() {
    return (
      <Modal.Content>
        <Modal.Header>
          EDU Balance
        </Modal.Header>
        <Modal.Description>
          <p>Wallet: ........</p>
          <p>EDU Balance: ........... </p>
          <Button animated="fade">
            <Button.Content visible>Test platform</Button.Content>
            <Button.Content hidden>Buy EDU tokens</Button.Content>
          </Button>
        </Modal.Description>
      </Modal.Content>
    );
  }
}
