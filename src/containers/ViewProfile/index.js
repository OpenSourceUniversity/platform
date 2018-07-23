import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import LearnerProfile from 'components/ViewLearnerProfile';
import AcademyProfile from 'components/ViewAcademyProfile';
import BusinessProfile from 'components/ViewBusinessProfile';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';

class ViewProfile extends React.Component {
  componentDidMount() {
    this.props.setSecondaryNav('account');
  }

  render() {
    return (
      <Container>
        {(() => {
          switch (this.props.match.params.type) {
          case 'academy': return <AcademyProfile eth_address={this.props.match.params.eth_address} />;
          case 'business': return <BusinessProfile eth_address={this.props.match.params.eth_address} />;
          default: return <LearnerProfile eth_address={this.props.match.params.eth_address} />;
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
