import React from 'react';
import { Table, Icon, Button, Modal, Header } from 'semantic-ui-react';


export default class TransactionHistoryItem extends React.Component {
  toJsDate(pythonDateStr) {
    const jsDateStr = `${pythonDateStr.substr(0, 10)} ${pythonDateStr.substr(11, 8)}`;
    let jsDateTime = Date.parse(jsDateStr);
    const nowDateTime = Date.now();
    const timeZoneOffset = new Date(nowDateTime).getTimezoneOffset() * 60000;
    jsDateTime -= timeZoneOffset;
    return new Date(jsDateTime).toString();
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          { this.props.historyDetails.type === 1 ?
            (<Icon name="arrow up" />) :
            (<Icon name="arrow down" />)
          }
        </Table.Cell>
        <Table.Cell>{ this.props.historyDetails.type === 1 ? 'Deposit' : 'Withdraw' }</Table.Cell>
        <Table.Cell>{ this.props.historyDetails.value }</Table.Cell>
        <Table.Cell>{ this.props.historyDetails.currency.toUpperCase() }</Table.Cell>
        <Table.Cell textAlign="right">{ this.toJsDate(this.props.historyDetails.date) }</Table.Cell>
        <Table.Cell textAlign="center">
          <Modal
            className="modalFix"
            style={{ display: 'flex!important', textAlign: 'center', marginTop: 0 }}
            trigger={<Button size="tiny" icon="unordered list" />}
            closeIcon
          >
            <Modal.Content style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
              <Modal.Header style={{ marginBottom: '1em' }}>
                <Header>
                  Transaction Details
                </Header>
              </Modal.Header>
              <Modal.Description>
                <Header size="small" style={{ margin: 0 }}>
                  Type:
                </Header>
                <p style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }} >{ this.props.historyDetails.type }</p>
                <Header size="small" style={{ margin: 0 }}>
                  Currency:
                </Header>
                <p style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }} >{ this.props.historyDetails.currency.toUpperCase() } </p>
                <Header size="small" style={{ margin: 0 }}>
                  Value:
                </Header>
                <p style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }} >{ this.props.historyDetails.value } </p>
                <Header size="small" style={{ margin: 0 }}>
                  Date:
                </Header>
                <p style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }} >{ this.toJsDate(this.props.historyDetails.date) } </p>
                <Header size="small" style={{ margin: 0 }}>
                  From:
                </Header>
                <p style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }} >{ this.props.historyDetails.sender } </p>
                <Header size="small" style={{ margin: 0 }}>
                  To:
                </Header>
                <p style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }} >{ this.props.historyDetails.receiver } </p>
                <Header size="small" style={{ margin: 0 }}>
                  TX:
                </Header>
                <p
                  style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
                >
                  <a
                    target="blank"
                    href={`https://etherscan.io/tx/${this.props.historyDetails.tx_hash}`}
                  >
                    { this.props.historyDetails.tx_hash }
                  </a>
                </p>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Table.Cell>
      </Table.Row>
    );
  }
}
