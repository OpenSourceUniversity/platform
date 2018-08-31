import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import SocialNetwork from 'components/SocialNetwork';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';

class SocialNetworkPage extends React.Component {
  componentDidMount() {
    document.title = 'Social Network';
    switch (this.props.activeAccount) {
    case 'Academy': return this.props.setSecondaryNav('academia');
    case 'Business': return this.props.setSecondaryNav('business');
    default: return this.props.setSecondaryNav('learner');
    }
  }

  render() {
    return (
      <div className="">
        <Container>
          <SocialNetwork />
        </Container>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialNetworkPage);
