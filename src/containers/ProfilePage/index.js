import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import LearnerProfile from 'components/LearnerProfile';
import AcademyProfile from 'components/AcademyProfile';
import BusinessProfile from 'components/BusinessProfile';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.setSecondaryNav('account');
  }

  setProfile() {
    switch (this.props.activeAccount) {
    case 'Academy': return {
      profile_src: this.props.academyProfilePic, name: 'Academy name', location: 'Location', short_desc: 'Short description', employees: 'Number', email: 'email@mail.com', site: 'site.com', full_desc: 'Full descriprion', learners: 0,
    };
    case 'Business': return {
      profile_src: this.props.businessProfilePic, name: 'Business name', location: 'Location', short_desc: 'Short description', employees: 'Number', email: 'email@mail.com', site: 'site.com', full_desc: 'Full descriprion',
    };
    default: return {
      profile_src: this.props.learnerProfilePic, name: 'Name Surname', position: 'Position', edu: 11, specialisation: 'Specialisation', location: 'Location', email: 'email@mail.com', site: 'site.com', certificates: 15, courses: 30, skills: 128, reviews: 0, introduction: 'Coming in Beta',
    };
    }
  }

  render() {
    const profileInfo = this.setProfile();

    return (
      <Container>
        {(() => {
          switch (this.props.activeAccount) {
          case 'Academy': return <AcademyProfile academy={profileInfo} />;
          case 'Business': return <BusinessProfile company={profileInfo} />;
          default: return <LearnerProfile learner={profileInfo} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage));
