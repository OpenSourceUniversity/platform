import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { closeErrorModal } from '../../util/errorModal/actions';


class ErrorModal extends React.Component {
  handleClose() {
    this.props.closeErrorModal();
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={() => this.handleClose()} size="small" closeIcon>
        <Modal.Header>
          <Icon name="close" color="red" />
          Error!
        </Modal.Header>
        <Modal.Content>
          {this.props.errorMessage}
        </Modal.Content>
        <br />
        <Modal.Actions>
          <Button
            labelPosition="left"
            icon="cancel"
            onClick={() => this.handleClose()}
            content="Close"
          />
        </Modal.Actions>
      </Modal>

    );
  }
}


function mapStateToProps(state) {
  return {
    open: state.errorModal.open,
    errorMessage: state.errorModal.errorMessage,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    closeErrorModal() {
      dispatch(closeErrorModal());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
