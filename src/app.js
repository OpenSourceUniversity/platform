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
  constructor(props) {
    super(props);
    this.createAccountNav = this.createAccountNav.bind(this);
    this.academyProfilePic = 'https://pp.userapi.com/c639323/v639323551/14808/qQwJ-ReMGrA.jpg';
    this.learnerProfilePic = 'https://media.licdn.com/dms/image/C4D03AQGc-oNYLYVPVA/profile-displayphoto-shrink_800_800/0?e=1530021600&v=beta&t=STurHYsfGE6n-UIt9bRIDkUsgb0uhNKM0SgFTEmRJ5Y';
    this.businessProfilePic = 'https://pp.userapi.com/c834300/v834300467/28514/Lto-k9DQDto.jpg';
    this.state = {
      isLogged: true, createAccountActiveSlide: 'profile', activeAccount: 'Learner', secondaryNav: null, profilePic: this.learnerProfilePic,
    };
  }

  setActiveAccount = (e, { name }) => {
    this.setState({ activeAccount: name });
    console.log(name);
    switch(name){
      case 'Academy': this.setState({ profilePic: this.academyProfilePic }); break;
      case 'Business': this.setState({ profilePic: this.businessProfilePic }); break;
      default: this.setState({ profilePic: this.learnerProfilePic });
    }
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

  createAccountNav() {
    this.setState({ secondaryNav: 'createAccount' });
  }


  render() {
    const { isLogged, createAccountActiveSlide, activeAccount, profilePic } = this.state;
    return (
      <div className="App">
        <Header
          isLogged={isLogged}
          createAccountActiveItem={createAccountActiveSlide}
          createAccountActiveItemFunc={this.setCreateAccountActiveItem}
          setSecondaryNav={this.setSecondaryNav}
          secondaryNav={this.state.secondaryNav}
          setLogInStatus={this.setLogInStatus}
          profilePic={profilePic}
        />
        <div style={{ height: `${170}px` }} />
        <div id="Main">
          <Main
            activeAccount={activeAccount}
            setActiveAccount={this.setActiveAccount}
            setCreateAccountActiveItem={this.setCreateAccountActiveItem}
            createAccountActiveItem={createAccountActiveSlide}
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
