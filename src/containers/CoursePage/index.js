import React from 'react';
import { Button, List, Header, Divider, Label, Segment, Container } from 'semantic-ui-react';
import Course from 'components/Course';

export default class CoursePage extends React.Component {
  render() {
  	return (
			<div className ='cource'>
				<Container>
					<Course />
				</Container>
	    </div>
  	);
  }
}