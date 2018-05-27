import React from 'react';
import { Container } from 'semantic-ui-react';
import LearnerProfile from 'components/LearnerProfile';
import AcademyProfile from 'components/AcademyProfile';
import BusinessProfile from 'components/BusinessProfile';

export default class ProfilePage extends React.Component {
  // learner

  setProfile() {
    switch (this.props.activeAccount) {
    case 'Academy': return {
      profile_src: this.props.academyProfilePic, name: 'Udacity', location: 'U.S.', short_desc: 'blah blah blah blah', learners: '9000 ppl', email: 'support@udacity.com', site: 'eu.udacity.com', full_desc: 'blah blah desc',
    };
    case 'Business': return {
      profile_src: this.props.businessProfilePic, name: 'Open Source University', location: 'Sofia, Bulgaria', short_desc: 'blah blah blah blah', employees: '100500 ppl', email: 'support@os.university', site: 'os.university', full_desc: 'blah blah desc',
    };
    default: return {
      profile_src: this.props.learnerProfilePic, name: 'Jordan Jambazov', position: 'Technology Lead in Open Source University', edu: 11, specialisation: 'Semantic UI', location: 'New York, NY', email: 'support@os.university', site: 'os.university', certificates: 15, courses: 30, skills: 128, reviews: 0, introduction: '“I am a non-accredited, overly logical psychologist, therapist, mechanic, diplomat, businessman, and Teacher working in an industry that is still defining itself each and every day."',
    };
    }
  }

    switcher = this.props.activeAccount;

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
