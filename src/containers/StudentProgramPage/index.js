import React from 'react';
import { Container } from 'semantic-ui-react';
import StudentProgram from 'components/StudentProgram';

export default class StudentProgramPage extends React.Component {
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
