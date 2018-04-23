import React from 'react';
import { Button, List, Header, Divider, Label, Segment, Grid, Menu, Icon } from 'semantic-ui-react';

export default class Job extends React.Component {
	state = { activeItem: 'about' }
	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
  	const { activeItem } = this.state
  	return (
			<div className ='course'>
				<Header>
					Job title
				</Header>
				<Grid>
					<Grid.Column width={11}>
						<Segment>
							<span>
								<Icon name='plus' />
								<Icon name='share alternate' />
							</span>
							<Header>
								Job details
							</Header>
							<span>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et egestas leo. Aliquam ultricies libero orci, quis malesuada massa posuere quis. Mauris eget ullamcorper elit, et faucibus sem. Aliquam maximus.
							</span>
							<Header>
								Skills
							</Header>
							<Label.Group size='medium'>
						    <Label>Python</Label>
						    <Label>IT</Label>
						    <Label>Killing Dragons</Label>
						    <Label>Senior Magic</Label>
						  </Label.Group>
					    <Divider hidden />
					    <Grid>
					    	<Grid.Row>
					    		<Grid.Column width={4}>
					    			<span>
					    				Salary
					    			</span>
					    			<br/>
					    			<span>
					    				1000 $
					    			</span>
					    		</Grid.Column>
					    		<Grid.Column width={6}>
					    			<Button color='green'>CANDIDATE</Button>
					    		</Grid.Column>
					    		<Grid.Column width={6}>
					    			Company Reviews (<span>1923</span> ratings) <br/>
					    			<Icon name='star' color='yellow' />
					    			<Icon name='star' color='yellow' />
					    			<Icon name='star' color='yellow' />
					    			<Icon name='star half full' color='yellow' />
					    			<Icon name='empty star' color='yellow' />
					    			<span>3.5</span>/5
					    		</Grid.Column>
					    	</Grid.Row>
					    </Grid>
					    <Divider hidden />
					    <Menu pointing secondary>
		            <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
		            <Menu.Item name='entry requirements' active={activeItem === 'entry requirements'} onClick={this.handleItemClick} />
		            <Menu.Item name='reviews' active={activeItem === 'reviews'} onClick={this.handleItemClick} />
		          </Menu>
		          <div>
		          	<Header>
		          		Header
		          	</Header>
		          	<span>
		          		text
		          	</span>
		          	<Header>
		          		Header
		          	</Header>
		          	<span>
		          		text
		          	</span>
		          	<Header>
		          		Header
		          	</Header>
		          	<span>
		          		text
		          	</span>
		          </div>
						</Segment>
					</Grid.Column>
					<Grid.Column width={5}>
						<Segment>
							<Header>
								Ref. Number
							</Header>
							<Divider hidden />
							<Icon name='address card outline' />
								13513
							<Divider clearing />
							<Header>
								Position
							</Header>
							<Icon name='find' />
							<span>
								Position name
							</span>
							<Divider clearing />
							<Header>
								Departament/Division
							</Header>
							<Icon name='lab' />
							<span>
								Departament name
							</span>
							<Divider clearing />
							<Header>
								Job Type/Departament &#42;&#42;
							</Header>
							<Icon name='industry' />
							<span>
								??? IDK what iis this and why we have it twice
							</span>
							<Divider clearing />
							<Header>
								Location
							</Header>
							<Icon name='world' />
							<span>
								location
							</span>
							<Divider clearing />
							<Header>
								Posting Date
							</Header>
							<Icon name='add to calendar' />
							<span>
								dates
							</span>
							<Divider clearing />
							<Header>
								Closing Date &#42;
							</Header>
							<Icon name='calendar times' />
							<span>
								dates
							</span>
						</Segment>
					</Grid.Column>
				</Grid>
	    </div>
  	);
  }
}