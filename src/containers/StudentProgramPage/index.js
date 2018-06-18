import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import StudentProgram from 'components/StudentProgram';
import setSecondaryNav from '../../util/secondaryNav/setSecondaryNav';

class StudentProgramPage extends React.Component {
  componentDidMount() {
    this.props.setSecondaryNav('academia');
  }

  render() {
    return (
      <div className="program">
        <Container>
          <StudentProgram />
        </Container>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSecondaryNav(secondaryNav) {
      dispatch(setSecondaryNav(secondaryNav));
    },
  };
}


export default connect(mapDispatchToProps)(StudentProgramPage);
