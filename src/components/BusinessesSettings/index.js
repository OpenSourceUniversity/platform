import React from 'react';
import { Input, Form, Button, Header, Divider, Segment } from 'semantic-ui-react';

export default class BusinessSettings extends React.Component {
  state = {}
  // handleInputChange = (e, { value }) => this.setState({ value })
  render() {
    return (
      <div className="business-settings">
        <Segment padded="very">
          <Header>
            Business Additional Information
          </Header>
          <span>
            Fill in the following details to register your business
          </span>
          <Divider clearing />
          <Form>
            <Form.Field
              label="Company name"
              control="input"
            />
            <Form.Field
              label="Official website"
              control="input"
            />
            <Form.Field label="Upload logo" control="file">
              <Input
                id="file"
                type="file"
                name="file"
                placeholder="business logo"
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
