import React from 'react';
import { Button, List, Header, Divider, Label, Segment, Grid, Menu } from 'semantic-ui-react';

export default class Course extends React.Component {
	state = { activeItem: 'about' }
	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
  	const { activeItem } = this.state
  	return (
			<div className ='cource'>
				<Header>
					Header text
				</Header>
				<Grid>
					<Grid.Column width={11}>
						<Segment>
							<span>
								<Icon name='plus' />
								<Icon name='share alternate' />
							</span>
							<Header>
								Reviews
							</Header>
							<span>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et egestas leo. Aliquam ultricies libero orci, quis malesuada massa posuere quis. Mauris eget ullamcorper elit, et faucibus sem. Aliquam maximus.
							</span>
							<Header>
								Skills
							</Header>
							<Label.Group size='medium'>
						    <Label>Fun</Label>
						    <Label>Happy</Label>
						    <Label>Smart</Label>
						    <Label>Witty</Label>
						  </Label.Group>
						  <Label.Group circular>
					      <Label as='a'>11</Label>
					      <Label as='a'>22</Label>
					      <Label as='a'>33</Label>
					    </Label.Group>
					    <span>
					    	<span>
					    		12,400
					    	</span>
					    	students interested
					    </span>
					    <Divider hidden />
					    <Grid container>
					    	<Grid.Row>
					    		<Grid.Column width={4}>
					    			<span>
					    				Price
					    			</span>
					    			<span>
					    				1000 EDU
					    			</span>
					    		</Grid.Column>
					    		<Grid.Column width={6}>
					    			<Button color='green'>BUY COURSE</Button>
					    		</Grid.Column>
					    		<Grid.Column width={6}>
					    			Reviews (<span>1923</span> ratings) <br>
					    			<Icon name='star' />
					    			<Icon name='star' />
					    			<Icon name='star' />
					    			<Icon name='star half full' />
					    			<Icon name='empty star' />
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
								Provider
							</Header>
							<Divider hidden />
								Some img
							<Divider clearing />
							<Header>
								Course dates
							</Header>
							<Icon name='calendar' />
							<span>
								dates
							</span>
							<Divider clearing />
							<Header>
								Course duration
							</Header>
							<Icon name='clock' />
							<span>
								time
							</span>
							<Divider clearing />
							<Header>
								Course fee
							</Header>
							<Icon name='rub' />
							<span>
								curr
							</span>
							<Divider clearing />
							<Header>
								Tutor
							</Header>
							<Icon name='user outline' />
							<span>
								text
							</span>
							<Divider clearing />
							<Header>
								Language
							</Header>
							<Icon name='world' />
							<span>
								dates
							</span>
							<Divider clearing />
							<Header>
								Level
							</Header>
							<Icon name='signal' />
							<span>
								dates
							</span>
							<Divider clearing />
							<Header>
								Course code
							</Header>
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