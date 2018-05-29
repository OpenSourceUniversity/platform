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
    this.learnerProfilePic = 'http://img.rosbalt.ru/photobank/b/0/1/d/7vWgHh4P-580.jpg';
    this.businessProfilePic = 'https://pp.userapi.com/c834300/v834300467/28514/Lto-k9DQDto.jpg';
    this.state = {
      createAccountActiveSlide: 'profile',
      activeAccount: 'Learner',
      secondaryNav: null,
      profilePic: this.learnerProfilePic,
    };
  }

  setActiveAccount = (e, { name }) => {
    this.setState({ activeAccount: name });
    switch (name) {
    case 'Academy': this.setState({ profilePic: this.academyProfilePic }); break;
    case 'Business': this.setState({ profilePic: this.businessProfilePic }); break;
    default: this.setState({ profilePic: this.learnerProfilePic });
    }
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
    const { createAccountActiveSlide, activeAccount, profilePic } = this.state;
    return (
      <div className="App">
        <Header
          createAccountActiveItem={createAccountActiveSlide}
          createAccountActiveItemFunc={this.setCreateAccountActiveItem}
          setSecondaryNav={this.setSecondaryNav}
          secondaryNav={this.state.secondaryNav}
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
            academyProfilePic={this.academyProfilePic}
            learnerProfilePic={this.learnerProfilePic}
            businessProfilePic={this.businessProfilePic}
          />
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
