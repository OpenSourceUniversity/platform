import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from 'semantic-ui-react';
import WalletUnlocker from 'components/WalletUnlocker';
import React from 'react';
import getDefaultValues from './util/profiles/getDefaultValues';
import './util/web3/getWeb3';
// import './util/ipfs/getIpfs';

// Layouts
import Header from './components/Header';
import Main from './components/Main';

class App extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getDefaultValues();
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div style={{ height: `${170}px` }} />
        <div id="Main">
          <Main />
        </div>
        <Container className="footer" textAlign="center">
          Coinbase: {this.props.address}
        </Container>

        <WalletUnlocker />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    address: state.auth.address,
    isLoggedIn: state.auth.isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDefaultValues() {
      dispatch(getDefaultValues());
    },
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
