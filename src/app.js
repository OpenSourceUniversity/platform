import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container, Sidebar, Responsive } from 'semantic-ui-react';
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
import MobileHeader from './components/MobileHeader';

class App extends React.Component {
  state = {
    visible: false,
  }

  componentDidMount() {
    store.dispatch(getIpfs());
    if (this.props.isLoggedIn) {
      store.dispatch(notificationsConnection());
      store.dispatch(messagesConnection());
      this.props.getDefaultValues();
    }
  }

  handleSlidebarClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    // /* eslint-disable global-require */
    // const logo = require('./icons/edu-logo.png');
    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|
    // IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //   return (
    //     <div style={{ height: '100hv' }}>
    //       <Dimmer style={{ paddingTop: '40%' }} active>
    //         <img alt="" src={logo} />
    //         <h1>
    //           We are sorry, but this version of platform doesn&#39;t support mobile devices
    //         </h1>
    //       </Dimmer>
    //     </div>
    //   );
    // }
    return (
      <div className="App">
        {this.props.isLoggedIn ?
          <div>
            <Header showSidebar={this.handleSlidebarClick} />
            <Responsive as="div" {...Responsive.onlyComputer} style={{ height: `${this.props.secondaryNav ? 165 : 77}px` }} />
            <Responsive as="div" {...Responsive.onlyTablet} style={{ height: '77px' }} />
            <Responsive as="div" {...Responsive.onlyMobile} style={{ height: '77px' }} />
          </div> :
          null
        }
        <Sidebar.Pushable as="div">
          <Responsive
            as={MobileHeader}
            showSidebar={this.handleSlidebarClick}
            onHideFunc={this.handleSidebarHide}
            {...Responsive.onlyTablet}
            visible={this.state.visible}
          />
          <Responsive
            as={MobileHeader}
            showSidebar={this.handleSlidebarClick}
            onHideFunc={this.handleSidebarHide}
            {...Responsive.onlyMobile}
            visible={this.state.visible}
          />
          <Sidebar.Pusher dimmed={this.state.visible}>
            <div id="Main">
              <Main />
            </div>
            {this.props.isLoggedIn ?
              <Container className="footer" textAlign="center">
                Wallet Address: {this.props.address}
              </Container> :
              null
            }
            <WalletUnlocker />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
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
