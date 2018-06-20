import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from 'semantic-ui-react';
import React from 'react';
import './util/web3/getWeb3';
import './util/ipfs/getIpfs';

// Layouts
import Header from './components/Header';
import Main from './components/Main';

class App extends React.Component {
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


export default withRouter(connect(mapStateToProps)(App));
