import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import LearnerProfile from 'components/LearnerProfile';
import AcademyProfile from 'components/AcademyProfile';
import BusinessProfile from 'components/BusinessProfile';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.setSecondaryNav('account');
    document.title = 'Profile | OSU DApp';
  }

  render() {
    return (
      <Container>
        {(() => {
          switch (this.props.activeAccount) {
          case 'Academy': return <AcademyProfile />;
          case 'Business': return <BusinessProfile />;
          default: return <LearnerProfile />;
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
