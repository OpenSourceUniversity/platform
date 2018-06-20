import React from 'react';
import { Input, Form, Button, Header, Divider, Segment } from 'semantic-ui-react';

export default class AcademiaSettings extends React.Component {
  state = {}
  // handleInputChange = (e, { value }) => this.setState({ value })
  render() {
    return (
      <div className="academia-settings">
        <Segment padded="very">
          <Header>
            Academy Additional Information
          </Header>
          <span>
            Fill in the following details to register your educational institute
          </span>
          <Divider clearing />
          <Form>
            <Form.Field
              label="Authority name"
              control="input"
            />
            <Form.Field
              label="Authority website"
              control="input"
            />
            <Form.Field label="Upload authority logo" control="file">
              <Input
                id="file"
                type="file"
                name="file"
                placeholder="authority logo"
                // onChange={this.handleInputChange}
                className="input-file"
                color="orange"
              />
            </Form.Field>
            <Divider clearing />
            <Button className="save-button" type="submit" primary>Save</Button>
            <Button className="cancel-button" style={{ float: 'right' }}>Cancel</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}
