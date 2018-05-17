import React from 'react';
import { Step, Container, Icon } from 'semantic-ui-react';
import AcademiaSettings from 'components/AcademiaSettings';
import ChooseAccount from 'components/ChooseAccount';


export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.props.createAccountNav();
  }

  render() {
    return (
      <div className="course">
        <Container textAlign="center">
          {(() => {
            switch (this.props.createAccountActiveItem) {
            case 'info': return <AcademiaSettings />;
            case 'payment': return null;
            case 'deposit': return null;
            default: return <ChooseAccount />;
            }
          })()}
        </Container>
      </div>
    );
  }
}
