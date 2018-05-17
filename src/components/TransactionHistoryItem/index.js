import React from 'react';
import { Table, Icon, Button, Modal } from 'semantic-ui-react';


export default class TransactionHistoryItem extends React.Component {
  render() {
    const sentFrom = this.props.historyDetails.sentFrom;
    const sentTo = this.props.historyDetails.sentTo;
    return (
      <Table.Row>
        <Table.Cell>
          { this.props.historyDetails.type === 'Deposit' ?
            (<Icon name="arrow up" />) :
            (<Icon name="arrow down" />)
          }
        </Table.Cell>
        <Table.Cell>{ this.props.historyDetails.type }</Table.Cell>
        <Table.Cell>{ this.props.historyDetails.value }</Table.Cell>
        <Table.Cell>{ this.props.historyDetails.currency }</Table.Cell>
        <Table.Cell textAlign="right">{ this.props.historyDetails.date }</Table.Cell>
        <Table.Cell textAlign="center">
          <Modal className="modalFix" style={{ display: 'flex' + '!important', textAlign: 'center' }} trigger={<Button size="tiny" icon="unordered list" />}>
            <Modal.Content>
              <Modal.Header>
                  Transaction Details
              </Modal.Header>
              <Modal.Description>
                <p>Type: { this.props.historyDetails.type }</p>
                <p>Currency: { this.props.historyDetails.currency } </p>
                <p>Value: { this.props.historyDetails.value } </p>
                <p>Date: { this.props.historyDetails.date } </p>
                <p>From: { this.props.historyDetails.sentFrom } </p>
                <p>To: { this.props.historyDetails.sentTo } </p>
                <p>TX: <a target="blank" href={`https://etherscan.io/tx/${this.props.historyDetails.transactionHash}`}>{ this.props.historyDetails.transactionHash }</a></p>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Table.Cell>
      </Table.Row>
    );
  }
}
