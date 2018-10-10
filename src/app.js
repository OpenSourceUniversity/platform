import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container, Dimmer } from 'semantic-ui-react';
import WalletUnlocker from 'components/WalletUnlocker';
import React from 'react';
import getDefaultValues from './util/profiles/getDefaultValues';
import getIpfs from './util/ipfs/getIpfs';
import notificationsConnection from './util/notification/notificationsConnection';
import messagesConnection from './util/messaging/messagesConnection';
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
      store.dispatch(messagesConnection());
      this.props.getDefaultValues();
    }
  }
  render() {
    /* eslint-disable global-require */
    const logo = require('./icons/edu-logo.png');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return (
        <div style={{ height: '100hv' }}>
          <Dimmer style={{ paddingTop: '40%' }} active>
            <img alt="" src={logo} />
            <h1>
              We are sorry, but this version of platform doesn&#39;t support mobile devices
            </h1>
          </Dimmer>
        </div>
      );
    }
    return (
      <div className="App">
        {this.props.isLoggedIn ?
          <div>
            <Header />
            <div style={{ height: `${this.props.secondaryNav ? 165 : 77}px` }} />
          </div> :
          null
        }
        <div id="Main">
          <Main />
        </div>
        {this.props.isLoggedIn ?
          <Container className="footer" textAlign="center">
            Account: {this.props.address}
          </Container> :
          null
        }

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
