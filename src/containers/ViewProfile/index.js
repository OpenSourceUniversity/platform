import React from 'react';
import { connect } from 'react-redux';
import { Container, Divider } from 'semantic-ui-react';
import ViewLearnerProfile from 'components/ViewLearnerProfile';
import ViewAcademyProfile from 'components/ViewAcademyProfile';
import ViewBusinessProfile from 'components/ViewBusinessProfile';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';
import { enablePublicPageView, disablePublicPageView } from '../../util/auth/changePublicPageView';

class ViewProfile extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.setSecondaryNav('account');
    } else {
      this.props.enablePublicPageView();
    }
    document.title = 'View Profile';
  }

  componentWillUnmount() {
    this.props.disablePublicPageView();
  }

  render() {
    return (
      <Container>
        <Divider hidden />
        {(() => {
          switch (this.props.match.params.type) {
          case 'academy': return <ViewAcademyProfile eth_address={this.props.match.params.eth_address} />;
          case 'business': return <ViewBusinessProfile eth_address={this.props.match.params.eth_address} />;
          case 'learner': return <ViewLearnerProfile eth_address={this.props.match.params.eth_address} />;
          default: return null;
          }
        })()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAccount: state.activeAccount.activeAccount,
    isLoggedIn: state.auth.isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
    enablePublicPageView() {
      dispatch(enablePublicPageView());
    },
    disablePublicPageView() {
      dispatch(disablePublicPageView());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
