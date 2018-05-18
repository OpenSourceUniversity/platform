import React from 'react';
import { Container } from 'semantic-ui-react';
import Job from 'components/Job';

export default class JobPage extends React.Component {
  render() {
    return (
      <div className="job">
        <Container>
          <Job />
        </Container>
      </div>
    );
  }
}
