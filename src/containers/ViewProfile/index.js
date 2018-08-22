import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import ViewLearnerProfile from 'components/ViewLearnerProfile';
import ViewAcademyProfile from 'components/ViewAcademyProfile';
import ViewBusinessProfile from 'components/ViewBusinessProfile';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';

class ViewProfile extends React.Component {
  componentDidMount() {
    this.props.setSecondaryNav('account');
    document.title = 'View Profile';
  }

  render() {
    return (
      <Container>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
