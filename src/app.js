import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from 'semantic-ui-react';
import WalletUnlocker from 'components/WalletUnlocker';
import React from 'react';
import getDefaultValues from './util/profiles/getDefaultValues';
import getIpfs from './util/ipfs/getIpfs';
import notificationsConnection from './util/notification/notificationsConnection';
import store from './store';
import './util/web3/getWeb3';

// Layouts
import Header from './components/Header';
import Main from './components/Main';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(getIpfs());
    if (this.props.isLoggedIn) {
      store.dispatch(notificationsConnection());
      this.props.getDefaultValues();
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div style={{ height: `${this.props.secondaryNav ? 142 : 100}px` }} />
        <div id="Main">
          <Main />
        </div>
        <Container className="footer" textAlign="center">
          Account: {this.props.address}
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
    secondaryNav: state.secondaryNav.secondaryNav,
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
