import 'rc-slider/assets/index.css';
import React from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import { Header, Container } from 'semantic-ui-react';
import { changeGasPrice } from '../../containers/Deposit/actions';
import getGasPrice from './actions';


class GasPriceExtension extends React.Component {
  componentDidMount() {
    this.props.getGasPrice();
  }

  handleChange = (value) => {
    this.props.changeGasPrice(value);
  }

  render() {
    return (
      <Container>
        <Header>
          {this.props.activityText}
        </Header>
        Recomended Gas Price: {this.props.recomendedGasPrice} <br />
        Current gas price: {this.props.gasPrice} Gwei
        <Slider
          min={1}
          max={100}
          key={`recomendedGasPrice:${this.props.recomendedGasPrice || ''}`}
          defaultValue={parseInt(this.props.recomendedGasPrice, 10)}
          onChange={this.handleChange}
        />
        <br />
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    open: state.auth.walletUnlockerModalOpen,
    error: state.auth.walletUnlockerError,
    txError: state.verification.txError,
    recomendedGasPrice: state.withdraw.recomendedGasPrice,
    gasPrice: state.withdraw.gasPrice,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    changeGasPrice(gasPrice) {
      dispatch(changeGasPrice(gasPrice));
    },
    getGasPrice() {
      dispatch(getGasPrice());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(GasPriceExtension);
