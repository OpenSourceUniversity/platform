import React from 'react';
import { Input, Form, Button, Radio, Checkbox, Header, Divider, Label, Segment } from 'semantic-ui-react';

export default class BusinessSettings extends React.Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })
  render() {
    return (
      <div className ='business-settings'>
        <Segment padded='very'>
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
            <Form.Field>
                <label>
                  Upload logo
                  <Input
                    id="file"
                    type="file"
                    name="file"
                    placeholder="business logo"
                    onChange={this.handleInputChange}
                    className='input-file'
                    color='orange'
                  />
                </label>
              </Form.Field>
            <Divider clearing />
            <Form.Group grouped>
              <Form.Field>
                  <Radio
                  label='Create Ethereum wallet and take care of my private key'
                  name='take-care'
                  value='this'
                  checked={this.state.value === 'this'}
                  onChange={this.handleChange}
                  color='orange'
                  />
              </Form.Field>
              <Form.Field>
                <Radio
                  label='I will use MetaMask and an existing Ethereum wallet'
                  name='my-wallet'
                  value='that'
                  checked={this.state.value === 'that'}
                  onChange={this.handleChange}
                  color='orange'
                />
              </Form.Field>
            </Form.Group>
            <Divider clearing />
            <span>
              Official email for verification of the listed company. Verification of the official website ownership will be handled via following email address.
            </span>
            <Divider hidden />
            <Form.Field
              label="Official email &#42;"
              control="input"
              type='email'
            />
            <Form.Field
              label="Password &#42;&#42;"
              control="input"
              type='password'
            />
            <Divider hidden />
            <span>
              &#42; Will be used to login and for all the updates from OS University
              <br/>
            </span>
            <span>
              &#42;&#42; It must contain at least 6 characters and must contain at least one capital letter, one small letter and one numeric character
            </span>
            <Divider clearing />
            <Form.Field inline>
              <Input
                type='checkbox'
              />
              <span>
                I agree with the <a href="#">Terms&Conditions</a> and the <a href="#">Whitepaper</a>
              </span>
            </Form.Field>
            <Divider clearing />
            <Button className='save-button' type="submit" primary>Send request</Button>
            <Button className='cancel-button' style={{float: 'right'}}>Cancel</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}
