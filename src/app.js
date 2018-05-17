import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import './util/web3/getWeb3';
import './util/ipfs/getIpfs';

// Layouts
import Header from './components/Header';
import Main from './components/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.createAccountNav = this.createAccountNav.bind(this);
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  state = {
    isLogged: true, createAccountActiveSlide: 'profile', activeAccount: 'Learner', secondaryNav: this.isCreateAccount,
  }

  setActiveAccount = (e, { name }) => {
    this.setState({ activeAccount: name });
  }

  setLogInStatus = (e, { name }) => {
    this.setState({ isLogged: name === 'login' });
  }

  setCreateAccountActiveItem = (e, { name }) => {
    this.setState({ createAccountActiveSlide: name });
  }

  setSecondaryNav = (e, { name }) => {
    this.setState({ secondaryNav: name });
  }

  createAccountNav(e) {
    this.setState({ secondaryNav: 'createAccount' });
  }


  render() {
    const { isLogged, createAccountActiveSlide, activeAccount } = this.state;
    return (
      <div className="App">
        <Header
          isLogged={this.state.isLogged}
          createAccountActiveItem={this.state.createAccountActiveSlide}
          createAccountActiveItemFunc={this.setCreateAccountActiveItem}
          setSecondaryNav={this.setSecondaryNav}
          secondaryNav={this.state.secondaryNav}
          setLogInStatus={this.setLogInStatus}
        />
        <div style={{ height: `${170}px` }} />
        <div id="Main">
          <Main
            activeAccount={this.state.activeAccount}
            setActiveAccount={this.setActiveAccount}
            setCreateAccountActiveItem={this.setCreateAccountActiveItem}
            createAccountActiveItem={this.state.createAccountActiveSlide}
            createAccountNav={this.createAccountNav}
            setLogInStatus={this.setLogInStatus}
          />
        </div>

        <Container className="footer" textAlign="center">
          Coinbase: {this.props.coinbase}
        </Container>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    coinbase: state.web3.coinbase,
  };
}


export default withRouter(connect(mapStateToProps)(App));
