import React from 'react';
import { Container } from 'semantic-ui-react';
import ChooseAccount from 'components/ChooseAccount';


export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="course">
        <Container textAlign="center">
          <ChooseAccount />
        </Container>
      </div>
    );
  }
}
