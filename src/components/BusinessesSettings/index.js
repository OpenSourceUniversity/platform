import React from 'react';
import { connect } from 'react-redux';
import { Input, Form, Button, Header, Divider, Message } from 'semantic-ui-react';
import Countries from '../../data/countriesList';
import saveSettings from '../../util/accountSettings/saveSettings';

class BusinessSettings extends React.Component {
  saveSettings(event, component) {
    event.preventDefault();
    const profileData = {
      company_name: event.target.elements.company_name.value,
      company_website: event.target.elements.company_website.value,
      company_email: event.target.elements.company_email.value,
      company_country: event.target.elements[3].parentElement.children[1].textContent,
      company_about: event.target.elements.company_about.value,
      company_logo: event.target.elements.company_logo.value,
    };
    component.props.saveSettings(profileData, 'business');
  }

  render() {
    return (
      <div className="business-settings">
        {this.props.isSaved && this.state.visible ? (
          <Message
            positive
            header="Successfully saved!"
            onDismiss={this.handleDismiss}
          />
        ) : null}
        {this.props.error ? (
          <Message
            negative
            header="Oops, something went wrong!"
            content={this.props.error}
          />
        ) : null}
        <Header>
          Business Information
        </Header>
        <span>
          Fill in the following details to register your business
        </span>
        <Divider clearing />
        <Form onSubmit={(event) => { this.saveSettings(event, this); }}>
          <Form.Field
            label="Company name"
            control="input"
            name="company_name"
            placeholder="Your company name"
            value={this.props.accounts.company_name ? this.props.accounts.company_name : ''}
          />
          <Form.Field
            label="Official website"
            control="input"
            placeholder="Your website without http://"
            name="company_website"
            value={this.props.accounts.company_website ? this.props.accounts.company_website : ''}
          />
          <Form.Field name="company_email" label="Email" value={this.props.accounts.company_email ? this.props.accounts.company_email : ''} control="input" type="email" placeholder="Your email" />
          <Form.Dropdown id="Country" name="company_country" placeholder="Select Country" label="Country" value={this.props.accounts.company_country ? this.props.accounts.company_country : this.value} fluid search selection options={Countries.Countries} />
          <Form.TextArea name="company_about" label="About" value={this.props.accounts.company_about ? this.props.accounts.company_about : ''} placeholder="Tell us more about your company..." />
          <Form.Field label="Upload logo" control="file">
            <Input
              id="file"
              type="file"
              name="company_logo"
              placeholder="Company logo"
              className="input-file"
              color="orange"
              value={this.props.accounts.company_logo ? this.props.accounts.company_logo : ''}
            />
          </Form.Field>
          <Divider clearing />
          <Button className="save-button" type="submit" primary>Save Business Settings</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts.accounts,
    isSaved: state.accounts.isSaved,
    error: state.accounts.error,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    saveSettings(profileData, account) {
      dispatch(saveSettings(profileData, account));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSettings);
