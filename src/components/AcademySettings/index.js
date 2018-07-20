import React from 'react';
import { connect } from 'react-redux';
import { Input, Form, Button, Header, Divider, Message } from 'semantic-ui-react';
import Countries from '../../data/countriesList';
import saveSettings from '../../util/accountSettings/saveSettings';

class AcademySettings extends React.Component {
  state = { visible: true }

  getCountry(obj) {
    const needle = this.props.accounts.academy_country;
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
      academy_name: event.target.elements.academy_name.value,
      academy_website: event.target.elements.academy_website.value,
      academy_email: event.target.elements.academy_email.value,
      academy_country: event.target.elements[3].parentElement.children[1].textContent === 'Select Country' ? null : event.target.elements[3].parentElement.children[1].textContent,
      academy_about: event.target.elements.academy_about.value,
      academy_logo: event.target.elements.academy_logo.value,
    };
    component.props.saveSettings(profileData, 'academy');
  }

  handleDismiss = () => {
    this.setState({ visible: false });

    setTimeout(() => {
      this.setState({ visible: true });
    }, 2000);
  }

  render() {
    return (
      <div className="academia-settings">
        {!this.props.accounts.academyIsCreated ? (
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
          Academy Information
        </Header>
        <span>
          Fill in the following details to register your educational institute
        </span>
        <Divider clearing />
        <Form onSubmit={(event) => { this.saveSettings(event, this); }}>
          <Form.Field
            required
            label="Academy name"
            control="input"
            name="academy_name"
            placeholder="Your academy name"
            key={`academy_name:${this.props.accounts.academy_name || ''}`}
            defaultValue={this.props.accounts.academy_name ? this.props.accounts.academy_name : ''}
          />
          <Form.Field
            required
            label="Academy website"
            control="input"
            name="academy_website"
            placeholder="Your academy website"
            key={`academy_website:${this.props.accounts.academy_website || ''}`}
            defaultValue={this.props.accounts.academy_website ? this.props.accounts.academy_website : ''}
          />
          <Form.Field
            required
            name="academy_email"
            label="Email"
            key={`academy_email:${this.props.accounts.academy_email || ''}`}
            defaultValue={this.props.accounts.academy_email ? this.props.accounts.academy_email : ''}
            control="input"
            type="email"
            placeholder="Your email"
          />
          <Form.Dropdown
            id="Country"
            name="academy_country"
            key={`academy_country:${this.props.accounts.academy_country || ''}`}
            placeholder="Select Country"
            label="Country"
            defaultValue={this.getCountry(Countries.Countries)}
            fluid
            search
            selection
            options={Countries.Countries}
          />
          <Form.TextArea
            name="academy_about"
            label="About"
            key={`academy_about:${this.props.accounts.academy_about || ''}`}
            defaultValue={this.props.accounts.academy_about ? this.props.accounts.academy_about : ''}
            placeholder="Tell us more about your academy..."
          />
          <Form.Field label="Upload academy logo" control="file">
            <Input
              id="file"
              type="file"
              name="academy_logo"
              placeholder="Academy logo"
              className="input-file"
              color="orange"
              defaultValue={this.props.accounts.academy_logo ? this.props.accounts.academy_logo : ''}
            />
          </Form.Field>
          <Divider clearing />
          <Button className="save-button" type="submit" primary>Save Academy Settings</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AcademySettings);
