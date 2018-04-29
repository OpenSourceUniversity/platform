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

  isLogged = true;

  state = {isLogged: this.isLogged, createAccountActiveSlide: 'profile', activeAccount: 'Learner'}

  setActiveAccount = (e, { name }) => {
      this.setState({ activeAccount: name });
  }


  setCreateAccountActiveItem = (e, { name }) => {
      this.setState({ createAccountActiveSlide: name });
  }


  render() {
    const { isLogged, createAccountActiveSlide, activeAccount } = this.state
    return (
      <div className="App">
        <Header 
          isLogged={this.isLogged} 
          createAccountActiveItem={this.state.createAccountActiveSlide}
          createAccountActiveItemFunc={this.setCreateAccountActiveItem}
        />
        <div style={{height: 170 + 'px'}} />
        <div id="Main">
          <Main 
            activeAccount={this.state.activeAccount} 
            setActiveAccount={this.setActiveAccount} 
            setCreateAccountActiveItem={this.setCreateAccountActiveItem}
            createAccountActiveItem={this.state.createAccountActiveSlide}
            createAccountActiveItemFunc={this.createAccountActiveItem}
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
