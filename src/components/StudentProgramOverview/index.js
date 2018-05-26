import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon } from 'semantic-ui-react';


export default class ProgramOverview extends React.Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion fluid styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name="dropdown" />
          { this.props.info.secondaryTitle }
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            { this.props.info.overview }
          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <Icon name="dropdown" />
          { this.props.info.objectiveTitle }
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            { this.props.info.objectiveText }
          </p>
        </Accordion.Content>
      </Accordion>
    );
  }
}
