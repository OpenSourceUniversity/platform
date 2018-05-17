import React from 'react';
import { Button, List, Header, Divider, Label, Segment, Container, Image} from 'semantic-ui-react';
import StudentProgram from 'components/StudentProgram';

export default class StudentProgramPage extends React.Component {
  render() {
    return (
      <div className ='program'>
        <Container>
          <StudentProgram />
        </Container>
      </div>
    );
  }
}
