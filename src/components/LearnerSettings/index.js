import React from 'react';
import { Form, Button, Header, Divider, Input, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Countries from '../../data/countriesList';
import saveSettings from '../../util/accountSettings/saveSettings';

class LearnerSettings extends React.Component {
  state = { visible: true }

  getCountry(obj) {
    const needle = this.props.accounts.learner_country;
    for (let i = 0; i < obj.length; i += 1) {
      if (obj[i].text === needle) {
        return obj[i].value;
      }
    }
    return null;
  }

  saveSettings(event, component) {
    event.preventDefault();
    const profileData = {
      first_name: event.target.elements.first_name.value,
      last_name: event.target.elements.last_name.value,
      learner_position: event.target.elements.learner_position.value,
      learner_specialisation: event.target.elements.learner_specialisation.value,
      learner_about: event.target.elements.learner_about.value,
      learner_email: event.target.elements.learner_email.value,
      phone_number: event.target.elements.phone_number.value,
      learner_site: event.target.elements.learner_site.value,
      learner_country: event.target.elements[8].parentElement.children[1].textContent === 'Select Country' ? null : event.target.elements[8].parentElement.children[1].textContent,
      learner_avatar: event.target.elements.learner_avatar.value,
    };
    component.props.saveSettings(profileData, 'learner');
  }

  render() {
    return (
      <div>
        {!this.props.learnerIsCreated ? (
          <Message
            warning
            header="Profile is not created yet!"
            content="You can't explore the platform with this active account, please, submit this form with yor information, or chose another setuped account."
          />
        ) : null}
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
          Personal Information
        </Header>
        <Divider clearing />
        <Form onSubmit={(event) => { this.saveSettings(event, this); }}>
          <Form.Group widths="equal">
            <Form.Field
              required
              name="first_name"
              label="First name"
              key={`first_name:${this.props.accounts.first_name || ''}`}
              defaultValue={this.props.accounts.first_name ? this.props.accounts.first_name : ''}
              control="input"
              placeholder="First name"
            />
            <Form.Field
              required
              name="last_name"
              label="Last name"
              key={`last_name:${this.props.accounts.last_name || ''}`}
              defaultValue={this.props.accounts.last_name ? this.props.accounts.last_name : ''}
              control="input"
              placeholder="Last name"
            />
          </Form.Group>
          <Form.Field
            name="learner_position"
            label="Current position"
            key={`learner_position:${this.props.accounts.learner_position || ''}`}
            defaultValue={this.props.accounts.learner_position ? this.props.accounts.learner_position : ''}
            control="input"
            placeholder="Your current position"
          />
          <Form.Field
            name="learner_specialisation"
            label="Your specialisation"
            key={`learner_specialisation:${this.props.accounts.learner_specialisation || ''}`}
            defaultValue={this.props.accounts.learner_specialisation ? this.props.accounts.learner_specialisation : ''}
            control="input"
            placeholder="Your specialisation"
          />
          <Form.TextArea
            name="learner_about"
            label="About"
            key={`learner_about:${this.props.accounts.learner_about || ''}`}
            defaultValue={this.props.accounts.learner_about ? this.props.accounts.learner_about : ''}
            placeholder="Tell us more about you..."
          />
          <Divider hidden />
          <Header>
            Contact Information
          </Header>
          <Divider clearing />
          <Form.Field
            required
            name="learner_email"
            label="Email"
            key={`learner_email:${this.props.accounts.learner_email || ''}`}
            defaultValue={this.props.accounts.learner_email ? this.props.accounts.learner_email : ''}
            control="input"
            type="email"
            placeholder="Your email"
          />
          <Form.Field
            name="phone_number"
            label="Phone number"
            key={`phone_number:${this.props.accounts.phone_number || ''}`}
            defaultValue={this.props.accounts.phone_number ? this.props.accounts.phone_number : ''}
            autoComplete="tel"
            control="input"
            type="tel"
            placeholder="Phone number"
          />
          <Form.Field
            name="learner_site"
            label="My site"
            key={`learner_site:${this.props.accounts.learner_site || ''}`}
            defaultValue={this.props.accounts.learner_site ? this.props.accounts.learner_site : ''}
            control="input"
            placeholder="Link to your site"
          />
          <Form.Dropdown
            id="Country"
            name="learner_country"
            key={`learner_country:${this.props.accounts.learner_country || ''}`}
            placeholder="Select Country"
            label="Country"
            defaultValue={this.getCountry(Countries.Countries)}
            fluid
            search
            selection
            options={Countries.Countries}
          />
          <Form.Field label="Upload your avatar" control="file">
            <Input
              id="file"
              type="file"
              name="learner_avatar"
              placeholder="My avatar"
              className="input-file"
              color="orange"
              defaultValue={this.props.accounts.learner_avatar ? this.props.accounts.learner_avatar : ''}
            />
          </Form.Field>
          <Divider hidden />
          <Button primary type="submit">Save Profile Settings</Button>
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
    learnerIsCreated: state.accounts.learnerIsCreated,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    saveSettings(profileData, account) {
      dispatch(saveSettings(profileData, account));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnerSettings);
