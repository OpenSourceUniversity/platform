import React from 'react';
import { connect } from 'react-redux';
import { Container, Breadcrumb, Divider } from 'semantic-ui-react';
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
        <Breadcrumb>
          <Breadcrumb.Section href="/#/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section
            href={
              (() => {
                switch (this.props.match.params.type) {
                case 'academy': return '/#/academies';
                case 'business': return '/#/businesses';
                case 'learner': return '/#/learners';
                default: return null;
                }
              })()
            }
          >{
              (() => {
                switch (this.props.match.params.type) {
                case 'academy': return 'Academies';
                case 'business': return 'Businesses';
                case 'learner': return 'Learners';
                default: return null;
                }
              })()
            } List
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>View {
            (() => {
              switch (this.props.match.params.type) {
              case 'academy': return 'Academy';
              case 'business': return 'Business';
              case 'learner': return 'Learner';
              default: return null;
              }
            })()
          } Profile
          </Breadcrumb.Section>
        </Breadcrumb>
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
