import React from 'react';
import { Button, List, Header, Divider, Label, Segment, Container } from 'semantic-ui-react';
import Course from 'components/StudentProgram';

export default class StudentProgramPage extends React.Component {
  render() {
    return (
      <div className ='program'>
        <Container>
          <Course />
        </Container>
      </div>
    );
  }
}
