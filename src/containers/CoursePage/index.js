import React from 'react';
import { Container } from 'semantic-ui-react';
import Course from 'components/Course';

export default class CoursePage extends React.Component {
  render() {
    return (
      <div className="course">
        <Container>
          <Course id={this.props.match.params.id} />
        </Container>
      </div>
    );
  }
}
