import React from 'react';
import { Button, List, Header, Divider, Label, Segment, Grid, Menu, Icon, Card } from 'semantic-ui-react';
import JobItem from 'components/JobItem';

export default class Job extends React.Component {

	renderJobs() {
	  const jobs = [
	    { title: 'Python Development', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
	    { title: 'Scrum Master', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
	    { title: 'Machine Learning', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
	    { title: 'Solidity Development', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah'},
	    { title: 'Unit Testing', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
	    { title: 'Computer Vision', level: 'Beginer', location: 'UK', duration: '4 weeks', rating: '4.5', description: 'blahblahblah' },
	  ];
	  return jobs.map((job, index) => (
	    <Grid.Column
	      computer={8}
	      largeScreen={8}
	      widescreen={8}
	      tablet={8}
	      mobile={16}
	      key={index}
	    >
	      <JobItem job={job} key={index} />
	    </Grid.Column>));
	}

	state = { activeItem: 'desc' }

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
  	let profile = require('../../icons/account_profile.svg');

  	const { activeItem } = this.state
  	return (
			<div className ='course'>
				<Grid>
					<Grid.Column width={11}>
						<Segment>
							<div>
								<Header>
									Job title
									<span className='label-status'> New </span>
								</Header>
								<span>
									Posted by IO Era <Icon name='point' /> Sofia, Bulgaria <Icon name='dollar' /> 1000 BGN
								</span>
								<Header>
								 	Overview
								</Header>
								<span>
									blah blah blah
								</span>
								<Header>
									Skills
								</Header>
									<Menu pointing secondary>
					          <Menu.Item name='desc' active={activeItem === 'desc'} onClick={this.handleItemClick}>
					          	Job Descriptions
					          </Menu.Item>
					          <Menu.Item name='resp' active={activeItem === 'resp'} onClick={this.handleItemClick}>
					          	Responsobilities
					          </Menu.Item>
					          <Menu.Item name='qual' active={activeItem === 'qual'} onClick={this.handleItemClick}>
					          	Qualifications
					          </Menu.Item>
					          <Menu.Item name='offer' active={activeItem === 'offer'} onClick={this.handleItemClick}>
					          	We offer
					          </Menu.Item>
					        </Menu>
					        <span>
					        	text
					        </span>
					        <Menu pointing secondary>
					          <Menu.Item name='desc' active={activeItem === 'desc'} onClick={this.handleItemClick}>
					          	Responsobilities
					          </Menu.Item>
					        </Menu>
					        <span>
					        	text
					        </span>
					        <Menu pointing secondary>
					          <Menu.Item name='desc' active={activeItem === 'desc'} onClick={this.handleItemClick}>
					          	Qualifications
					          </Menu.Item>
					        </Menu>
						    </div>
						    <Button> Back to search research </Button> 
						    <Button> Priveus </Button> 
						    <Button> Next </Button>
							</Segment>
						</Grid.Column>
						<Grid.Column width={5}>
						<Segment textAlign='center'>
							<img src={profile} />
							<br/>
							<span> IO ERA </span>
							  <Icon name='star' /> 
							  <Icon name='star' /> 
							  <Icon name='star' /> 
							  <Icon name='star' /> 
							  <Icon name='star' /> 
							  5.0/5.0
							<br/>
							<span> Location: </span> <span> Sofia, Bulgaria </span>
							<br/>
							<span> Industry: </span> <span> IT & Design </span>
							<Divider clearing />
							<span> Job title: </span> <span> UI/UX Designer </span>
							<br/>
							<span> Posted: </span> <span> 20.03.2017 </span>
							<br/>
							<span> Closes: </span> <span> 21.09.2018 </span>
							<br/>
							<span> Experience level: </span> <span> 1+ years </span>
							<br/>
							<span> Hours: </span> <span> Full-time </span>
							<br/>
							<span> Job type: </span> <span> Permanent contract </span>
							<br/>
							<span> Language: </span> <span> English, Bulgarian </span>
							<br/>
							<Button color='green'>APPLY NOW</Button>
						</Segment>
						<Segment>
							<Header>
								Similar positions
							</Header>
							{this.renderJobs()}
						</Segment>
					</Grid.Column>
				</Grid>
	    </div>
  	);
  }
}