import React from 'react';
import { Container, Grid, Button, Card, Header, Divider, Item } from 'semantic-ui-react';

export default class Network extends React.Component {
  render() {
    /* eslint-disable global-require */
    const network = require('../../icons/nav_network.svg');
    const avatarPlaceholder = require('../../img/jj.jpg');
    /* eslint-enable global-require */

    return (
      <Container>
        <Header size="huge">
          <svg width="32" height="32" className="icon">
            <image href={network} x="0" y="0" width="100%" height="100%" />
          </svg>
          Network
        </Header>
        <Divider clearing />
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card fluid>
              <Card.Content>
                <Item.Group>
                  <Item>
                    <Item.Image size="tiny" src={avatarPlaceholder} />
                    <Item.Content>
                      <Item.Header as="a">Steve Sanders</Item.Header>
                      <Item.Meta>Friends of Elliot</Item.Meta>
                      <Item.Description>
                        Steve wants to add you to the group <strong>best friends</strong>
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">Approve</Button>
                  <Button basic color="red">Decline</Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card fluid>
              <Card.Content>
                <Item.Group>
                  <Item>
                    <Item.Image size="tiny" src={avatarPlaceholder} />
                    <Item.Content>
                      <Item.Header as="a">Steve Sanders</Item.Header>
                      <Item.Meta>Friends of Elliot</Item.Meta>
                      <Item.Description>
                        Steve wants to add you to the group <strong>best friends</strong>
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">Approve</Button>
                  <Button basic color="red">Decline</Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card fluid>
              <Card.Content>
                <Item.Group>
                  <Item>
                    <Item.Image size="tiny" src={avatarPlaceholder} />
                    <Item.Content>
                      <Item.Header as="a">Steve Sanders</Item.Header>
                      <Item.Meta>Friends of Elliot</Item.Meta>
                      <Item.Description>
                        Steve wants to add you to the group <strong>best friends</strong>
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">Approve</Button>
                  <Button basic color="red">Decline</Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card fluid>
              <Card.Content>
                <Item.Group>
                  <Item>
                    <Item.Image size="tiny" src={avatarPlaceholder} />
                    <Item.Content>
                      <Item.Header as="a">Steve Sanders</Item.Header>
                      <Item.Meta>Friends of Elliot</Item.Meta>
                      <Item.Description>
                        Steve wants to add you to the group <strong>best friends</strong>
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">Approve</Button>
                  <Button basic color="red">Decline</Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>

      </Container>
    );
  }
}
